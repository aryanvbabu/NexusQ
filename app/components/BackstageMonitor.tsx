"use client";

import { useReducedMotion } from "framer-motion";

/**
 * TEST ONLY — small backstage monitor with a looping audition feed.
 * Uses existing scene stills as a GIF/video-style crossfade. No new libraries.
 */
export default function BackstageMonitor() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <aside aria-hidden className="nq-backstage">
      <div className="nq-backstage-bezel">
        <div className="nq-backstage-bar">
          <span className="nq-backstage-rec" />
          <span>BACKSTAGE</span>
          <span className="nq-backstage-live">LIVE</span>
        </div>
        <div className="nq-backstage-screen">
          <img
            src="/scenes/walk-audition.webp"
            alt=""
            decoding="async"
            loading="lazy"
            draggable={false}
            className={prefersReducedMotion ? undefined : "nq-backstage-a"}
          />
          <img
            src="/scenes/casting-audition.webp"
            alt=""
            decoding="async"
            loading="lazy"
            draggable={false}
            className={prefersReducedMotion ? undefined : "nq-backstage-b"}
          />
          <div className="nq-backstage-scan" />
        </div>
        <div className="nq-backstage-caption">Audition in session</div>
      </div>
    </aside>
  );
}
