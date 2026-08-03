# NexusQ Global

NexusQ Global is the parent company behind a digital product ecosystem. **AuditionQ** is the live flagship product. Other platforms (FurSure, RideQ, CaringMinds, Onakkodi, Future AI) are presented honestly as **vision** or **exploration**.

This repository is the NexusQ Global corporate/product website (Next.js App Router).

## Local setup

```bash
npm install
cp .env.example .env.local
# Fill in values in .env.local (never commit secrets)
# Local Postgres: create DB `nexusq`, then set DATABASE_URL
# Or use Neon: set DATABASE_URL to your Neon connection string (?sslmode=require)
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Variable names only — put real values in `.env.local` (gitignored):

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon (or other) PostgreSQL connection for Sign In / Sign Up (Prisma). Include `?sslmode=require` for Neon. |
| `NEXTAUTH_SECRET` | NextAuth JWT secret |
| `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000`) |
| `RESEND_API_KEY` | Resend API key for partner form email (server-side only) |
| `RESEND_FROM_EMAIL` | Verified Resend from address |
| `PARTNER_INQUIRY_TO` | Destination inbox. Use `admin@auditionq.com` after verifying a Resend domain. In Resend test mode, only your Resend account email can receive mail. |

## Development

```bash
npm run dev         # development server
npm run build       # prisma generate + next build
npm run start       # run production build
npm run lint        # eslint
npm run db:push     # push Prisma schema to Postgres
npm run db:generate # regenerate Prisma Client
```

## Partner email

The `/partner` form posts to `/api/partner`, which sends email via **Resend** to `admin@auditionq.com` (or `PARTNER_INQUIRY_TO`).

Flow:

```text
NexusQ form → Next.js API route → Resend → admin@auditionq.com
```

The Resend API key must never be exposed in client code.

Until a custom domain is verified in Resend, use Resend’s onboarding sender and note any sandbox recipient limits in the Resend dashboard.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set the same environment variables in the Vercel project settings.
4. Deploy from `main` for production; PRs get preview deployments.

Custom domain / Cloudflare are optional for v1.

## Key routes

| Route | Description |
|-------|-------------|
| `/` | Homepage story |
| `/partner` | Partner inquiry form |
| `/privacy` | Privacy placeholder |
| `/terms` | Terms placeholder |
| `/login` | Existing Sign In / Sign Up |

## Product honesty

- AuditionQ = **LIVE**
- FurSure, RideQ, CaringMinds, Onakkodi = **VISION**
- Future AI = **EXPLORATION**

No fabricated metrics, testimonials, or fake availability buttons.
