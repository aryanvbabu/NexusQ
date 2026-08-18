import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docs = join(root, "docs");
mkdirSync(docs, { recursive: true });

function read(rel) {
  return readFileSync(join(root, rel), "utf8").replace(/\r\n/g, "\n");
}

function esc(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const files = {
  monitor: read("app/components/CastingMonitor.tsx"),
  monitorCss: (() => {
    const css = read("app/globals.css");
    const start = css.indexOf(".nq-casting-monitor {");
    const end = css.indexOf("/* TEST ONLY — full-width hero insight strip */");
    return css.slice(start, end).trim();
  })(),
  chat: read("app/components/SiteHelpChat.tsx"),
  api: read("app/api/help-chat/route.ts"),
  knowledge: read("lib/site-help.ts"),
  layoutSnippet: `import SiteHelpChat from "./components/SiteHelpChat";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SiteHelpChat />
      </body>
    </html>
  );
}`,
  heroSnippet: `import CastingMonitor from "./CastingMonitor";

{/* Desktop — beside hero copy */}
<div className="hidden lg:flex lg:justify-end">
  <CastingMonitor />
</div>

{/* Mobile — under hero copy */}
<div className="relative z-20 mt-8 flex justify-center lg:hidden">
  <CastingMonitor />
</div>`,
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>NexusQ Widget Handoff — Video Box and Help Chat</title>
  <style>
    @page { size: A4; margin: 16mm 14mm 18mm; }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      color: #0f172a;
      font: 10.5pt/1.45 "Segoe UI", Calibri, Arial, sans-serif;
    }
    h1 { font-size: 22pt; letter-spacing: -0.03em; margin: 0 0 8pt; color: #082f49; }
    h2 {
      font-size: 14pt;
      color: #0e7490;
      border-bottom: 2px solid #22d3ee;
      padding-bottom: 4pt;
      margin: 22pt 0 10pt;
      page-break-after: avoid;
    }
    h3 { font-size: 12pt; color: #155e75; margin: 16pt 0 6pt; page-break-after: avoid; }
    h4 { font-size: 10.5pt; margin: 12pt 0 4pt; color: #334155; }
    p, li { margin: 0 0 7pt; }
    ul, ol { margin: 0 0 10pt; padding-left: 18pt; }
    table { width: 100%; border-collapse: collapse; margin: 0 0 12pt; font-size: 9.5pt; }
    th, td { border: 1px solid #cbd5e1; padding: 5pt 7pt; vertical-align: top; text-align: left; }
    th { background: #ecfeff; color: #155e75; }
    .cover {
      border: 1px solid #a5f3fc;
      background: #f0fdfa;
      padding: 18pt 20pt;
      margin-bottom: 16pt;
    }
    .kicker { color: #0e7490; font-weight: 700; letter-spacing: 0.12em; font-size: 8.5pt; text-transform: uppercase; }
    .meta { color: #475569; font-size: 9.5pt; }
    .note {
      background: #fff7ed;
      border-left: 4px solid #f59e0b;
      padding: 8pt 10pt;
      margin: 0 0 12pt;
    }
    .ok {
      background: #ecfeff;
      border-left: 4px solid #06b6d4;
      padding: 8pt 10pt;
      margin: 0 0 12pt;
    }
    pre {
      background: #0f172a;
      color: #e2e8f0;
      font: 7pt/1.35 Consolas, "Courier New", monospace;
      padding: 8pt 9pt;
      white-space: pre-wrap;
      word-break: break-word;
      page-break-inside: auto;
      margin: 0 0 12pt;
    }
    code { font-family: Consolas, "Courier New", monospace; font-size: 9pt; }
    .toc a { color: #0e7490; text-decoration: none; }
    .path { font-family: Consolas, monospace; font-size: 9pt; color: #0f766e; }
    .footer-note { font-size: 8.5pt; color: #64748b; }
    .pagebreak { page-break-before: always; }
  </style>
</head>
<body>
  <section class="cover">
    <p class="kicker">NexusQ Global · Engineering handoff</p>
    <h1>Video box and site help chat</h1>
    <p>Video box and AI chatbox: specifications, limitations, future plan, porting guide, and full source.</p>
    <p class="meta">
      Date: 18 August 2026<br />
      Source repo: github.com/aryanvbabu/NexusQ<br />
      Live parent site: NexusQ Global (Next.js 16, App Router)<br />
      Purpose: reuse the same widgets on another live website after approval (target: AuditionQ or any NexusQ product site)
    </p>
  </section>

  <h2>1. What we built on NexusQ Global</h2>
  <p>
    Two visitor-facing widgets were added to the NexusQ Global marketing site. They are independent:
    the video box can ship without the chat, and the chat can ship without the video box.
  </p>
  <table>
    <tr><th>Widget</th><th>What the visitor sees</th><th>Shipped behaviour</th></tr>
    <tr>
      <td>Casting video box</td>
      <td>Hero “Live audition / AuditionQ” monitor with looping BTS video</td>
      <td>Click opens https://www.auditionq.com/ in a new tab</td>
    </tr>
    <tr>
      <td>Site help chat</td>
      <td>Fixed bottom-right <strong>Help</strong> button → assistant panel</td>
      <td>Answers only NexusQ website questions; refuses general knowledge</td>
    </tr>
  </table>
  <p>
    The old floating <strong>Website Tour</strong> button (<code>EcosystemGuide</code>) was removed.
    Navbar <strong>Guide me</strong> (spotlight tour) is separate and was left in place.
  </p>
  <p class="footer-note">Commit on main that introduced the chat: dc05e64. Video-box click-through is a later local change described in this document.</p>

  <h2>2. Table of contents</h2>
  <ol class="toc">
    <li>What we built</li>
    <li>Video box — specification and limitations</li>
    <li>AI chatbox — specification</li>
    <li>AI chatbox — limitations</li>
    <li>AI chatbox — future plan</li>
    <li>How to implement the video box on another site</li>
    <li>How to implement the AI chatbox on another site</li>
    <li>Approval / port checklist</li>
    <li>Appendix A — video box full code</li>
    <li>Appendix B — AI chatbox full code</li>
  </ol>

  <h2>3. Video box — specification</h2>
  <h3>3.1 Purpose</h3>
  <p>
    A compact “casting monitor” that proves the live product with motion, then sends the visitor
    to that product in one click. On NexusQ it advertises AuditionQ.
  </p>
  <h3>3.2 Functional spec</h3>
  <table>
    <tr><th>Item</th><th>Spec</th></tr>
    <tr><td>Component</td><td><span class="path">app/components/CastingMonitor.tsx</span></td></tr>
    <tr><td>Styles</td><td><span class="path">app/globals.css</span> classes <code>.nq-casting-monitor*</code></td></tr>
    <tr><td>Placement</td><td>Hero: desktop right of copy; mobile below copy</td></tr>
    <tr><td>Primary source</td><td><span class="path">public/videos/casting-bts.mp4</span></td></tr>
    <tr><td>Fallbacks</td><td>Three Mixkit/Pexels CDN MP4 URLs if local file fails</td></tr>
    <tr><td>Poster</td><td><span class="path">public/scenes/casting-audition.webp</span></td></tr>
    <tr><td>Playback</td><td>autoPlay, muted, loop, playsInline; preload metadata</td></tr>
    <tr><td>Click</td><td>Whole bezel is an <code>&lt;a&gt;</code> to https://www.auditionq.com/ (<code>target="_blank"</code>, <code>rel="noopener noreferrer"</code>)</td></tr>
    <tr><td>Reduced motion</td><td>If <code>prefers-reduced-motion</code>, show poster image only (no autoplay)</td></tr>
    <tr><td>Error handling</td><td>On video error, try next source; if all fail, poster only</td></tr>
    <tr><td>Chrome sizes</td><td>Bezel width 340 / 360 / 400px; screen height 190 / 210 / 228px</td></tr>
    <tr><td>Chrome chrome</td><td>REC dot, “Live audition”, AuditionQ badge, scanline overlay, caption “Visit AuditionQ”</td></tr>
    <tr><td>Hover / focus</td><td>Cyan glow and 2px lift; video/img <code>pointer-events: none</code> so clicks hit the link</td></tr>
    <tr><td>A11y</td><td><code>aria-label="Visit AuditionQ"</code>; keyboard-focusable as a link</td></tr>
    <tr><td>Dependencies</td><td>React; <code>framer-motion</code> only for <code>useReducedMotion()</code></td></tr>
  </table>
  <h3>3.3 Non-goals (current)</h3>
  <ul>
    <li>No sound, controls, fullscreen, or captions.</li>
    <li>No in-page product iframe — destination is the live product URL.</li>
    <li>Not a general video player; it is a branded CTA with motion.</li>
  </ul>
  <h3>3.4 Video box limitations</h3>
  <table>
    <tr><th>Limitation</th><th>Impact</th></tr>
    <tr><td>Muted autoplay only</td><td>Browsers block unmuted autoplay; there is no volume control</td></tr>
    <tr><td>CDN fallbacks</td><td>Third-party URLs can disappear or be the wrong brand on a second site</td></tr>
    <tr><td>No captions / transcript</td><td>Not a complete media alternative for accessibility</td></tr>
    <tr><td>No pause-when-offscreen</td><td>Video may still decode after the user scrolls away</td></tr>
    <tr><td>Opens a new tab</td><td>Some products may want same-tab navigation</td></tr>
    <tr><td>Single destination</td><td>Cannot deep-link to a logged-in dashboard without changing the URL</td></tr>
    <tr><td>Local MP4 size</td><td>A large file hurts first load on mobile</td></tr>
    <tr><td>Reduced-motion users</td><td>See a still only; the click still works</td></tr>
  </table>

  <h2 class="pagebreak">4. AI chatbox — specification</h2>
  <div class="ok">
    <strong>Product name on site:</strong> NexusQ Assistant (floating <strong>Help</strong> button).<br />
    <strong>What it is:</strong> a website-only guide that answers questions from a fixed NexusQ knowledge file.<br />
    <strong>What it is not:</strong> not ChatGPT, not a general AI, not live human support, not an AuditionQ account helper.
  </div>

  <h3>4.1 Purpose and scope</h3>
  <p>
    The assistant exists so a visitor can ask “what is this site?”, “is AuditionQ live?”, “how do I partner?”,
    or “how do I sign in?” and get a short, honest answer plus a link. It must stay inside published NexusQ
    website facts. If the question is about weather, homework, coding, news, or any other general topic, it must refuse.
  </p>
  <table>
    <tr><th>In scope</th><th>Out of scope</th></tr>
    <tr>
      <td>NexusQ Global identity; Live vs Vision vs Exploration; named products; how to use this website; partner form; email; sign-in/sign-up on this site; privacy/terms placeholders; theme; the clickable hero video box</td>
      <td>General knowledge; writing code; AuditionQ in-app support (casting workflows, billing, password reset on auditionq.com); legal advice; invented metrics, launch dates, or office address</td>
    </tr>
  </table>

  <h3>4.2 Architecture spec</h3>
  <table>
    <tr><th>Layer</th><th>File</th><th>Spec</th></tr>
    <tr><td>UI</td><td><span class="path">app/components/SiteHelpChat.tsx</span></td><td>Client widget: Help FAB, panel, bubbles, suggestion chips, input, POST to API</td></tr>
    <tr><td>HTTP API</td><td><span class="path">app/api/help-chat/route.ts</span></td><td><code>POST /api/help-chat</code> only. No GET. No streaming.</td></tr>
    <tr><td>Engine</td><td><span class="path">lib/site-help.ts</span></td><td>Keyword retrieval + canned answers. Synchronous. No network out.</td></tr>
    <tr><td>Mount</td><td><span class="path">app/layout.tsx</span></td><td>One instance on every route (home, login, partner, privacy, terms)</td></tr>
  </table>
  <p>
    Runtime: Next.js App Router on the same origin. <strong>No LLM provider, no API key, no extra environment variable, no database.</strong>
    Cost per message is CPU only.
  </p>

  <h3>4.3 UI / UX spec</h3>
  <table>
    <tr><th>Element</th><th>Specification</th></tr>
    <tr><td>Launcher</td><td>Fixed bottom-right (16–24px inset), z-index 80, cyan pill, pulse dot + “Help”</td></tr>
    <tr><td>Open panel</td><td>Width min(22.5rem, viewport − 2rem); height min(32rem, 100dvh − 5.5rem). Launcher hides while open.</td></tr>
    <tr><td>Header</td><td>Title “NexusQ Assistant”, subtitle “Website help only”, close (X)</td></tr>
    <tr><td>Welcome</td><td>One assistant message explaining website-only scope + 4 suggestion chips</td></tr>
    <tr><td>Default chips</td><td>What is NexusQ Global? · Is AuditionQ live? · How do I partner with you? · How do I sign in?</td></tr>
    <tr><td>User bubble</td><td>Right-aligned, cyan</td></tr>
    <tr><td>Assistant bubble</td><td>Left-aligned; optional link under the text; new suggestion chips after each reply</td></tr>
    <tr><td>Loading</td><td>Shows “Thinking…” until the API returns</td></tr>
    <tr><td>Input</td><td>Placeholder “Ask about this website…”; maxlength 500; Send disabled when empty or loading</td></tr>
    <tr><td>Keyboard</td><td>Enter sends; Escape closes; focus moves to the input on open</td></tr>
    <tr><td>Theme</td><td>Uses <code>--nq-*</code> tokens so light and dark both stay readable</td></tr>
    <tr><td>Motion</td><td>Framer Motion panel enter/exit (~180ms)</td></tr>
  </table>

  <h3>4.4 API spec</h3>
  <p><strong>Request</strong> — <code>POST /api/help-chat</code>, <code>Content-Type: application/json</code></p>
  <pre>${esc(`{
  "message": "Is AuditionQ live?",
  "history": [
    { "role": "user", "content": "What is NexusQ?" },
    { "role": "assistant", "content": "NexusQ Global is a parent company..." }
  ]
}`)}</pre>
  <table>
    <tr><th>Field</th><th>Rule</th></tr>
    <tr><td>message</td><td>Required string, trimmed, 1–500 characters</td></tr>
    <tr><td>history</td><td>Optional array; last 8 items kept; each content clipped to 500 chars; role must be user or assistant</td></tr>
  </table>
  <p><strong>Success (200)</strong></p>
  <pre>${esc(`{
  "answer": "AuditionQ is NexusQ Global's live flagship product...",
  "link": { "label": "Visit AuditionQ", "href": "https://www.auditionq.com/", "external": true },
  "suggestions": ["Are any other products live?", "How do I partner with NexusQ?"]
}`)}</pre>
  <p><strong>Errors</strong></p>
  <table>
    <tr><th>Status</th><th>When</th></tr>
    <tr><td>400</td><td>Empty message, or message longer than 500 characters</td></tr>
    <tr><td>500</td><td>JSON parse / unexpected server error</td></tr>
  </table>

  <h3>4.5 Matching engine spec</h3>
  <ol>
    <li>Trim the message. Empty → prompt the visitor to ask about the website.</li>
    <li>Short greeting (hi/hello/hey…) → welcome copy, no retrieval.</li>
    <li>Short thanks (thanks/ok/got it…) → acknowledgement, no retrieval.</li>
    <li>If the line looks like a follow-up (“what about…”, “is it…”, ≤10 words), prepend the previous user + a slice of the previous assistant text.</li>
    <li>Lowercase and strip punctuation.</li>
    <li>If the text matches the off-topic list and has no site term → refuse.</li>
    <li>Score every knowledge entry: +5 keyword hit, +8 multi-word keyword, +2 title-word hit.</li>
    <li>Need score ≥5 normally, or ≥3 if a site term is present. Else: “I do not have that in the NexusQ site guide.”</li>
    <li>If the 2nd-best score is close (≥72% of best and ≥5), concatenate both answers.</li>
    <li>Return answer + optional link + suggestion chips from the winning entry.</li>
  </ol>
  <p>Site terms include product names (NexusQ, AuditionQ, FurSure, RideQ, CaringMinds, Onakkodi), partner/login/privacy/terms, and phrases such as “this website”. Off-topic examples: weather, recipes, jokes, homework, sports, crypto, “write python/javascript/code”.</p>

  <h3>4.6 Knowledge coverage spec (current)</h3>
  <table>
    <tr><th>Topic id</th><th>Visitor can ask about</th></tr>
    <tr><td>what-is-nexusq</td><td>Who NexusQ is / what this website is</td></tr>
    <tr><td>how-to-use-site</td><td>Nav, sections, Guide me, clicking the video box</td></tr>
    <tr><td>auditionq</td><td>Live flagship, auditionq.com, monitor click</td></tr>
    <tr><td>ecosystem</td><td>Named platforms and their status</td></tr>
    <tr><td>live-vs-vision</td><td>Meaning of Live / Vision / Exploration</td></tr>
    <tr><td>fursure, rideq, caringminds, onakkodi, future-ai</td><td>Each vision/exploration product — not launched</td></tr>
    <tr><td>partner / email</td><td>Partner form and admin@auditionq.com</td></tr>
    <tr><td>login</td><td>This site’s sign-in/up (not AuditionQ product login); no Settings page</td></tr>
    <tr><td>privacy / terms</td><td>That those pages are placeholders</td></tr>
    <tr><td>trust / theme / vision-company</td><td>Honesty rules, light/dark, why the company exists</td></tr>
  </table>

  <h3>4.7 Honesty / safety spec</h3>
  <ul>
    <li>Only AuditionQ may be described as Live.</li>
    <li>Vision and exploration products must not get store, download, or launch actions.</li>
    <li>No fabricated metrics, testimonials, customer logos, phone number, or street address.</li>
    <li>Legal pages must be described as placeholders until lawyer-reviewed copy exists.</li>
    <li>When public site copy changes, <span class="path">lib/site-help.ts</span> must be updated in the same change.</li>
    <li>The assistant must not claim to be a large language model or to browse the web.</li>
  </ul>

  <h3>4.8 Privacy, security, performance spec</h3>
  <table>
    <tr><th>Item</th><th>Specification</th></tr>
    <tr><td>PII</td><td>Chat does not ask for passwords. Messages are not written to the database. They exist in browser state and in the single POST body.</td></tr>
    <tr><td>Auth</td><td>Endpoint is public (same as the marketing site). No login required to ask.</td></tr>
    <tr><td>Rate limit</td><td>None in v1.</td></tr>
    <tr><td>Secrets</td><td>None. Do not add provider keys unless Lead approves an LLM phase.</td></tr>
    <tr><td>Latency</td><td>Local CPU match; typically tens of milliseconds after the route is warm.</td></tr>
    <tr><td>Availability</td><td>If <code>/api/help-chat</code> fails, the UI shows an error bubble and keeps the panel open.</td></tr>
    <tr><td>Languages</td><td>English keywords and answers only.</td></tr>
  </table>

  <h3>4.9 Behaviour matrix (expected replies)</h3>
  <table>
    <tr><th>Visitor says</th><th>Expected behaviour</th></tr>
    <tr><td>Hi / hello</td><td>Welcome + default chips</td></tr>
    <tr><td>What is NexusQ?</td><td>Parent-company answer + Home link</td></tr>
    <tr><td>Is AuditionQ live?</td><td>Yes, flagship, link to auditionq.com; mention video-box click</td></tr>
    <tr><td>Is FurSure / RideQ live?</td><td>No — vision, not launched</td></tr>
    <tr><td>How do I partner?</td><td>Partner form path + admin@auditionq.com</td></tr>
    <tr><td>How do I sign in?</td><td>/login on this site; not AuditionQ product login</td></tr>
    <tr><td>What’s the weather? / write my homework</td><td>Refuse; stay website-only</td></tr>
    <tr><td>Thanks</td><td>Short acknowledgement</td></tr>
    <tr><td>Unrecognised site-ish question</td><td>Fallback: try NexusQ / AuditionQ / partner / sign-in</td></tr>
  </table>

  <h2 class="pagebreak">5. AI chatbox — limitations</h2>
  <p>
    These limits are part of the product spec. Do not promise ChatGPT-quality answers when porting this widget.
  </p>
  <h3>5.1 Intelligence and accuracy</h3>
  <table>
    <tr><th>Limitation</th><th>What that means</th></tr>
    <tr><td>Not an LLM</td><td>It does not understand language. It scores keywords against a list. Unusual wording, heavy typos, or mixed questions can miss.</td></tr>
    <tr><td>No reasoning</td><td>It cannot compare options, debug an account, or multi-step plan. It returns stored paragraphs.</td></tr>
    <tr><td>No live browsing</td><td>It cannot read auditionq.com, email, or a CMS at request time.</td></tr>
    <tr><td>Knowledge can go stale</td><td>If marketing copy changes and <code>site-help.ts</code> is not updated, answers are wrong.</td></tr>
    <tr><td>Two-topic merge</td><td>Close-scoring entries may be concatenated; the reply can feel long or slightly mixed.</td></tr>
    <tr><td>Follow-up quality is basic</td><td>Only short “what about / is it / how…” lines are stitched onto the previous turn.</td></tr>
  </table>
  <h3>5.2 Scope and product honesty</h3>
  <table>
    <tr><th>Limitation</th><th>What that means</th></tr>
    <tr><td>Website facts only</td><td>Cannot help with AuditionQ casting tools, billing, or password reset inside the live product.</td></tr>
    <tr><td>No human agent</td><td>No live chat queue. The panel can only point at /partner or email.</td></tr>
    <tr><td>Off-topic list is finite</td><td>Some general questions may still get a weak site match instead of a clean refuse.</td></tr>
    <tr><td>Must not invent</td><td>Will not (and must not) create metrics, launch dates, prices, or an office address.</td></tr>
    <tr><td>Legal copy is placeholder</td><td>Privacy/terms answers say the pages are not lawyer-reviewed.</td></tr>
  </table>
  <h3>5.3 UX, language, and access</h3>
  <table>
    <tr><th>Limitation</th><th>What that means</th></tr>
    <tr><td>English only</td><td>No i18n; non-English questions will usually fall through to the fallback.</td></tr>
    <tr><td>500 character input</td><td>Long support tickets do not belong here.</td></tr>
    <tr><td>8-turn history cap</td><td>Older context is dropped on the server.</td></tr>
    <tr><td>Thread not persisted</td><td>Reload or a new device starts from the welcome message.</td></tr>
    <tr><td>No voice / no attachments / no markdown rendering beyond line breaks</td><td>Text only.</td></tr>
    <tr><td>No streaming tokens</td><td>The visitor waits for the full answer (“Thinking…”).</td></tr>
    <tr><td>Mobile overlap</td><td>The FAB can sit on top of other sticky UI on a different site unless z-index and offsets are retuned.</td></tr>
    <tr><td>Tailwind + NexusQ tokens</td><td>A host without those classes needs a style map.</td></tr>
  </table>
  <h3>5.4 Operations and security</h3>
  <table>
    <tr><th>Limitation</th><th>What that means</th></tr>
    <tr><td>No rate limiting</td><td>A bot can POST repeatedly. Fine for low marketing traffic; not hardened.</td></tr>
    <tr><td>No unanswered-question log</td><td>You cannot see which asks failed unless you add logging later (avoid storing PII).</td></tr>
    <tr><td>Public endpoint</td><td>Anyone can call <code>/api/help-chat</code>. The engine only returns canned site text, so leakage risk is the knowledge file itself.</td></tr>
    <tr><td>No automated tests</td><td>The repo has no test script; behaviour is checked manually.</td></tr>
  </table>
  <h3>5.5 What this chatbox will never do in v1</h3>
  <ul>
    <li>Answer general world knowledge.</li>
    <li>Place AuditionQ auditions or manage a performer’s account.</li>
    <li>Send email by itself (partner mail is a different form).</li>
    <li>Remember the visitor after refresh.</li>
    <li>Speak, take files, or take payments.</li>
  </ul>

  <h2>6. AI chatbox — future plan</h2>
  <p>Not in the current NexusQ v1 freeze unless Lead approves. Suggested order if the widget is copied to another live site:</p>
  <ol>
    <li><strong>Rewrite knowledge for that product</strong> (mandatory before go-live).</li>
    <li><strong>Unanswered-question log</strong> (no PII) to grow the knowledge file.</li>
    <li><strong>Rate limit</strong> <code>POST /api/help-chat</code> per IP.</li>
    <li><strong>Handoff chip</strong> into the partner/support form, prefilled from the last question.</li>
    <li><strong>Persist thread</strong> in <code>sessionStorage</code>.</li>
    <li><strong>Generate answers from live page copy</strong> so the file cannot drift.</li>
    <li><strong>Optional grounded LLM</strong> — only if it may quote the knowledge file and must still refuse general topics. Not required to port v1.</li>
    <li>Streaming UI, i18n, or an admin FAQ CMS only if Lead expands scope.</li>
  </ol>

  <h2 class="pagebreak">7. How to implement the video box on another live website</h2>
  <div class="ok">
    <strong>Porting rule:</strong> copy the component + CSS, then change four things: destination URL, labels, local MP4, poster image. Do not keep AuditionQ copy if the host site is a different product.
  </div>
  <h3>7.1 Files to copy</h3>
  <ol>
    <li>Component (TypeScript React, client component).</li>
    <li>CSS block <code>.nq-casting-monitor</code> through the blink keyframes (Appendix A).</li>
    <li>A local MP4 under the other site’s static folder (example: <code>public/videos/product-bts.mp4</code>).</li>
    <li>A poster still (WebP or JPEG).</li>
  </ol>
  <h3>7.2 Values to replace</h3>
  <table>
    <tr><th>NexusQ value</th><th>Change on the other site</th></tr>
    <tr><td><code>AUDITIONQ_URL</code></td><td>That site’s live URL or a specific in-app route</td></tr>
    <tr><td>Label “Live audition”</td><td>Product-accurate status line</td></tr>
    <tr><td>Badge “AuditionQ”</td><td>Host product name</td></tr>
    <tr><td>Caption “Visit AuditionQ”</td><td>“Visit {product}” / “Open app”</td></tr>
    <tr><td><code>aria-label</code></td><td>Match the destination</td></tr>
    <tr><td><code>VIDEO_SOURCES[0]</code></td><td>Hosted MP4 on the same origin</td></tr>
    <tr><td>CDN fallbacks</td><td>Remove or replace with licensed clips for that brand</td></tr>
    <tr><td><code>POSTER</code></td><td>Product still from that site</td></tr>
  </table>
  <h3>7.3 If the other site is not Next.js</h3>
  <ul>
    <li>Drop <code>"use client"</code>.</li>
    <li>Replace <code>useReducedMotion</code> from Framer Motion with
      <code>window.matchMedia("(prefers-reduced-motion: reduce)").matches</code>.</li>
    <li>Keep the same JSX structure (anchor wrapping the bezel).</li>
    <li>Paste the CSS as-is; class names do not require Tailwind.</li>
  </ul>
  <h3>7.4 Hero wiring (current NexusQ)</h3>
  <pre>${esc(files.heroSnippet)}</pre>
  <h3>7.5 Asset checklist</h3>
  <ul>
    <li>MP4: H.264, muted-friendly, short loop (10–30s), keep under a few MB.</li>
    <li>Serve from the same origin so autoplay is reliable.</li>
    <li>Poster should match the first frame so load flash is small.</li>
    <li>iOS autoplay requires <code>muted</code> + <code>playsInline</code>.</li>
  </ul>
  <h3>7.6 Video box future plan (port phase 2)</h3>
  <ol>
    <li>Product-owned footage only — drop Mixkit/Pexels fallbacks.</li>
    <li>Click analytics (destination, device, page).</li>
    <li>Pause when the monitor leaves the viewport.</li>
    <li>Optional same-tab vs new-tab.</li>
    <li>Captions / still alt text.</li>
    <li>Deep links (e.g. talent signup vs casting login) if the product wants two CTAs.</li>
  </ol>

  <h2 class="pagebreak">8. How to implement the AI chatbox on another live website</h2>
  <div class="note">
    <strong>Do not paste the NexusQ knowledge file unchanged onto AuditionQ (or any other product).</strong>
    Rewrite <code>knowledge</code>, <code>SITE_TERMS</code>, welcome copy, and suggestion chips so the bot only
    knows that product’s public facts.
  </div>
  <h3>8.1 Recommended port steps</h3>
  <ol>
    <li>Copy <span class="path">SiteHelpChat.tsx</span>, <span class="path">route.ts</span>, <span class="path">site-help.ts</span>.</li>
    <li>Mount the chat once in the root layout so it appears on all pages.</li>
    <li>Rename “NexusQ Assistant” → “{Product} Assistant”.</li>
    <li>Replace every knowledge <code>answer</code> with that site’s published copy only.</li>
    <li>Replace <code>SITE_TERMS</code> with that product’s names and routes.</li>
    <li>Point links at that site’s routes.</li>
    <li>Keep the off-topic refuse behaviour and the honesty rules.</li>
    <li>If the host is not Next.js: keep the engine as a plain TS/JS module; expose <code>POST /api/help-chat</code> with the same JSON contract (section 4.4).</li>
    <li>Map Tailwind + <code>nq-*</code> classes to the host design tokens.</li>
    <li>If you cannot use Next <code>Link</code>, use ordinary <code>&lt;a href&gt;</code>.</li>
  </ol>
  <h3>8.2 Required CSS variables</h3>
  <pre>${esc(`--nq-bg
--nq-surface
--nq-surface-elevated
--nq-text
--nq-muted
--nq-border
--nq-accent-soft`)}</pre>
  <h3>8.3 Layout mount (current NexusQ)</h3>
  <pre>${esc(files.layoutSnippet)}</pre>
  <h3>8.4 npm packages used by the chat UI</h3>
  <ul>
    <li><code>framer-motion</code> — panel enter/exit</li>
    <li><code>lucide-react</code> — MessageCircle, Send, Sparkles, X</li>
    <li>Next.js App Router — <code>Link</code> and <code>app/api/help-chat/route.ts</code></li>
  </ul>
  <p>The retrieval engine itself has <strong>zero</strong> npm dependencies.</p>
  <h3>8.5 Suggested build order on the other site</h3>
  <ol>
    <li>Video box with first-party MP4 + click-through.</li>
    <li>Help chat UI + small knowledge (who we are, how to sign in, how to contact).</li>
    <li>Expand knowledge from that site’s real pages only.</li>
    <li>QA: off-topic refuse, live vs vision honesty, mobile FAB vs sticky bars.</li>
    <li>Then analytics / optional grounded LLM / captions as a second phase.</li>
  </ol>

  <h2>9. Approval / port checklist</h2>
  <table>
    <tr><th>#</th><th>Check</th></tr>
    <tr><td>1</td><td>Lead approves copying these two widgets to the other live website</td></tr>
    <tr><td>2</td><td>Video destination URL, labels, and badge rewritten for that product</td></tr>
    <tr><td>3</td><td>First-party video + poster licensed and hosted on that origin</td></tr>
    <tr><td>4</td><td>Click opens the correct live product (desktop + mobile)</td></tr>
    <tr><td>5</td><td>Reduced-motion users still get a working video-box link</td></tr>
    <tr><td>6</td><td>Chat knowledge rewritten; NexusQ-only facts removed</td></tr>
    <tr><td>7</td><td>Chat spec in this PDF is implemented (website-only, refuse general, 500-char cap)</td></tr>
    <tr><td>8</td><td>Off-topic questions are refused; no invented metrics or fake live products</td></tr>
    <tr><td>9</td><td>Help button does not cover primary CTAs on small screens</td></tr>
    <tr><td>10</td><td>No new env secrets unless an LLM phase is approved</td></tr>
  </table>

  <h2 class="pagebreak">Appendix A — video box entire current code</h2>
  <h3>A.1 <span class="path">app/components/CastingMonitor.tsx</span></h3>
  <pre>${esc(files.monitor)}</pre>
  <h3>A.2 Monitor CSS from <span class="path">app/globals.css</span></h3>
  <pre>${esc(files.monitorCss)}</pre>

  <h2 class="pagebreak">Appendix B — AI chatbox entire current code</h2>
  <h3>B.1 <span class="path">app/components/SiteHelpChat.tsx</span></h3>
  <pre>${esc(files.chat)}</pre>
  <h3 class="pagebreak">B.2 <span class="path">app/api/help-chat/route.ts</span></h3>
  <pre>${esc(files.api)}</pre>
  <h3>B.3 <span class="path">lib/site-help.ts</span> (knowledge + matcher)</h3>
  <pre>${esc(files.knowledge)}</pre>

  <p class="footer-note">
    Generated from the NexusQ Global repo on 18 August 2026. Specs and limitations are in sections 3–6
    (before the code appendices). Prefer git if the repo has moved on.
  </p>
</body>
</html>
`;

const htmlPath = join(docs, "NexusQ-Widget-Handoff.html");
const pdfPath = join(docs, "NexusQ-Widget-Handoff.pdf");
writeFileSync(htmlPath, html, "utf8");

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const fileUrl = "file:///" + htmlPath.replaceAll("\\", "/");

execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    "--print-to-pdf-no-header",
    fileUrl,
  ],
  { stdio: "inherit" }
);

console.log("Wrote", htmlPath);
console.log("Wrote", pdfPath);
