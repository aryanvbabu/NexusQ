"use client";

import Link from "next/link";
import AuroraBackground from "./AuroraBackground";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[115svh] flex items-center overflow-visible px-6 pt-28 pb-56 text-foreground transition-colors duration-300"
      style={{
        background:
          "linear-gradient(180deg, var(--background) 0%, color-mix(in srgb, var(--background) 88%, transparent) 100%)",
      }}
    >
      <div className="absolute inset-0 z-0">
        <AuroraBackground />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 20%, rgba(56,189,248,0.14), transparent 75%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.35] max-md:opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative z-20 nq-container text-center pt-10">
        <p className="nq-eyebrow mb-6">NexusQ Global</p>

        <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
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

        <p className="mt-7 mx-auto max-w-2xl text-lg md:text-xl text-nq-muted leading-relaxed">
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
            className="nq-btn nq-btn-secondary border border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-500"
          >
            Explore Platforms
          </Link>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
        }}
      />

      <div className="absolute -bottom-14 left-1/2 z-30 hidden -translate-x-1/2 lg:block">
        <div className="flex items-center gap-10 rounded-2xl border border-white/10 bg-black/80 px-10 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan-400">1</p>
            <p className="mt-1 text-sm text-white/70">Live Product</p>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan-400">5</p>
            <p className="mt-1 text-sm text-white/70">Vision Products</p>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan-400">∞</p>
            <p className="mt-1 text-sm text-white/70">Future Possibilities</p>
          </div>
        </div>
      </div>
    </section>
  );
}
