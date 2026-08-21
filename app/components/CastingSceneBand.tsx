"use client";

import type { ReactNode } from "react";

/**
 * Full-bleed photoreal scene behind one homepage section.
 */

type Pan = "left" | "right";

type CastingSceneBandProps = {
  image: string;
  pan?: Pan;
  children: ReactNode;
  /** Eager-load this plate (hero only). Other bands stay lazy. */
  priority?: boolean;
};

export default function CastingSceneBand({
  image,
  pan = "left",
  children,
  priority = false,
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
        <div className={plateClass}>
          {/* Native img so Chrome can lazy-load + fetchpriority. CSS backgrounds cannot. */}
          <img
            src={image}
            alt=""
            decoding="async"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
          />
        </div>

        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(248,250,252,0.90) 0%, rgba(248,250,252,0.84) 45%, rgba(248,250,252,0.88) 100%)",
          }}
        />
        <div
          className="hidden dark:block absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,7,11,0.62) 0%, rgba(5,7,11,0.32) 45%, rgba(5,7,11,0.5) 100%)",
          }}
        />
      </div>

      <div className="relative z-20">{children}</div>
    </div>
  );
}
