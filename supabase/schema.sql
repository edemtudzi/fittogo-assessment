-- FitTogo isolated access-control schema for the existing Agora Supabase project.
-- This migration creates objects only in the fittogo schema and adds one new
-- auth.users trigger. It does not alter Agora's public tables or its existing
-- public.handle_new_user() trigger.

create schema if not exists fittogo;

create table if not exists fittogo.members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  status text not null default 'pending'
    check (status in ('pending','approved','rejected','suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null
);

create table if not exists fittogo.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table fittogo.members enable row level security;
alter table fittogo.admins enable row level security;

revoke all on schema fittogo from public, anon, authenticated;
grant usage on schema fittogo to authenticated, service_role;

revoke all on all tables in schema fittogo from public, anon, authenticated;
grant select on fittogo.members to authenticated;
grant select, insert, update, delete on all tables in schema fittogo to service_role;

drop policy if exists "Members can read their own access status" on fittogo.members;
create policy "Members can read their own access status"
on fittogo.members for select to authenticated
using (user_id = (select auth.uid()));

create or replace function fittogo.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from fittogo.admins a
    where a.user_id = (select auth.uid())
  );
$$;

revoke all on function fittogo.is_admin() from public, anon;
grant execute on function fittogo.is_admin() to authenticated;

create or replace function fittogo.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into fittogo.members (user_id, email, full_name, status)
  values (
    new.id,
    coalesce(new.email, ''),
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    'pending'
  )
  on conflict (user_id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, fittogo.members.full_name),
        updated_at = now();
  return new;
end;
$$;

revoke all on function fittogo.handle_new_user() from public, anon, authenticated;

drop trigger if exists fittogo_on_auth_user_created on auth.users;
create trigger fittogo_on_auth_user_created
after insert on auth.users
for each row execute function fittogo.handle_new_user();

create or replace function fittogo.admin_list_members()
returns table (
  user_id uuid,
  email text,
  full_name text,
  status text,
  role text,
  created_at timestamptz,
  reviewed_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not fittogo.is_admin() then
    raise exception 'Not authorized' using errcode = '42501';
  end if;

  return query
  select m.user_id, m.email, m.full_name, m.status,
         case when a.user_id is not null then 'admin' else 'user' end,
         m.created_at, m.reviewed_at
  from fittogo.members m
  left join fittogo.admins a on a.user_id = m.user_id
  order by case m.status when 'pending' then 0 else 1 end, m.created_at desc;
end;
$$;

create or replace function fittogo.admin_set_member_status(
  target_user_id uuid,
  new_status text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not fittogo.is_admin() then
    raise exception 'Not authorized' using errcode = '42501';
  end if;

  if new_status not in ('approved','rejected','suspended') then
    raise exception 'Invalid status' using errcode = '22023';
  end if;

  if target_user_id = (select auth.uid()) and new_status <> 'approved' then
    raise exception 'Admins cannot revoke their own access through this action' using errcode = '22023';
  end if;

  update fittogo.members
  set status = new_status,
      reviewed_at = now(),
      reviewed_by = (select auth.uid()),
      updated_at = now()
  where user_id = target_user_id;

  if not found then
    raise exception 'Member not found' using errcode = 'P0002';
  end if;
end;
$$;

revoke all on function fittogo.admin_list_members() from public, anon;
revoke all on function fittogo.admin_set_member_status(uuid,text) from public, anon;
grant execute on function fittogo.admin_list_members() to authenticated;
grant execute on function fittogo.admin_set_member_status(uuid,text) to authenticated;

alter default privileges in schema fittogo revoke all on tables from public, anon, authenticated;
alter default privileges in schema fittogo revoke execute on functions from public, anon;
