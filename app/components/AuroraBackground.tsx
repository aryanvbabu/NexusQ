"use client";

/**
 * Lightweight aurora — CSS only (no Framer Motion).
 * Heavy blur + continuous JS transforms were lagging mobile and hurting paint.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="nq-aurora-ribbon nq-aurora-a" />
      <div className="nq-aurora-ribbon nq-aurora-b" />
      <div className="nq-aurora-ribbon nq-aurora-c" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(5,7,11,0.12) 70%, var(--background) 100%)",
        }}
      />

      <div className="nq-aurora-stars absolute inset-0 opacity-70" />
    </div>
  );
}
