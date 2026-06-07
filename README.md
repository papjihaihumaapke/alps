# ALPS Annie Ling

A storefront for the ALPS Annie Ling fashion house, built with
[TanStack Start](https://tanstack.com/start) (React 19), Tailwind CSS v4,
shadcn/ui, and Supabase.

The app is **server-rendered (SSR)** via [Nitro](https://nitro.build), so
TanStack Start server functions — including the `/admin` panel — run on the
host. Nitro auto-detects the platform at build time: on Vercel it emits the
Vercel Build Output (`.vercel/output`); locally it builds a Node server in
`.output/`.

## Local development

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

Other scripts:

- `npm run build` — production build
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint
- `npm run format` — format with Prettier

## Environment variables

See `.env.example` for the full list. There are two tiers:

- **Public** (`VITE_*` and the anon/publishable key + URL) — safe to expose and
  already committed in `.env`. The `VITE_*` ones are baked into the client at
  build time.
- **Secret** (`SUPABASE_SERVICE_ROLE_KEY`) — required by the `/admin` server
  functions (it bypasses row-level security and must stay server-side). **Never
  commit it.** Put it in `.env.local` for local development (gitignored) and in
  the Vercel dashboard for production.

For local admin work, create `.env.local`:

```bash
cp .env.example .env.local
# then fill in SUPABASE_SERVICE_ROLE_KEY with your real service_role secret
```

## Deploying to Vercel

1. Push this repository to GitHub/GitLab and **Import Project** in Vercel
   (or run `npx vercel` from this folder).
2. Vercel auto-detects TanStack Start + Nitro — no `vercel.json` needed. It uses
   `npm run build` and reads the generated `.vercel/output`. Leave the framework
   preset on automatic detection.
3. Under **Settings → Environment Variables**, add (Production + Preview):

   | Variable | Value |
   | --- | --- |
   | `VITE_SUPABASE_URL` | your Supabase project URL |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | anon / publishable key |
   | `SUPABASE_URL` | your Supabase project URL |
   | `SUPABASE_PUBLISHABLE_KEY` | anon / publishable key |
   | `SUPABASE_SERVICE_ROLE_KEY` | **service_role secret** (keep private) |

4. Deploy. The storefront, cart, auth, **and the `/admin` panel** all work.

## Notes

- **Google sign-in** uses Supabase's native OAuth. Enable the Google provider in
  your Supabase project and add your deployed domain to the allowed redirect URLs.
- **Admin access** is gated by an `admin` row in the `user_roles` table for your
  user. Grant the first admin directly in Supabase, then use the panel.
