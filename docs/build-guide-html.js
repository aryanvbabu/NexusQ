const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(
  path.join(__dirname, "ActingSceneBackground.tsx"),
  "utf8"
);

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Acting Scene Background — Implementation Guide</title>
<style>
  @page { size: A4; margin: 14mm; }
  body { font-family: Segoe UI, Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #111; }
  h1 { font-size: 20pt; margin: 0 0 8px; }
  h2 { font-size: 14pt; margin: 22px 0 8px; border-bottom: 1px solid #ccc; padding-bottom: 4px; page-break-after: avoid; }
  h3 { font-size: 12pt; margin: 14px 0 6px; }
  p, li { margin: 6px 0; }
  table { border-collapse: collapse; width: 100%; margin: 10px 0 14px; font-size: 10pt; }
  th, td { border: 1px solid #bbb; padding: 6px 8px; vertical-align: top; text-align: left; }
  th { background: #f3f4f6; }
  code { font-family: Consolas, monospace; font-size: 9.5pt; background: #f4f4f5; padding: 1px 4px; }
  pre { background: #0f172a; color: #e2e8f0; padding: 12px; border-radius: 6px; font-size: 8pt; line-height: 1.35; white-space: pre-wrap; word-break: break-word; }
  .meta { color: #444; font-size: 10pt; margin-bottom: 18px; }
  .box { border: 1px solid #ddd; padding: 10px 12px; margin: 10px 0; background: #fafafa; }
  .arch { font-family: Consolas, monospace; white-space: pre; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; font-size: 9pt; }
</style>
</head>
<body>
<h1>Acting Scene Background — Implementation Guide</h1>
<p class="meta"><strong>Purpose:</strong> Port the NexusQ cinematic acting-scene animation to another website (e.g. AuditionQ).<br/>
<strong>Source:</strong> NexusQ branch <code>cinematic-background-test</code><br/>
<strong>Date:</strong> 2026-08-11<br/>
<strong>Status:</strong> Test-proven on NexusQ; ready to copy</p>

<h2>1. What this animation is</h2>
<p>A full-viewport animated SVG background with:</p>
<ul>
<li>An <strong>actor</strong> performing in front of the camera</li>
<li>A <strong>cameraman</strong> wearing a <strong>director cap</strong>, operating a cinema camera</li>
<li>Studio <strong>scenery</strong> (cyclorama, lights, director chair, boom mic, cases, clapperboard)</li>
<li>Smooth Framer Motion loops</li>
<li><strong>Light mode + dark mode</strong> support</li>
<li>Mobile-reduced motion + <code>prefers-reduced-motion</code> support</li>
</ul>
<p>It sits <strong>behind</strong> all website content and does not block clicks.</p>

<h2>2. Files you need to create</h2>
<table>
<thead><tr><th>Action</th><th>Path on target site</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>CREATE</strong></td><td><code>app/components/ActingSceneBackground.tsx</code></td><td>Copy full source from Section 9</td></tr>
<tr><td><strong>MODIFY</strong></td><td>Homepage (e.g. <code>app/page.tsx</code>)</td><td>Mount background + wrap content (Section 5)</td></tr>
<tr><td><strong>OPTIONAL</strong></td><td>Theme / CSS tokens</td><td>Retune veil if no <code>bg-nq-bg</code> (Section 6)</td></tr>
</tbody>
</table>
<div class="box"><strong>Do NOT need:</strong> AuroraBackground.tsx, FilmSetBackground.tsx, public/film-background.jpg, or NexusQ card CSS fixes (unless the target has the same transparency bugs).</div>

<h2>3. Dependencies</h2>
<pre>npm install framer-motion</pre>
<p>Also required: React 18+, Next.js App Router client components (<code>"use client"</code>), Tailwind recommended.</p>

<h2>4. Architecture (must keep)</h2>
<div class="arch">ActingSceneBackground
  fixed · inset-0 · z-0 · pointer-events-none
  full-bleed SVG (preserveAspectRatio=xMidYMid slice)
        ▲
Site content (relative z-10)
  Navbar · Hero · Sections · Footer (stationary)</div>
<ol>
<li>Background: <code>pointer-events-none</code> + <code>fixed inset-0</code> + <code>z-0</code></li>
<li>Content: <code>relative z-10</code></li>
<li>Parent: <code>relative</code> + <code>overflow-x-hidden</code></li>
<li>SVG fills the screen with <code>h-full w-full</code> + slice</li>
</ol>

<h2>5. Exact page wiring (what to change)</h2>
<h3>Minimal pattern</h3>
<pre>${esc(`import ActingSceneBackground from "./components/ActingSceneBackground";
// Keep your old background import commented — do not delete the file

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* <OldBackground /> */}
      <ActingSceneBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        {/* all existing sections unchanged */}
      </div>
    </main>
  );
}`)}</pre>

<h2>6. Theme / readability adaptations</h2>
<p>If there is no <code>bg-nq-bg</code>, replace the veil near the bottom of the component:</p>
<pre>${esc(`<div className="absolute inset-0 bg-nq-bg/30 dark:bg-nq-bg/38" />`)}</pre>
<p>With site tokens, for example:</p>
<pre>${esc(`<div className="absolute inset-0 bg-background/30 dark:bg-background/40" />
/* or */
<div className="absolute inset-0 bg-white/35 dark:bg-black/40" />`)}</pre>
<p>Use <strong>solid</strong> card backgrounds over this scene. Avoid Tailwind opacity on CSS-variable colors (e.g. <code>bg-surface/85</code>) — they often fail.</p>

<h2>7. Implementation checklist</h2>
<ol>
<li>Create a <strong>test branch</strong> on the target repo</li>
<li>Install <code>framer-motion</code> if needed</li>
<li>Create <code>ActingSceneBackground.tsx</code> with Section 9 source</li>
<li>Wire homepage (fixed BG + z-10 content)</li>
<li>Comment out old background without deleting it</li>
<li>Test desktop, mobile, light, dark</li>
<li>Test reduced motion</li>
<li>Tune veil for text contrast</li>
<li>Confirm clicks work; no horizontal scroll</li>
<li>Optional feature flag; keep one-line revert</li>
</ol>

<h2>8. Performance and safety</h2>
<ul>
<li>Transforms/opacity only (already done)</li>
<li>Mobile uses smaller motion (<code>amp = 0.5</code>)</li>
<li>Respects <code>prefers-reduced-motion</code></li>
<li>Start on homepage only</li>
<li>Do not rewrite to Canvas/WebGL for v1</li>
</ul>

<h2>9. Full source code — ActingSceneBackground.tsx</h2>
<p>Copy this entire file to the target project. A standalone copy also lives at <code>docs/ActingSceneBackground.tsx</code>.</p>
<pre>${esc(src)}</pre>

<h2>10. Quick copy commands</h2>
<pre>${esc(`# PowerShell
Copy-Item docs\\ActingSceneBackground.tsx C:\\path\\to\\other-site\\app\\components\\ActingSceneBackground.tsx

cd C:\\path\\to\\other-site
npm install framer-motion`)}</pre>

<h2>11. Rollback</h2>
<ol>
<li>Comment out <code>&lt;ActingSceneBackground /&gt;</code></li>
<li>Re-enable the previous background</li>
<li>Keep the new file until you decide permanently</li>
</ol>

<h2>12. Source of truth</h2>
<ul>
<li>NexusQ branch: <code>cinematic-background-test</code></li>
<li>Component: <code>app/components/ActingSceneBackground.tsx</code></li>
<li>Guide + copy: <code>docs/</code></li>
<li>Do not merge to NexusQ <code>main</code> until approved</li>
</ul>
<p><em>Generated for porting the NexusQ acting-scene background test to another website.</em></p>
</body>
</html>`;

fs.writeFileSync(
  path.join(__dirname, "acting-scene-implementation-guide.html"),
  html,
  "utf8"
);
console.log("HTML written");
