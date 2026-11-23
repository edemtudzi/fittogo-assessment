# FitTogo — African Fitness Assessment Website

Bilingual English/French static fitness assessment, hosted on Vercel. Account registration and approval are handled by a dedicated Supabase project.

## Access-control architecture

- Public email/password registration through Supabase Auth.
- Email confirmation should remain enabled.
- A database trigger creates each new account's `public.profiles` row with `status='pending'` and `role='user'`.
- The assessment remains hidden unless the signed-in user has an approved profile.
- Admin approval/rejection/suspension actions are enforced by PostgreSQL Row Level Security (RLS), not by browser-only checks.
- Only a manually promoted admin can list and update member profiles.
- The browser uses only the Supabase publishable key (or legacy anon key). Never expose a service-role/secret key.

## Required one-time setup

### 1. Create a dedicated Supabase project

Create a new project at https://supabase.com/dashboard. Do not connect FitTogo to another product's database.

### 2. Create the access-control database

In the new project's **SQL Editor**, run the complete contents of `supabase/schema.sql`.

### 3. Configure the website's public Supabase client

Open `supabase-config.js` and replace:
- `https://YOUR-PROJECT-REF.supabase.co` with the project's Project URL.
- `YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY` with its publishable key (or legacy anon key).

These values are intentionally public. Do not paste a service-role or secret key.

### 4. Configure Supabase Auth

In **Authentication → URL Configuration**:
- Set Site URL to `https://fittogo-assessment.vercel.app` (replace with the actual production URL if different).
- Add that exact URL to the Redirect URLs allowlist.
- Keep email confirmation enabled.

For production email delivery beyond Supabase's default testing limits, configure a custom SMTP provider in **Authentication → SMTP Settings**.

### 5. Create the first administrator

1. Open the deployed FitTogo site and register using your own admin email.
2. Confirm that email using the message Supabase sends.
3. In Supabase SQL Editor, run the following, replacing the address with the exact admin email:

```sql
update public.profiles
set role = 'admin', status = 'approved', updated_at = now()
where lower(email) = lower('YOUR-ADMIN-EMAIL');
```

4. Sign out and sign back in. The admin approval dashboard will appear above the assessment.

Do not promote an account by editing browser code or metadata.

## Deployment

The repository is connected to Vercel; commits to the production branch should trigger a deployment. After configuring Supabase, test:
1. A new user can register and confirm their email.
2. A pending user cannot see the assessment.
3. The admin can approve the user.
4. The approved user can sign in and use the assessment.
5. Suspending the user removes access.
6. A normal user cannot query other profiles or change their own status/role.

## Current product limits

- Assessment answers are still processed in the user's browser and are not saved as workout histories.
- Meal suggestions are broad African examples, not fully localized to every country.
- Calorie and macro figures are estimates, not medical advice.
