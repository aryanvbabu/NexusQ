# NexusQ Global — Project State

Last updated: 2026-08-11  
Repo: [aryanvbabu/NexusQ](https://github.com/aryanvbabu/NexusQ)  
Branch: **`cinematic-background-test`** (local TEST only — not pushed; `main` untouched)  
Latest commit on `main`: `65a618e` — Improve site-wide starfield, navbar UX, and light-mode readability

---

## Active test: cinematic background (2026-08-11)

**Branch:** `cinematic-background-test` only. Do not merge/push unless Lead approves.

| Item | Detail |
|------|--------|
| **Current test BG** | `ActingSceneBackground.tsx` — full-viewport SVG (`preserveAspectRatio="xMidYMid slice"`), connected characters + studio scenery, theme-aware |
| Previous film plate | `FilmSetBackground.tsx` + `public/film-background.jpg` kept for comparison (not deleted; commented out in `page.tsx`) |
| Homepage wiring | Aurora commented out for test only (file kept). `ActingSceneBackground` active |
| Tone fix | Removed section dark washes; flat readability veil |
| Card readability | Solid `.nq-card` utility for Trust / Vision / Ecosystem / Innovation / Future / Hero stats |
| Content | Unchanged — sections stationary above background |
| Porting guide | Desktop PDF: `Acting-Scene-Background-Implementation-Guide.pdf`; also `docs/` (PDF + HTML + `ActingSceneBackground.tsx` copy) |

**Revert path:** switch back to `main`, or restore Aurora comments on this branch.

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
| Motion | Framer Motion (section entrances) + **canvas starfield** (`AuroraBackground`) |
| Theme | `next-themes` (dark default; light mode supported) |
| Auth | NextAuth v4 (Credentials + JWT) |
| Database | PostgreSQL via Prisma 7 (`@prisma/adapter-pg`) |
| Email | Resend (server-side only) |
| Hosting | Vercel (GitHub → auto deploy from `main`) |

### App routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage story + site-wide interactive starfield |
| `/login` | Sign in / Sign up (toggle) |
| `/partner` | Partner inquiry form |
| `/privacy` | Privacy placeholder |
| `/terms` | Terms placeholder |
| `/api/auth/[...nextauth]` | NextAuth handler |
| `/api/auth/signup` | Create user (bcrypt hash → Postgres) |
| `/api/partner` | Validate form → Resend → inquiry inbox |

**Removed (2026-08-08):** `/settings` — Settings page and navbar Settings control deleted on purpose.

### Homepage composition (top → bottom)

1. Fixed **Navbar** (active section highlight; mobile single bar + ☰ for extras)
2. **Hero**
3. **Vision** (`#about`)
4. **Ecosystem** (`#platforms`)
5. **AuditionQ** (`#auditionq`)
6. **Innovation** (`#innovation`)
7. **Trust** (`#trust`)
8. **Future** (`#future`) — AI Agents, Global Expansion, Future Platforms
9. **Partner CTA**
10. **Footer**
11. Floating **Website Tour** (`EcosystemGuide`)

Background (**test branch**): `FilmSetBackground` — cinematic plate from `/film-background.jpg` with slow parallax.  
Background (**main / production**): `AuroraBackground` with `fullPage` — fixed interactive starfield (still present in repo; temporarily disabled only on the test branch).

### Key source layout

```text
app/
  page.tsx, layout.tsx, providers.tsx, globals.css
  components/   # Navbar, Hero, AuroraBackground, FilmSetBackground (test), sections, onboarding/*
  login/, partner/, privacy/, terms/
  api/auth/, api/partner/
public/
  film-background.jpg   # swap-only cinematic plate (test branch)
lib/
  prisma.ts, generated/prisma/, motion.ts, utils.ts
prisma/
  schema.prisma
tutorials/      # homepage, auditionq, dashboard, profile configs + registry
project-state.md
```

### Onboarding / guided tours

Reusable spotlight engine under `app/components/onboarding/` (Provider, Spotlight, Tooltip, Overlay, TutorialStep). Tutorial copy lives in `tutorials/*.ts` and is registered in `tutorials/registry.ts`.

- Auto-starts incomplete section tours (homepage on `/`; AuditionQ after homepage is done when `#auditionq` is visited or the section enters view)
- Persistence: `localStorage` keys `homepage_completed`, `auditionq_completed`, `dashboard_completed`, `profile_completed` (namespaced; per-email when signed in)
- Controls: Next, Back, Skip Tour, Finish; ESC closes; arrow keys; focus trap
- **Guide me** button in the navbar still launches the homepage tour
- Restart-via-Settings is **gone** (Settings removed); tours can still be driven by Guide me / completion storage
- Dashboard/profile configs are ready for future routes; they do not auto-start until those pages exist

### Design system

Defined in `app/globals.css` as NexusQ tokens (`--nq-bg`, `--nq-surface`, `--nq-accent`, live/vision badges, section utilities). Dark-first product look with cyan accent; light mode uses the same tokens so section copy stays readable.

### Homepage honesty rules (enforced in UI)

- Only AuditionQ shows **LIVE** + external CTA
- Other platforms show **VISION** / **EXPLORATION** — no fake store/download/launch buttons
- Trust section uses non-numeric statements (no fabricated metrics)

---

## 3. Recent UI / UX updates (2026-08-08)

| Change | Detail |
|--------|--------|
| Navbar visibility | Fixed Framer Motion / positioning issues that hid the bar on localhost and mobile |
| Mobile nav | Single non-scrolling bar: logo + Home / Platforms / AuditionQ / Future / Partner + ☰; extras in menu |
| Active section | Cyan highlight on the link for the section in view |
| Spacing | Desktop link gaps restored; Sign In kept on desktop (and on larger phones when space allows) |
| Settings removed | No Settings button; `/settings` page deleted |
| Starfield | Denser moving stars; pointer/touch interaction; runs **site-wide** on homepage |
| Motion safety | Section animations no longer start at `opacity: 0` (was blanking text on mobile) |
| Light mode Future cards | AI Agents / Global Expansion / Future Platforms use `text-nq-text` / `text-nq-muted` |
| Mobile layout | Tighter hero / section padding; less empty vertical space |
| Turbopack root | `next.config.ts` pins app root when a parent lockfile exists |

---

## 4. PostgreSQL setup

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

## 5. Login / auth system

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

## 6. Environment variables

Documented in `.env.example` (never commit real `.env` / `.env.local`).

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

## 7. Deployment (GitHub + Vercel)

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

## 8. Pending bugs / known limitations

| Issue | Status / notes |
|-------|----------------|
| Resend **sandbox** only emails the Resend account owner until a domain is verified | Currently `PARTNER_INQUIRY_TO` may be the owner Gmail for testing; target for go-live is `admin@auditionq.com` after domain verify |
| Vercel env cutover | Add Neon `DATABASE_URL` in Vercel; remove old `MONGODB_URI` so production auth uses Neon |
| `nexus-q.vercel.app` | Appears to be a **different** (Vite) project — do not confuse with this Next.js app |
| Legal pages | Privacy/Terms are **placeholders**, not lawyer-reviewed |
| Vision product copy | FurSure / RideQ / CaringMinds / Onakkodi use honest “vision” placeholders — replace when Lead supplies real descriptions |
| Logo in navbar | Square stacked logo; wordmark can be hard to read at small sizes |
| No automated tests | `package.json` has no test script; rely on lint / `tsc` / build / manual checks |
| Onboarding auto-start | Can feel intrusive on first visit; Guide me remains for intentional restarts after Settings removal |
| Starfield on secondary pages | Site-wide starfield is wired on homepage (`app/page.tsx`); `/login`, `/partner`, etc. do not use the same full-page background yet |
| `mongoose` dependency | Still listed alongside Prisma/Postgres — confirm if still needed |

**Resolved recently:** missing mobile navbar, side-scrolling overloaded mobile nav, Future card text invisible in light mode, Settings surface, hero-only background, opacity-0 section text on mobile.

No known blocking local bugs for browse / signup / login / partner submit (under current Resend test recipient), once `DATABASE_URL` points at running Postgres.

---

## 9. Pending features (backlog — out of current v1 expansion unless Lead approves)

- Verify Resend domain → deliver partner mail to `admin@auditionq.com` from a branded from-address
- Confirm hosted Postgres env on Vercel production auth
- Custom domain + Cloudflare (explicitly optional for v1)
- Final legal Privacy / Terms copy
- Real product screenshots / media for AuditionQ showcase
- Accurate vision-product blurbs from Lead
- Optional: extend interactive starfield to `/login` and `/partner`
- Optional: lightweight test suite (Playwright smoke for nav + key sections)
- Analytics (not approved in v1 freeze list without Lead)
- Do **not** add without approval: CMS, blog, admin dashboards, product dashboards, i18n, OAuth expansion, fake vision “apps”, Settings rebuild

---

## 10. Next necessary steps

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
- [ ] Navbar visible on mobile + desktop; active section highlight works
- [ ] Starfield visible while scrolling homepage
- [ ] Future cards readable in **light** and dark theme
- [ ] `/partner` submit → email arrives
- [ ] `/login` signup + sign-in
- [ ] Footer Privacy / Terms
- [ ] AuditionQ CTA → https://www.auditionq.com/
- [ ] `/settings` is gone (expect 404)

---

## 11. Definition of done (v1 vs remaining)

**Done:** homepage story, ecosystem honesty, AuditionQ proof, future/trust/innovation sections, partner form + Resend path, privacy/terms, motion + site-wide starfield, responsive nav with active sections, light-mode Future card readability, SEO basics, GitHub→Vercel deploy, auth on **Neon PostgreSQL** (Prisma; schema pushed), Settings removed.

**Remaining for full “email to admin@auditionq.com” production path:** Resend domain verification + env cutover.  
**Remaining for production auth:** add Neon `DATABASE_URL` in Vercel env (remove `MONGODB_URI`).  
**Remaining for content maturity:** real legal text + Lead-approved vision copy.
