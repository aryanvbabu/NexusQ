"use client";

export default function Future() {
  return (
    <section id="future" className="nq-section relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(34,211,238,0.10), transparent 65%)",
        }}
      />
      <div className="nq-container">
        <p className="nq-eyebrow">Future</p>

        <h2 className="nq-heading mt-4 max-w-4xl">
          Exploring the next generation of
          <span className="block text-nq-accent">
            AI-powered digital experiences
          </span>
        </h2>
        <p className="nq-lede mt-6 max-w-2xl">
          NexusQ Global continues exploring new digital products, AI
          experiences, and partnerships. Every future product will be introduced
          only when it is ready.
        </p>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="group rounded-3xl border border-nq-border bg-nq-surface/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]">
            <div className="mb-5 text-5xl" aria-hidden>
              🤖
            </div>
            <h3 className="text-xl font-semibold text-nq-text">AI Agents</h3>
            <p className="mt-4 text-nq-muted leading-relaxed">
              Building intelligent assistants that automate workflows, improve
              productivity, and power future NexusQ products.
            </p>
          </div>

          <div className="group rounded-3xl border border-nq-border bg-nq-surface/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]">
            <div className="mb-5 text-5xl" aria-hidden>
              🌍
            </div>
            <h3 className="text-xl font-semibold text-nq-text">
              Global Expansion
            </h3>
            <p className="mt-4 text-nq-muted leading-relaxed">
              Growing the NexusQ ecosystem through partnerships, international
              reach, and scalable digital platforms.
            </p>
          </div>

          <div className="group rounded-3xl border border-nq-border bg-nq-surface/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]">
            <div className="mb-5 text-5xl" aria-hidden>
              🚀
            </div>
            <h3 className="text-xl font-semibold text-nq-text">
              Future Platforms
            </h3>
            <p className="mt-4 text-nq-muted leading-relaxed">
              New ideas become products only after careful validation, ensuring
              every launch meets the quality expected from NexusQ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
