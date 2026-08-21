"use client";

import Link from "next/link";
import CastingMonitor from "./CastingMonitor";
import HeroSlideCards from "./HeroSlideCards";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-stretch overflow-visible px-5 pt-24 pb-16 text-foreground transition-colors duration-300 sm:px-6 md:min-h-[115svh] md:pt-28 md:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 20%, rgba(56,189,248,0.12), transparent 75%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.28] max-md:opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative z-20 nq-container pt-2 md:pt-4">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-start lg:gap-x-10 xl:gap-x-14">
          <div className="text-center lg:pr-2">
            <p className="nq-eyebrow mb-6">NexusQ Global</p>

            <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:max-w-3xl xl:max-w-4xl font-bold tracking-tight leading-[1.05]">
              Building a serious digital{" "}
              <span
                className="text-nq-accent"
                style={{
                  textShadow:
                    "0 0 6px rgba(34,211,238,0.30), 0 0 14px rgba(34,211,238,0.18)",
                }}
              >
                product ecosystem
              </span>
            </h1>

            <p className="mt-7 mx-auto max-w-2xl text-lg md:text-xl text-nq-muted leading-relaxed lg:max-w-xl xl:max-w-2xl">
              NexusQ Global designs and ships digital platforms — starting with
              AuditionQ, our live flagship product — while carefully exploring what
              comes next.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                id="hero-partner-btn"
                href="/partner"
                className="inline-flex items-center justify-center rounded-xl bg-[#22D3EE] px-6 py-3 text-base font-semibold text-slate-900 transition-all duration-300 hover:bg-[#18C5DF] hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] active:scale-95"
              >
                Partner With Us
              </Link>

              <Link
                id="hero-explore-btn"
                href="#platforms"
                className="nq-btn nq-btn-secondary hover:border-cyan-400/40 transition-all duration-500"
              >
                Explore Platforms
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end lg:items-start lg:mt-10 xl:mt-12">
            <CastingMonitor />
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-8 flex justify-center lg:hidden">
        <CastingMonitor />
      </div>

      {/* Insight strip — spacing replaces former film-tape lanes */}
      <div className="relative z-20 nq-container mt-10 md:mt-14 lg:mt-16">
        <HeroSlideCards />
      </div>

      <div className="relative z-20 mx-auto mt-10 hidden w-full max-w-3xl lg:block">
        <div className="nq-card flex items-center justify-center gap-10 px-10 py-5">
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan-400">1</p>
            <p className="mt-1 text-sm text-nq-muted">Live Product</p>
          </div>
          <div className="h-10 w-px bg-nq-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan-400">5</p>
            <p className="mt-1 text-sm text-nq-muted">Vision Products</p>
          </div>
          <div className="h-10 w-px bg-nq-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan-400">∞</p>
            <p className="mt-1 text-sm text-nq-muted">Future Possibilities</p>
          </div>
        </div>
      </div>
    </section>
  );
}
