"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { easeOut } from "@/lib/motion";

/**
 * TEST ONLY — full-width insight strip below hero copy and casting monitor.
 */

const CARDS = [
  {
    tag: "NexusQ Global",
    title: "An ecosystem company",
    body: "NexusQ Global is the parent company behind a growing set of focused digital products — built for the long term, not a single-app story.",
  },
  {
    tag: "AuditionQ",
    title: "Live flagship product",
    body: "AuditionQ is shipping today: a modern, AI-powered platform connecting talent with real opportunities at auditionq.com.",
    badge: "Live",
  },
  {
    tag: "Ecosystem",
    title: "Live, vision & exploration",
    body: "One product is live. Five more are vision. Everything else is labeled honestly until it ships — no hype, no fake launches.",
  },
  {
    tag: "Future",
    title: "What comes next",
    body: "NexusQ is carefully exploring new platforms and AI capabilities — product-first craft over noise, with room to grow.",
  },
  {
    tag: "Partnership",
    title: "Build with NexusQ",
    body: "We partner with teams who care about serious software. Reach out if you want to collaborate on what we ship next.",
  },
] as const;

const INTERVAL_MS = 3000;

export default function HeroSlideCards({ className }: { className?: string } = {}) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % CARDS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const card = CARDS[index];

  return (
    <div
      className={`nq-hero-slides w-full${className ? ` ${className}` : ""}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="nq-hero-slides-shell">
        <div className="nq-hero-slides-viewport">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={index}
              className="nq-hero-slide-card"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <div className="nq-hero-slide-meta">
                <p className="nq-hero-slide-tag">{card.tag}</p>
                {"badge" in card && card.badge ? (
                  <span className="nq-badge nq-badge-live">{card.badge}</span>
                ) : null}
              </div>

              <div className="nq-hero-slide-copy">
                <h3 className="nq-hero-slide-title">{card.title}</h3>
                <p className="nq-hero-slide-body">{card.body}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="nq-hero-slides-footer">
          <div className="nq-hero-slides-dots" aria-hidden>
            {CARDS.map((_, i) => (
              <span
                key={i}
                className={
                  i === index ? "nq-hero-slides-dot is-active" : "nq-hero-slides-dot"
                }
              />
            ))}
          </div>
          {!prefersReducedMotion && (
            <motion.div
              key={index}
              className="nq-hero-slides-progress"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
