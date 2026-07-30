import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | NexusQ Global",
  description: "Placeholder terms of use for NexusQ Global.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-nq-bg text-nq-text">
      <div className="nq-container px-6 py-16 max-w-3xl">
        <Link href="/" className="text-sm text-nq-muted hover:text-nq-text">
          ← NexusQ Global
        </Link>
        <h1 className="nq-heading mt-6">Terms of Use</h1>
        <p className="mt-3 text-sm text-nq-muted">
          Placeholder — not legal advice. Final legal text has not been formally reviewed.
        </p>

        <div className="mt-10 space-y-6 text-nq-muted leading-relaxed text-[0.95rem]">
          <p>
            By using this website, you agree to these placeholder terms. The site
            provides information about NexusQ Global and its products.
          </p>
          <h2 className="text-nq-text text-xl font-semibold">Product status</h2>
          <p>
            AuditionQ is described as a live product. Other named platforms may be
            labelled vision or exploration and are not offered as available
            services unless explicitly stated.
          </p>
          <h2 className="text-nq-text text-xl font-semibold">No warranties</h2>
          <p>
            Content on this site is provided for general information. We do not
            guarantee completeness or uninterrupted availability.
          </p>
          <h2 className="text-nq-text text-xl font-semibold">Contact</h2>
          <p>
            <a href="mailto:admin@auditionq.com" className="text-nq-accent">
              admin@auditionq.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
