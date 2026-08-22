# NexusQ Global — Project State

Last updated: 2026-08-22  
Repo: [aryanvbabu/NexusQ](https://github.com/aryanvbabu/NexusQ)  
Branch: **`main`** (pushed; Vercel auto-deploys)  
Latest commit on `main`: `7102e96` — Record deploy commit hash in project-state.

**Maintenance:** Update this file in the same turn as any code, design, ops, or content change. Keep dates, branch/commit, homepage composition, recent updates, pending bugs, backlog, and next steps accurate. Do not leave this file describing a previous look or deleted routes.

---

## Active homepage background (2026-08-21)

**Status:** Merged to `main` and pushed to GitHub. Vercel auto-deploys from `main`.

Current production homepage: full-bleed photoreal scene bands per section, hero casting monitor (click → AuditionQ), sliding insight cards, polished Help chat (NexusQ + AuditionQ how-tos). **No floating film tape.**

| Item | Detail |
|------|--------|
| **Section backgrounds** | `CastingSceneBand.tsx` wraps each homepage section |
| **Scene plates** | WebP in `public/scenes/walk-*.webp` (hero preloaded; others lazy-loaded via native `<img>`) |
| **Original JPEGs** | Still in `public/scenes/casting-*.jpg` and `walk-*.jpg` for reference / swap source |
| **Hero film tape** | Removed (2026-08-21) — floating film strips + reels no longer render |
| **Casting monitor** | `CastingMonitor.tsx` — looping BTS MP4 (`public/videos/casting-bts.mp4`); click → auditionq.com; YouTube embed deferred |
| **Hero slides** | `HeroSlideCards.tsx` — full-width auto-rotating cards; spacing restored after film-tape removal; stats card in normal flow |
| **Light mode** | Stronger scene overlays + `.nq-card` / heading contrast so copy stays readable over photos |
| **Performance** | WebP plates (~55–200 KB vs ~2 MB JPEGs); hero `<link rel="preload">`; lazy + `fetchPriority` on bands |
| **Disabled (kept in repo)** | `AuroraBackground.tsx` (starfield), `FilmSetBackground.tsx`, `CinematicStudioBackground.tsx` — commented out in `app/page.tsx` |
| **Deleted** | `ActingSceneBackground.tsx` (cartoon SVG test), `BackstageMonitor.tsx` (replaced by `CastingMonitor`), `EcosystemGuide.tsx` (replaced by site help chat), `/settings` page |
| **Content** | Homepage story unchanged; Help chat uses AuditionQ FAQ (`faq.ts`) plus support-email handoff for out-of-scope questions |

**Revert path:** restore `<AuroraBackground fullPage />` in `app/page.tsx`; remove or comment hero monitor + slide cards; unwrap sections from `CastingSceneBand`.

**Test branch (archived):** `test/casting-perf-contrast-backstage` — development branch for perf/contrast/monitor work (merged into `main`).

---

## 1. What this project is

**NexusQ Global** is the parent-company / product-ecosystem website.

- **AuditionQ** = live flagship product (external: https://www.auditionq.com/)
- **FurSure, RideQ, CaringMinds, Onakkodi** = vision (not launched)
- **Future AI** = exploration (not launched)

The site is a polished corporate/product marketing surface with login, partner inquiry email, privacy/terms, spotlight onboarding (Guide me), floating Help chat, and Vercel production deployment.

---

## 2. Current architecture

### Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js **16.2.12** (App Router) |
| Language | TypeScript |
| UI | React **19.2.4**, Tailwind CSS **4**, shadcn/ui, Lucide |
| Motion | Framer Motion (section entrances + hero slide cards / monitor) + canvas starfield (`AuroraBackground`, currently disabled on homepage) |
| Theme | `next-themes` **^0.4.6** (dark default; light mode; `ThemeProvider` + `ThemeToggle`) |
| Auth | NextAuth v4 (Credentials + JWT) |
| Database | PostgreSQL via Prisma 7 (`@prisma/adapter-pg` + `pg`) — Neon hosted |
| Email | Resend (server-side only) |
| Help chat | Site-fact composer (`lib/site-help.ts`) + AuditionQ FAQ (`faq.ts` → `lib/auditionq-faq-knowledge.ts`); optional Groq/OpenAI paraphrase; out-of-scope support email (`lib/help-support-email.ts`) |
| Onboarding | Custom spotlight engine (`app/components/onboarding/*` + `tutorials/*`) |
| Hosting | Vercel (GitHub → auto deploy from `main`) |

**Note:** `mongoose` is still listed in `package.json` but is **unused** (no imports). Safe to remove in a cleanup commit; auth uses Prisma only.

### App routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage story + cinematic scene-band backgrounds (hero monitor + slide cards) |
| `/login` | Sign in / Sign up (toggle); sets `sessionStorage nq_guide_me` to force homepage tour after auth |
| `/partner` | Partner inquiry form |
| `/privacy` | Privacy placeholder |
| `/terms` | Terms placeholder |
| `/api/auth/[...nextauth]` | NextAuth handler |
| `/api/auth/signup` | Create user (bcrypt hash → Postgres) |
| `/api/partner` | Validate form → Resend → inquiry inbox |
| `/api/help-chat` | Site + AuditionQ FAQ help; out-of-scope offers customer support and can email the visitor |

**Removed:** `/settings` — Settings page and navbar Settings control deleted on purpose (2026-08-08). Empty `app/settings` leftover folder cleared 2026-08-22.

### Homepage composition (top → bottom)

1. Fixed **Navbar** (active section highlight; mobile single bar + ☰ for extras; **Guide me** + **ThemeToggle**)
2. **Hero** — copy + casting monitor (BTS video, click → auditionq.com) + full-width sliding insight cards
3. **Vision** (`#about`)
4. **Ecosystem** (`#platforms`) — `data-tour="section-platforms"`
5. **AuditionQ** (`#auditionq`) — tour anchors on LIVE badge / proof / CTA
6. **Innovation**
7. **Trust** (`#trust`)
8. **Future** (`#future`) — AI Agents, Global Expansion, Future Platforms
9. **Partner CTA** (`data-tour="section-partner"`)
10. **Footer**
11. Floating **Help chat** (`SiteHelpChat` in root layout — all pages)

Background (**current / `main`**): `CastingSceneBand` per section — WebP walk scenes in `public/scenes/walk-*.webp`, slow pan. Film strips/reels removed.  
Background (**previous / in repo, disabled**): `AuroraBackground` starfield (`fullPage`), `FilmSetBackground` (`/film-background.jpg`), `CinematicStudioBackground` — all commented out in `app/page.tsx`.

### Key source layout

```text
app/
  page.tsx, layout.tsx, providers.tsx, globals.css
  components/
    Navbar, Hero, CastingSceneBand, CastingMonitor, HeroSlideCards, SiteHelpChat
    ThemeProvider, ThemeToggle
    AuroraBackground, FilmSetBackground, CinematicStudioBackground (unused, kept)
    sections: Vision, Ecosystem, AuditionQ, Innovation, Trust, Future, PartnerCTA, Footer
    onboarding/
      OnboardingProvider, GuideMeButton, Spotlight, Tooltip, Overlay, TutorialStep, useOnboarding
  login/, partner/, privacy/, terms/
  api/auth/, api/partner/, api/help-chat/
public/
  scenes/walk-*.webp          # active homepage scene plates (WebP)
  scenes/casting-*.jpg        # original scene sources (reference)
  scenes/walk-*.jpg           # original walk scene sources (reference)
  videos/casting-bts.mp4      # hero monitor BTS clip (~4.5 MB; keep under 5 MB)
  film-background.jpg         # FilmSetBackground plate (unused)
  cinematic-studio.jpg        # CinematicStudioBackground plate (unused)
lib/
  prisma.ts, generated/prisma/, motion.ts, utils.ts, site-help.ts, site-help-paraphrase.ts
  auditionq-faq-knowledge.ts, help-support-email.ts
faq.ts, helpTopicPrompts.ts   # AuditionQ FAQ + in-app Help topic prompts (chat knowledge source)
prisma/
  schema.prisma
prisma.config.ts              # DATABASE_URL (+ build-time fallback for prisma generate)
tutorials/                    # homepage, auditionq, dashboard, profile configs + registry + storage
docs/
  NexusQ-Widget-Handoff.pdf   # video box + help chat spec
  NexusQ-Widget-Handoff.html
  build-handoff-pdf.mjs
.cursor/rules/project-state.mdc   # always-on: keep this file current
project-state.md
```

### Onboarding / guided tours

Reusable spotlight engine under `app/components/onboarding/`. Tutorial copy lives in `tutorials/*.ts` and is registered in `tutorials/registry.ts`. Provider wraps the app in `app/providers.tsx` (inside `ThemeProvider`).

- **Guide me** (`GuideMeButton`) in the **navbar** (desktop + mobile) — forces homepage tour for anyone, including existing accounts (`sessionStorage` key `nq_guide_me`)
- Auto-starts incomplete section tours (homepage on `/`; AuditionQ after homepage is done when `#auditionq` is visited or the section enters view)
- After signup/sign-in, login page sets `nq_guide_me=homepage` so the tour starts on redirect home
- Persistence: `localStorage` (`nq_onboarding_v1` or `nq_onboarding_v1:email`) with keys `homepage_completed`, `auditionq_completed`, `dashboard_completed`, `profile_completed`
- Controls: Next, Back, Skip Tour, Finish; ESC closes; arrow keys; focus trap; compact `i / n` (no long progress bars)
- Restart-via-Settings is **gone** (Settings removed); use **Guide me** to replay
- Dashboard/profile configs are ready for future routes; they do not auto-start until those pages exist

### Site help chat

Floating **Help** button (bottom-right, all routes via `app/layout.tsx`) opens `SiteHelpChat`.

- **API:** `POST /api/help-chat` (`message` + optional `history`)
- **Engine:** `lib/site-help.ts` retrieves NexusQ site facts **and** AuditionQ FAQ answers from `faq.ts` (via `lib/auditionq-faq-knowledge.ts`)
- **AuditionQ site:** Product how-tos use the published FAQ (accounts, Talent/Director, apply/publish, teams/roles, photos, settings, browsers). In-app Help topics from `helpTopicPrompts.ts` (report a problem / suggestion / feedback) are covered as well
- **Reply shape:** Answer the question first from the matching FAQ or site fact; visit/open links last
- **NexusQ vs AuditionQ login:** Generic “sign in” on this website uses the NexusQ `/login` answer (this site ≠ AuditionQ). Talent/Director / Get Started questions use the AuditionQ FAQ
- **Follow-ups:** facts already said in the thread are skipped
- **Out of scope:** General/off-topic questions are **not** answered from invention. The assistant asks if they want to reach customer support. If they say yes, it collects an email and Resend sends the visitor a note asking if they want support, plus a copy to `PARTNER_INQUIRY_TO`
- **Optional paraphrase:** `lib/site-help-paraphrase.ts` if `GROQ_API_KEY` or `OPENAI_API_KEY` is set (facts-only; skipped for support handoff)
- Navbar **Guide me** remains a separate spotlight tour (not the Help chat)

### Casting monitor (video box)

- Local primary: `public/videos/casting-bts.mp4` (~4.5 MB today)
- `preload="metadata"`, muted autoplay loop, poster fallback, CDN fallbacks if local fails
- Whole bezel is a link to https://www.auditionq.com/ (`target="_blank"`)
- **Size guidance (no code cap):** keep replacement clips **under 5 MB**, ideally **2–3 MB**, 480p, 10–20s, no audio. 10 MB+ will stall on mobile.

### Design system

Defined in `app/globals.css` as NexusQ tokens (`--nq-bg`, `--nq-surface`, `--nq-accent`, live/vision badges, section utilities). Dark-first product look with cyan accent; light mode uses the same tokens so section copy stays readable. Theme via `next-themes`.

### Homepage honesty rules (enforced in UI)

- Only AuditionQ shows **LIVE** + external CTA
- Other platforms show **VISION** / **EXPLORATION** — no fake store/download/launch buttons
- Trust section uses non-numeric statements (no fabricated metrics)

---

## 3. Recent UI / UX updates

### 2026-08-22 — Help chat: AuditionQ FAQ answers + support email handoff

| Change | Detail |
|--------|--------|
| AuditionQ FAQ | Chat answers product questions from `faq.ts` (full FAQ set: accounts, switch roles, apply/publish, teams, photos, settings, browsers) via `lib/auditionq-faq-knowledge.ts` |
| Help topics | In-app Help prompts from `helpTopicPrompts.ts` (problem / suggestion / feedback, team invite, Shared with me, shortlist) are mapped so “report a problem on AuditionQ” is correct |
| Matching | Word-boundary scoring so “audition” does not steal every “AuditionQ” question; generic site “sign in” stays on NexusQ `/login` |
| Out of scope | Instead of a flat refuse, the assistant asks if they want customer support; **Yes, contact support** → collect email → Resend emails the visitor (“want to reach support?”) and copies the inbox |
| UI | Email placeholder when collecting an address; mailto support link; starter chips use FAQ question wording |
| Docs | Handoff spec source (`docs/build-handoff-pdf.mjs`) updated; regenerate PDF/HTML when next packaging a widget drop |

### 2026-08-22 — Local main sync + project-state refresh

| Change | Detail |
|--------|--------|
| Local sync | Confirmed workspace matches `origin/main` at `7102e96` |
| Dependencies | Fresh `npm install` required after pull — missing `next-themes` caused Module not found on `ThemeProvider` / `ThemeToggle` |
| Prisma | `npx prisma generate` after install (client output under `lib/generated/prisma`, gitignored) |
| Cleanup | Removed empty leftover `app/settings` directory (route already deleted) |
| Docs | This file updated to current architecture, commit, routes, onboarding, and local-run notes |

### 2026-08-21 — Docs + live deploy package

| Change | Detail |
|--------|--------|
| Handoff PDF/HTML | Regenerated from `docs/build-handoff-pdf.mjs` — chat sections match AuditionQ FAQ knowledge, answer-first compose, polished UI; YouTube video-box noted as deferred |
| Live deploy | Push `main` so Vercel picks up film-tape removal, hero slide spacing, help chat expansion + UI |

### 2026-08-21 — Talent ↔ Director switch how-to in help chat

| Change | Detail |
|--------|--------|
| Switch answer | Explains both directions (Talent→Director and Director→Talent), adding a second profile, and what each mode is for |
| Visit link | Kept last — closing line + “Continue on AuditionQ” CTA after the how-to, not as the main answer |

### 2026-08-21 — Hero slide alignment + chat UI polish

| Change | Detail |
|--------|--------|
| Hero slides | Restored spacing after film-tape removal; insight strip no longer crowds the monitor; stats card moved into normal flow (no absolute overlap) |
| Slide CSS | Full-width strip alignment tightened (viewport height, desktop grid columns) |
| Help chat UI | Gradient header, online status, softer message area, bounce typing dots, pill chips, glow send/FAB |

### 2026-08-21 — Remove floating film tape

| Change | Detail |
|--------|--------|
| Film decor | Removed scrolling film strips + corner reels from `CastingSceneBand` (all homepage sections) |
| Hero spacing | Removed empty top/bottom lanes that reserved space for the tape |
| CSS | Deleted `.nq-film-*` / `.nq-scene-hero` film rules from `globals.css` |

### 2026-08-21 — Answer-first help chat replies

| Change | Detail |
|--------|--------|
| Reply shape | Replies lead with the real answer (and optional yes/no), then useful steps — no filler like “Sure, I’ll answer that” |
| Composer | First fact answers the question; remaining facts become steps when useful |
| UI copy | Starter and subtitle kept simple (NexusQ & AuditionQ help) |
| Optional LLM | Paraphrase prompt mirrors the same answer-then-solution structure |

### 2026-08-21 — AuditionQ product facts in help chat

| Change | Detail |
|--------|--------|
| Knowledge | Added AuditionQ topic entries in `lib/site-help.ts`: overview, account/OTP, Talent↔Director switch, talent apply/photos, director publish/review, team collaboration/roles, settings/support |
| Source | Ported from AuditionQ FAQ (`faq.ts`); help-topic prompt labels used as suggestion themes only |
| Starter chips | Help panel welcome + default suggestions point at AuditionQ account / role / partner questions |
| Retrieval | Stronger keyword scoring (normalized multi-word match); password-reset intent; avoid mixing unrelated topics in one reply |
| Clarity | NexusQ `/login` answers distinguish website accounts from AuditionQ Get Started |

### 2026-08-19 — Flexible help-chat replies (on `main`, `550f71b`)

| Change | Detail |
|--------|--------|
| Fact composer | Help chat pulls relevant site facts and shapes the answer to the question (yes/no, how, where, list) instead of one fixed paragraph per topic |
| Follow-ups | Already-said facts are skipped; repeating a topic gets a “covered / ask a follow-up” reply |
| Optional LLM | If `GROQ_API_KEY` or `OPENAI_API_KEY` is set, replies can be paraphrased from those facts only |
| Handoff PDF | `docs/NexusQ-Widget-Handoff.pdf` regenerated — chat spec sections 4–5 describe the composer (open in Edge/browser; Cursor’s PDF viewer often fails) |

### 2026-08-18 — Widget handoff PDF

| Change | Detail |
|--------|--------|
| PDF / HTML | `docs/NexusQ-Widget-Handoff.pdf` + `.html` — video box + AI chatbox specs, limitations, porting guide, full source |
| Regenerator | `docs/build-handoff-pdf.mjs` (Chrome headless) |

### 2026-08-18 — Monitor click-through to AuditionQ

| Change | Detail |
|--------|--------|
| Hero video box | Clicking `CastingMonitor` opens https://www.auditionq.com/ in a new tab |
| Caption | Footer line reads “Visit AuditionQ”; hover/focus glow on the bezel |
| Help chat | AuditionQ answer mentions the clickable homepage video box |

### 2026-08-18 — Site help chat (replaces Website Tour)

| Change | Detail |
|--------|--------|
| Help chat | Floating **Help** button opens a NexusQ assistant panel (cyan, design tokens, light/dark) |
| Scope | NexusQ + AuditionQ product help — products, Talent/Director, casting/teams, partner, sign-in, privacy/terms |
| Off-topic | General knowledge is refused; replies stay inside published site facts |
| Placement | Root layout, so Help is available on `/`, `/login`, `/partner`, legal pages |
| Removed | `EcosystemGuide` Website Tour button and component |

### 2026-08-18 — Cinematic scene bands + hero monitor (merged to `main`)

| Change | Detail |
|--------|--------|
| Scene backgrounds | `CastingSceneBand` wraps every homepage section with photoreal walk scenes |
| WebP performance | Scene plates converted to WebP; hero preloaded; other bands lazy-loaded |
| Hero casting monitor | `CastingMonitor` — BTS video loop with poster fallback; original AuditionQ box labels kept |
| Hero slide cards | `HeroSlideCards` — full-width strip below hero, auto-advances every 3s |
| Film tape layout | Hero-specific `filmLayout="hero"` — tape lanes above/below copy so text does not cover animation (later removed 2026-08-21) |
| Light mode contrast | Stronger overlays + heading/body contrast over bright scene plates |

### 2026-08-08 — Navbar, starfield, theme

| Change | Detail |
|--------|--------|
| Navbar visibility | Fixed Framer Motion / positioning issues that hid the bar on localhost and mobile |
| Mobile nav | Single non-scrolling bar: logo + Home / Platforms / AuditionQ / Future / Partner + ☰; extras in menu |
| Active section | Cyan highlight on the link for the section in view |
| Spacing | Desktop link gaps restored; Sign In kept on desktop (and on larger phones when space allows) |
| Settings removed | No Settings button; `/settings` page deleted |
| Theme | `next-themes` + ThemeToggle in navbar |
| Starfield | Denser moving stars; pointer/touch interaction (`AuroraBackground`; now disabled on homepage) |
| Motion safety | Section animations no longer start at `opacity: 0` (was blanking text on mobile) |
| Mobile layout | Tighter hero / section padding; less empty vertical space |
| Turbopack root | `next.config.ts` pins app root when a parent lockfile exists |

### Earlier — Mongo → Neon Postgres + onboarding (Aug 2026)

| Change | Detail |
|--------|--------|
| Auth DB | Replaced MongoDB/Mongoose with Neon PostgreSQL + Prisma 7 |
| Onboarding | Spotlight tour engine + Guide me; production deploy needs Neon `DATABASE_URL` on Vercel |
| Prisma build | `prisma.config.ts` uses a build-time URL fallback so `prisma generate` succeeds on Vercel |

---

## 4. PostgreSQL setup

### Connection

- Helper: `lib/prisma.ts` (singleton + `PrismaPg` adapter for serverless-safe reuse)
- Env: `DATABASE_URL` (Neon PostgreSQL, `sslmode=require`)
- Hosted DB: Neon project → database **`neondb`** (ap-southeast-1)
- Prisma schema: `prisma/schema.prisma`; CLI config: `prisma.config.ts`
- Apply schema: `npx prisma db push` (or `npm run db:push`)
- Generate client: `npx prisma generate` (also runs as part of `npm run build`)

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
3. **Post-auth** → `sessionStorage.setItem("nq_guide_me", "homepage")` then redirect `/` so Guide tour can start
4. **UI** → `SessionProvider` + `ThemeProvider` + `OnboardingProvider` in `app/providers.tsx`; Navbar shows Sign In or name + Sign Out, ThemeToggle, Guide me

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
| `DATABASE_URL` | Prisma → PostgreSQL (Neon) |
| `NEXTAUTH_SECRET` | JWT signing |
| `NEXTAUTH_URL` | Auth canonical URL (`http://localhost:3000` locally; production Vercel URL in Vercel) |
| `RESEND_API_KEY` | Partner form + help-chat support handoff (server only) |
| `RESEND_FROM_EMAIL` | From address (sandbox: `NexusQ <onboarding@resend.dev>`) |
| `PARTNER_INQUIRY_TO` | Partner inquiries and help-chat support-handoff copies |
| `GROQ_API_KEY` | Optional — help-chat paraphrase (facts-only) |
| `OPENAI_API_KEY` | Optional — same, if Groq is not set |

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

**Local after pull:** always run `npm install` (and `npx prisma generate` if auth/Prisma code changed). Incomplete `node_modules` previously broke localhost with missing `next-themes`.

---

## 8. Pending bugs / known limitations

| Issue | Status / notes |
|-------|----------------|
| Resend **sandbox** only emails the Resend account owner until a domain is verified | Currently `PARTNER_INQUIRY_TO` may be the owner Gmail for testing; target for go-live is `admin@auditionq.com` after domain verify. **Help-chat support handoff** emails the visitor too — sandbox will fail for most visitor addresses until a domain is verified; chat then points them to `admin@auditionq.com` |
| Vercel env cutover | Confirm Neon `DATABASE_URL` is set in Vercel; remove old `MONGODB_URI` so production auth uses Neon |
| `nexus-q.vercel.app` | Appears to be a **different** (Vite) project — do not confuse with this Next.js app |
| Legal pages | Privacy/Terms are **placeholders**, not lawyer-reviewed |
| Vision product copy | FurSure / RideQ / CaringMinds / Onakkodi use honest “vision” placeholders — replace when Lead supplies real descriptions |
| Logo in navbar | Square stacked logo; wordmark can be hard to read at small sizes |
| No automated tests | `package.json` has no test script; rely on lint / `tsc` / build / manual checks |
| Onboarding auto-start | Can feel intrusive on first visit; **Guide me** remains for intentional restarts after Settings removal |
| Starfield on secondary pages | `AuroraBackground` still in repo but disabled on homepage; `/login`, `/partner`, etc. do not use scene bands or starfield |
| Scene plate swap | Replace matching file in `public/scenes/` (keep filename); prefer WebP for `walk-*.webp` bands in use |
| Hero monitor video | Local clip `public/videos/casting-bts.mp4` (~4.5 MB). Keep replacements **under 5 MB** (ideally 2–3 MB, 480p, 10–20s, no audio). YouTube embed deferred. CDN fallbacks if local missing. |
| Help chat | Answers from AuditionQ `faq.ts` + NexusQ site facts. Out-of-scope asks if they want customer support and can email them (Resend; same sandbox limits as partner mail). Update `faq.ts` when AuditionQ FAQ copy changes. |
| Handoff PDF | Spec source `docs/build-handoff-pdf.mjs` updated 2026-08-22 for FAQ + support handoff — regenerate `.pdf`/`.html` when next packaging a widget drop. Open in Edge/Chrome if Cursor PDF viewer fails |
| `mongoose` in package.json | Unused leftover after Mongo → Prisma migration — remove when doing dependency cleanup |
| Incomplete local install | After `git pull`, run `npm install` or theme/onboarding imports can fail (`next-themes`, Prisma client) |

**Resolved recently:** missing mobile navbar, side-scrolling overloaded mobile nav, Future card text invisible in light mode, Settings surface, hero-only background, opacity-0 section text on mobile, slow Chrome scene load (WebP + lazy load), light-mode text over photoreal plates, floating film tape removed from scene bands, hero monitor overlapping heading, Website Tour replaced by Help chat, help chat canned paragraphs replaced by fact composer, Help chat now answers from `faq.ts` and offers emailed customer-support handoff for out-of-scope asks (2026-08-22), localhost Module not found for `next-themes` (fixed via `npm install` 2026-08-22).

No known blocking local bugs for browse / signup / login / partner submit (under current Resend test recipient), once `DATABASE_URL` points at running Postgres and deps are installed.

---

## 9. Pending features (backlog — out of current v1 expansion unless Lead approves)

- Verify Resend domain → deliver partner mail to `admin@auditionq.com` from a branded from-address
- Confirm hosted Postgres env on Vercel production auth
- Custom domain + Cloudflare (explicitly optional for v1)
- Final legal Privacy / Terms copy
- Real product screenshots / media for AuditionQ showcase
- Accurate vision-product blurbs from Lead
- Optional: remove unused `mongoose` dependency
- Optional: extend interactive starfield to `/login` and `/partner`
- Optional: lightweight test suite (Playwright smoke for nav + key sections)
- Analytics (not approved in v1 freeze list without Lead)
- Do **not** add without approval: CMS, blog, admin dashboards, product dashboards, i18n, OAuth expansion, fake vision “apps”, Settings rebuild

---

## 10. Next necessary steps

1. **Resend domain** — verify sending domain; set `RESEND_FROM_EMAIL` + `PARTNER_INQUIRY_TO=admin@auditionq.com`; redeploy; send a real partner test.
2. **Confirm production `NEXTAUTH_URL`** stays the stable public alias (not a one-off deployment URL).
3. **Vercel env** — confirm Neon `DATABASE_URL` in Vercel project settings; remove old `MONGODB_URI`.
4. **Lead content pass** — replace vision placeholders and legal placeholders when supplied.
5. **Optional** — assign a custom domain in Vercel when ready; remove unused `mongoose`.
6. **Keep scope frozen** — polish and ops only unless Lead expands scope.

### Quick local commands

```bash
git pull origin main
npm install                 # required after pull (e.g. next-themes)
cp .env.example .env.local  # first time only — fill secrets including DATABASE_URL
npx prisma generate
npx prisma db push          # if schema changed
npm run dev                 # http://localhost:3000
npm run build
```

### Quick production smoke checklist

- [ ] `/` loads ecosystem LIVE/VISION labels
- [ ] Navbar visible on mobile + desktop; active section highlight works
- [ ] **Guide me** in navbar starts the spotlight tour
- [ ] Theme toggle switches light/dark
- [ ] Scene backgrounds visible while scrolling homepage (WebP plates load promptly in Chrome)
- [ ] Hero casting monitor plays BTS video (or poster fallback)
- [ ] Clicking the hero video box opens https://www.auditionq.com/
- [ ] Hero insight slides aligned under copy/monitor with clear spacing (no overlap with stats card)
- [ ] Help chat looks polished (header glow, bubbles, chips, FAB)
- [ ] Film tape animation is gone (no floating strips/reels over scene bands)
- [ ] Future cards readable in **light** and dark theme
- [ ] `/partner` submit → email arrives
- [ ] `/login` signup + sign-in (tour may start after redirect)
- [ ] Footer Privacy / Terms
- [ ] AuditionQ CTA → https://www.auditionq.com/
- [ ] `/settings` is gone (expect 404)
- [ ] Floating **Help** chat answers NexusQ + AuditionQ FAQ questions correctly (product how-tos match `faq.ts`)
- [ ] Out-of-scope questions (e.g. weather) offer customer support; **Yes, contact support** asks for email
- [ ] Website Tour button is gone

---

## 11. Definition of done (v1 vs remaining)

**Done:** homepage story, ecosystem honesty, AuditionQ proof, future/trust/innovation sections, partner form + Resend path, privacy/terms, motion + cinematic scene-band homepage (CastingSceneBand, hero monitor click-through to auditionq.com, slide cards), responsive nav with active sections + Guide me + theme toggle, light-mode readability over scene plates, SEO basics, GitHub→Vercel deploy, auth on **Neon PostgreSQL** (Prisma; schema pushed), Settings removed, Website Tour replaced by site Help chat (AuditionQ FAQ from `faq.ts` + out-of-scope support-email handoff), spotlight onboarding engine, widget handoff PDF/HTML in `docs/`.

**Remaining for full “email to admin@auditionq.com” production path:** Resend domain verification + env cutover.  
**Remaining for production auth:** confirm Neon `DATABASE_URL` in Vercel env (remove `MONGODB_URI`).  
**Remaining for content maturity:** real legal text + Lead-approved vision copy.
