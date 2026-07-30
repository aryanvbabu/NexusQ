import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | NexusQ Global",
  description: "Placeholder privacy policy for NexusQ Global.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-nq-bg text-nq-text">
      <div className="nq-container px-6 py-16 max-w-3xl">
        <Link href="/" className="text-sm text-nq-muted hover:text-nq-text">
          ← NexusQ Global
        </Link>
        <h1 className="nq-heading mt-6">Privacy Policy</h1>
        <p className="mt-3 text-sm text-nq-muted">
          Placeholder — not legal advice. Final legal text has not been formally reviewed.
        </p>

        <div className="mt-10 space-y-6 text-nq-muted leading-relaxed text-[0.95rem]">
          <p>
            NexusQ Global (“we”, “us”) operates this website to share information
            about our products and receive partnership inquiries.
          </p>
          <h2 className="text-nq-text text-xl font-semibold">Information we collect</h2>
          <p>
            If you submit the partner form, we collect the name, email, company,
            interest category, and message you provide. If you create an account
            via Sign In, we store your name, email, and hashed password.
          </p>
          <h2 className="text-nq-text text-xl font-semibold">How we use information</h2>
          <p>
            Partner inquiries are used to respond to your request and route
            messages to our contact address. Account data is used to authenticate
            you on this site.
          </p>
          <h2 className="text-nq-text text-xl font-semibold">Contact</h2>
          <p>
            Questions about privacy:{" "}
            <a href="mailto:admin@auditionq.com" className="text-nq-accent">
              admin@auditionq.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
