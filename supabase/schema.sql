-- FitTogo account approval and admin access
-- Run once in the SQL Editor of a NEW, dedicated Supabase project.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  status text not null default 'pending'
    check (status in ('pending','approved','rejected','suspended')),
  role text not null default 'user'
    check (role in ('user','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_status_created_at_idx
  on public.profiles(status, created_at desc);

alter table public.profiles enable row level security;

create or replace function public.is_fittogo_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid())
      and p.role = 'admin'
      and p.status = 'approved'
  );
$$;

revoke all on function public.is_fittogo_admin() from public;
grant execute on function public.is_fittogo_admin() to authenticated;

create or replace function public.handle_new_fittogo_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, status, role)
  values (new.id, coalesce(new.email, ''), 'pending', 'user')
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_fittogo on auth.users;
create trigger on_auth_user_created_fittogo
  after insert on auth.users
  for each row execute procedure public.handle_new_fittogo_user();

drop policy if exists "Users read own FitTogo profile" on public.profiles;
create policy "Users read own FitTogo profile"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select public.is_fittogo_admin()));

drop policy if exists "Admins update FitTogo profiles" on public.profiles;
create policy "Admins update FitTogo profiles"
  on public.profiles for update to authenticated
  using ((select public.is_fittogo_admin()))
  with check ((select public.is_fittogo_admin()));

revoke all on table public.profiles from anon, authenticated;
grant select, update on table public.profiles to authenticated;

-- New users cannot approve themselves or change their role.
-- The first admin must be promoted manually in the SQL Editor after signing up:
-- update public.profiles
-- set role = 'admin', status = 'approved', updated_at = now()
-- where lower(email) = lower('YOUR-ADMIN-EMAIL');
