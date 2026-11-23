# FitTogo — African Fitness Assessment Website

Bilingual English/French fitness assessment hosted on Vercel. Registration and approval use Supabase Auth and a dedicated PostgreSQL schema inside the existing Agora Supabase project.

## Access-control architecture

- Public email/password registration through the Agora project's shared Supabase Auth service.
- Each new auth user receives a separate row in `fittogo.members` with `status='pending'`.
- FitTogo's data is isolated in the `fittogo` schema. Existing Agora tables and its existing `public.handle_new_user()` trigger are not replaced.
- The assessment is shown only after the signed-in user has an approved FitTogo membership.
- Admin identities are stored separately in `fittogo.admins`; users cannot grant themselves admin rights.
- Admin member listing and status changes use protected PostgreSQL RPC functions.
- RLS protects member records. A normal user can read only their own membership status.
- The browser uses only the Supabase publishable key (or legacy anon key). Never expose a service-role/secret key.

**Shared-project note:** Supabase Auth is shared by applications using the same Supabase project. FitTogo accounts therefore exist in the Agora project's Auth user directory as well. FitTogo membership records and access rules remain isolated in the `fittogo` schema.

## Required setup

### 1. Expose the FitTogo schema to the Data API

In the Agora Supabase dashboard, open **Project Settings → API → Exposed schemas** and add `fittogo`. Save the setting. Do not remove `public` or any existing exposed schemas.

The schema grants access only to the authenticated role. Anonymous users do not receive schema usage or table privileges.

### 2. Configure the website's public Supabase client

Open `supabase-config.js` and replace:
- `https://YOUR-PROJECT-REF.supabase.co` with the Agora project's Project URL.
- `YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY` with the Agora project's publishable key (or legacy anon key).

These values are intentionally public. Do not use a service-role or secret key.

### 3. Configure Supabase Auth redirects

In the Agora project's **Authentication → URL Configuration**:
- Set the Site URL to the actual FitTogo production URL.
- Add the exact production URL to the Redirect URLs allowlist.
- Keep email confirmation enabled.

**Important:** Changing these Auth settings affects the shared Agora Supabase Auth project, not only FitTogo. Check existing Agora redirect URLs before editing; add FitTogo's URL without deleting Agora's entries.

### 4. Configure production email delivery (required before public launch)

Keep email confirmation enabled. The Supabase built-in mailer is restricted and is not reliable enough for public registration.

1. Choose an email provider that supports SMTP (for example, Resend, Brevo, or Amazon SES).
2. Verify a domain or sending subdomain you control with that provider.
3. Publish the provider's required SPF and DKIM DNS records; add DMARC as recommended by the provider.
4. In Supabase, open **Authentication → Emails → SMTP Settings** and enable custom SMTP.
5. Enter the SMTP host, port, username, password, and a verified sender address on your domain.
6. Keep the existing Agora email/auth settings in mind: SMTP is shared by Agora and FitTogo because they use the same Supabase project. Changing it affects both applications.
7. In **Authentication → URL Configuration**, preserve Agora's existing redirect URLs and add the FitTogo production URL. The signup confirmation redirect is generated from the current FitTogo page URL.

Do not disable email confirmation to avoid configuring SMTP. That would allow signups using email addresses the registrant does not own.

Before launch, test a brand-new email address that has never been used in this Supabase project: register, receive the email, follow the confirmation link back to FitTogo, sign in, remain pending, and then approve the account as admin. Also test password recovery. Because Auth is shared, test that existing Agora email flows still work.

### 5. Create the first FitTogo administrator

1. Register on FitTogo using the email address that should administer FitTogo.
2. Confirm the email.
3. In the Agora project's SQL Editor, run this one-time statement, replacing the address with the exact administrator email:

```sql
insert into fittogo.admins (user_id)
select id
from auth.users
where lower(email) = lower('YOUR-ADMIN-EMAIL')
on conflict (user_id) do nothing;
```

4. Sign out and sign back in. The FitTogo admin approval dashboard will appear above the assessment.

Do not promote an account through browser code, user metadata, or a public table update.

## Deploy and test

The repository is connected to Vercel; commits to the production branch should trigger a deployment. After the Supabase configuration is complete, test:

1. A new user can register and confirm their email.
2. A pending user sees the waiting-for-approval message and cannot open the assessment through the normal site flow.
3. The administrator can see pending requests and approve a user.
4. The approved user can sign in and use the assessment.
5. Suspending or rejecting a user removes access on their next access check.
6. A normal user cannot list other members, change their own status, or read the admin table.
7. Agora registration and existing Agora features still work.

## Security and product limits

- The assessment calculation itself is client-side JavaScript. This access gate controls normal website use; it cannot prevent a technically determined visitor from downloading the public JavaScript and recreating its calculations outside the site. Sensitive server-side features would require a backend authorization check.
- Supabase Auth is shared with Agora because both apps use the same Supabase project. Use a separate project if fully separate login directories are required.
- Assessment answers are processed in the user's browser and are not saved as workout histories.
- Meal suggestions are broad African examples, not fully localized to every country.
- Calorie and macro figures are estimates, not medical advice.
