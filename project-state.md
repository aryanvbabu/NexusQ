# NexusQ Global — Project State

Last updated: 2026-08-03  
Repo: [aryanvbabu/NexusQ](https://github.com/aryanvbabu/NexusQ)  
Branch: `main`

---

## 1. What this project is

**NexusQ Global** is the parent-company / product-ecosystem website.

- **AuditionQ** = live flagship product (external: https://www.auditionq.com/)
- **FurSure, RideQ, CaringMinds, Onakkodi** = vision (not launched)
- **Future AI** = exploration (not launched)

The site is a polished corporate/product marketing surface with login, partner inquiry email, privacy/terms, and Vercel production deployment.

---

## 2. Current architecture

### Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js **16.2.12** (App Router) |
| Language | TypeScript |
| UI | React **19.2.4**, Tailwind CSS **4**, shadcn/ui, Lucide |
| Motion | Framer Motion (with `prefers-reduced-motion`) |
| Auth | NextAuth v4 (Credentials + JWT) |
| Database | PostgreSQL via Prisma 7 (`@prisma/adapter-pg`) |
| Email | Resend (server-side only) |
| Hosting | Vercel (GitHub → auto deploy from `main`) |

### App routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage story (Hero → Vision → Ecosystem → AuditionQ → Future → Trust → Partner CTA → Footer) |
| `/login` | Sign in / Sign up (toggle) |
| `/partner` | Partner inquiry form |
| `/privacy` | Privacy placeholder |
| `/terms` | Terms placeholder |
| `/api/auth/[...nextauth]` | NextAuth handler |
| `/api/auth/signup` | Create user (bcrypt hash → Postgres) |
| `/api/partner` | Validate form → Resend → inquiry inbox |

### Key source layout

```text
app/
  page.tsx, layout.tsx, providers.tsx, globals.css
  components/   # Navbar, Hero, Vision, Ecosystem, AuditionQ, Innovation, Trust, PartnerCTA, Footer
  login/, partner/, privacy/, terms/
  api/auth/, api/partner/
lib/
  prisma.ts, generated/prisma/, motion.ts, utils.ts
prisma/
  schema.prisma
```

### Design system

Defined in `app/globals.css` as NexusQ tokens (`--nq-bg`, `--nq-surface`, `--nq-accent`, live/vision badges, section utilities). Dark, product-focused look; cyan accent aligned with brand logo.

### Homepage honesty rules (enforced in UI)

- Only AuditionQ shows **LIVE** + external CTA
- Other platforms show **VISION** / **EXPLORATION** — no fake store/download/launch buttons
- Trust section uses non-numeric statements (no fabricated metrics)

---

## 3. PostgreSQL setup

### Connection

- Helper: `lib/prisma.ts` (singleton + `PrismaPg` adapter for serverless-safe reuse)
- Env: `DATABASE_URL` (Neon PostgreSQL, `sslmode=require`)
- Hosted DB: Neon project → database **`neondb`** (ap-southeast-1)
- Prisma schema: `prisma/schema.prisma`; CLI config: `prisma.config.ts`
- Apply schema: `npx prisma db push` (or `npm run db:push`)

### User model (`User` in Prisma)

| Field | Notes |
|-------|--------|
| `id` | cuid (string PK) |
| `name` | required |
| `email` | required, unique |
| `password` | required, bcrypt-hashed (cost 12) |
| `createdAt` | default `now()` |

### Production note

Set the same Neon `DATABASE_URL` in Vercel Environment Variables (and remove any old `MONGODB_URI`). Schema is already applied on Neon via `prisma db push`.

---

## 4. Login / auth system

### Flow

1. **Sign up** → `POST /api/auth/signup` → hash password → create User → client `signIn("credentials")`
2. **Sign in** → NextAuth Credentials `authorize()` → email lookup + `bcrypt.compare` → JWT session
3. **UI** → `SessionProvider` in `app/providers.tsx`; Navbar shows Sign In or name + Sign Out

### Config notes

- Strategy: **JWT** (no DB sessions)
- Custom page: `/login`
- On Vercel, if `NEXTAUTH_URL` is missing or still `localhost`, code falls back to `https://${VERCEL_URL}` in `app/api/auth/[...nextauth]/route.ts`

### Scope boundary

Auth exists and works, but **v1 scope says not to expand it** (no OAuth, admin roles, dashboards, or protected product apps).

---

## 5. Environment variables

Documented in `.env.example` (never commit real `.env.local`).

| Variable | Used for |
|----------|----------|
| `DATABASE_URL` | Prisma → PostgreSQL |
| `NEXTAUTH_SECRET` | JWT signing |
| `NEXTAUTH_URL` | Auth canonical URL (`http://localhost:3000` locally; production Vercel URL in Vercel) |
| `RESEND_API_KEY` | Partner email API (server only) |
| `RESEND_FROM_EMAIL` | From address (sandbox: `NexusQ <onboarding@resend.dev>`) |
| `PARTNER_INQUIRY_TO` | Inquiry destination |

### Production (Vercel) — verified names

Correct names (typos previously broke auth/email):

- `NEXTAUTH_SECRET` / `NEXTAUTH_URL` (not `NEXAUTH_*`)
- `PARTNER_INQUIRY_TO` (not `PARTNER_ENQUIRY_TO`)
- `DATABASE_URL` (replace former `MONGODB_URI`)

Also set: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`.

---

## 6. Deployment (GitHub + Vercel)

| Item | Value |
|------|--------|
| GitHub | `https://github.com/aryanvbabu/NexusQ` |
| Deploy branch | `main` (auto-deploy on push) |
| Vercel project | `aryanvbabus-projects/nexus-q` |
| Production aliases | `https://nexus-q-delta.vercel.app`, `https://nexus-q-aryanvbabus-projects.vercel.app` |

Flow:

```text
git push origin main → Vercel build → Production alias update
```

Secrets stay in Vercel Environment Variables / local `.env.local` (gitignored).

---

## 7. Pending bugs / known limitations

| Issue | Status / notes |
|-------|----------------|
| Resend **sandbox** only emails the Resend account owner until a domain is verified | Currently `PARTNER_INQUIRY_TO` may be the owner Gmail for testing; target for go-live is `admin@auditionq.com` after domain verify |
| Vercel env cutover | Add Neon `DATABASE_URL` in Vercel; remove old `MONGODB_URI` so production auth uses Neon |
| `nexus-q.vercel.app` | Appears to be a **different** (Vite) project — do not confuse with this Next.js app |
| Legal pages | Privacy/Terms are **placeholders**, not lawyer-reviewed |
| Vision product copy | FurSure / RideQ / CaringMinds / Onakkodi use honest “vision” placeholders — replace when Lead supplies real descriptions |
| Logo in navbar | Square stacked logo; wordmark can be hard to read at small sizes |

No known blocking local bugs for browse / signup / login / partner submit (under current Resend test recipient), once `DATABASE_URL` points at running Postgres.

---

## 8. Pending features (backlog — out of current v1 expansion unless Lead approves)

- Verify Resend domain → deliver partner mail to `admin@auditionq.com` from a branded from-address
- Hosted Postgres for Vercel production auth
- Custom domain + Cloudflare (explicitly optional for v1)
- Final legal Privacy / Terms copy
- Real product screenshots / media for AuditionQ showcase
- Accurate vision-product blurbs from Lead
- Analytics (not approved in v1 freeze list without Lead)
- Do **not** add without approval: CMS, blog, admin dashboards, product dashboards, i18n, OAuth expansion, fake vision “apps”

---

## 9. Next necessary steps

1. **Resend domain** — verify sending domain; set `RESEND_FROM_EMAIL` + `PARTNER_INQUIRY_TO=admin@auditionq.com`; redeploy; send a real partner test.
2. **Confirm production `NEXTAUTH_URL`** stays the stable public alias (not a one-off deployment URL).
3. **Vercel env** — set Neon `DATABASE_URL` in Vercel project settings; remove old `MONGODB_URI`.
4. **Lead content pass** — replace vision placeholders and legal placeholders when supplied.
5. **Optional** — assign a custom domain in Vercel when ready.
6. **Keep scope frozen** — polish and ops only unless Lead expands scope.

### Quick local commands

```bash
npm install
cp .env.example .env.local   # fill secrets including DATABASE_URL
npx prisma db push
npm run dev                  # http://localhost:3000
npm run build
```

### Quick production smoke checklist

- [ ] `/` loads ecosystem LIVE/VISION labels
- [ ] `/partner` submit → email arrives
- [ ] `/login` signup + sign-in
- [ ] Footer Privacy / Terms
- [ ] AuditionQ CTA → https://www.auditionq.com/

---

## 10. Definition of done (v1 vs remaining)

**Done:** homepage story, ecosystem honesty, AuditionQ proof, future/trust sections, partner form + Resend path, privacy/terms, motion, responsive nav, SEO basics, GitHub→Vercel deploy, auth on **Neon PostgreSQL** (Prisma; schema pushed).

**Remaining for full “email to admin@auditionq.com” production path:** Resend domain verification + env cutover.  
**Remaining for production auth:** add Neon `DATABASE_URL` in Vercel env (remove `MONGODB_URI`).  
**Remaining for content maturity:** real legal text + Lead-approved vision copy.
