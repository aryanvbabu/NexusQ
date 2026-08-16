"use client";

import type { ReactNode } from "react";

/**
 * TEST ONLY — full-bleed photoreal scene behind one homepage section.
 * Does not modify AuroraBackground.tsx.
 */

type Pan = "left" | "right";

type CastingSceneBandProps = {
  image: string;
  pan?: Pan;
  children: ReactNode;
};

const FRAMES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

function FilmStripSvg() {
  return (
    <svg
      viewBox="0 0 960 80"
      preserveAspectRatio="none"
      className="h-full w-1/2 shrink-0"
      aria-hidden
    >
      <rect width="960" height="80" fill="#161310" />
      <rect y="18" width="960" height="44" fill="#241c16" />
      {FRAMES.map((i) => {
        const x = i * 80;
        return (
          <g key={i}>
            <rect x={x + 10} y="5" width="12" height="9" rx="1.5" fill="#cfc3ae" />
            <rect x={x + 38} y="5" width="12" height="9" rx="1.5" fill="#cfc3ae" />
            <rect x={x + 58} y="5" width="12" height="9" rx="1.5" fill="#cfc3ae" />
            <rect x={x + 10} y="66" width="12" height="9" rx="1.5" fill="#cfc3ae" />
            <rect x={x + 38} y="66" width="12" height="9" rx="1.5" fill="#cfc3ae" />
            <rect x={x + 58} y="66" width="12" height="9" rx="1.5" fill="#cfc3ae" />
            <rect
              x={x + 8}
              y="22"
              width="64"
              height="36"
              rx="2"
              fill="#0c0a08"
              stroke="#3a322a"
              strokeWidth="1"
            />
            <rect
              x={x + 12}
              y="26"
              width="56"
              height="28"
              rx="1"
              fill="rgba(56,189,248,0.08)"
            />
          </g>
        );
      })}
    </svg>
  );
}

const REEL_SPOKES = [
  [80, 44],
  [62, 75],
  [26, 75],
  [8, 44],
  [26, 13],
  [62, 13],
] as const;

function FilmReel({
  className,
  stroke,
}: {
  className: string;
  stroke: string;
}) {
  return (
    <svg className={className} viewBox="0 0 88 88" fill="none" aria-hidden>
      <circle cx="44" cy="44" r="40" stroke={stroke} strokeWidth="2.5" />
      <circle cx="44" cy="44" r="16" stroke={stroke} strokeWidth="2" />
      <circle cx="44" cy="44" r="5" fill={stroke} />
      {REEL_SPOKES.map(([x, y]) => (
        <line
          key={`${x}-${y}`}
          x1="44"
          y1="44"
          x2={x}
          y2={y}
          stroke={stroke}
          strokeWidth="1.75"
        />
      ))}
    </svg>
  );
}

export default function CastingSceneBand({
  image,
  pan = "left",
  children,
}: CastingSceneBandProps) {
  const plateClass =
    pan === "left"
      ? "nq-walk-plate nq-walk-plate-left"
      : "nq-walk-plate nq-walk-plate-right";

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className={plateClass} style={{ backgroundImage: `url(${image})` }} />

        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(248,250,252,0.72) 0%, rgba(248,250,252,0.42) 45%, rgba(248,250,252,0.55) 100%)",
          }}
        />
        <div
          className="hidden dark:block absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,7,11,0.62) 0%, rgba(5,7,11,0.32) 45%, rgba(5,7,11,0.5) 100%)",
          }}
        />

        <div className="nq-film-strip nq-film-strip-top">
          <FilmStripSvg />
          <FilmStripSvg />
        </div>
        <div className="nq-film-strip nq-film-strip-bottom">
          <FilmStripSvg />
          <FilmStripSvg />
        </div>

        <FilmReel className="nq-film-reel nq-film-reel-tl" stroke="#9fdff5" />
        <FilmReel className="nq-film-reel nq-film-reel-br" stroke="#e8c98a" />
      </div>

      <div className="relative z-20">{children}</div>
    </div>
  );
}
