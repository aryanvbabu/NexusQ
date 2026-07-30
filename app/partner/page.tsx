"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const interests = [
  "Partnership",
  "Client project",
  "Collaboration",
  "Investment / business",
  "Other",
];

type Status = "idle" | "loading" | "success" | "error";

export default function PartnerPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: "Partnership",
    message: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        company: "",
        interest: "Partnership",
        message: "",
      });
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-nq-bg text-nq-text">
      <header className="border-b border-nq-border">
        <div className="nq-container px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="overflow-hidden rounded-lg ring-1 ring-white/10">
              <Image
                src="/logo.png"
                alt="NexusQ Global"
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
              />
            </span>
            <span className="font-semibold tracking-tight">NexusQ Global</span>
          </Link>
          <Link href="/" className="text-sm text-nq-muted hover:text-nq-text">
            ← Back to home
          </Link>
        </div>
      </header>

      <div className="nq-container px-6 py-16 max-w-2xl">
        <p className="nq-eyebrow">Partner inquiry</p>
        <h1 className="nq-heading mt-4">Tell us how we can work together</h1>
        <p className="nq-lede">
          For partnerships, client projects, collaboration, or other business
          inquiries. Messages are routed to{" "}
          <a href="mailto:admin@auditionq.com" className="text-nq-accent underline-offset-2 hover:underline">
            admin@auditionq.com
          </a>
          .
        </p>

        {status === "success" ? (
          <div
            role="status"
            className="mt-10 nq-surface p-8 border-nq-live/30"
          >
            <h2 className="text-xl font-semibold text-nq-live">Inquiry received</h2>
            <p className="mt-3 text-nq-muted leading-relaxed">
              Thanks for reaching out. We will review your message and respond
              when we can.
            </p>
            <button
              type="button"
              className="nq-btn nq-btn-secondary mt-6"
              onClick={() => setStatus("idle")}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
            {(status === "error" || error) && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error || "Something went wrong."} You can retry or email{" "}
                <a href="mailto:admin@auditionq.com" className="underline">
                  admin@auditionq.com
                </a>
                .
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Name <span className="text-nq-muted">(required)</span>
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={onChange}
                className="w-full rounded-xl border border-nq-border bg-nq-surface px-4 py-2.5 text-nq-text placeholder:text-nq-muted/60 focus:border-nq-accent"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email <span className="text-nq-muted">(required)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={onChange}
                className="w-full rounded-xl border border-nq-border bg-nq-surface px-4 py-2.5 text-nq-text placeholder:text-nq-muted/60 focus:border-nq-accent"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1.5">
                Company
              </label>
              <input
                id="company"
                name="company"
                value={form.company}
                onChange={onChange}
                className="w-full rounded-xl border border-nq-border bg-nq-surface px-4 py-2.5 text-nq-text placeholder:text-nq-muted/60 focus:border-nq-accent"
                placeholder="Optional"
                autoComplete="organization"
              />
            </div>

            <div>
              <label htmlFor="interest" className="block text-sm font-medium mb-1.5">
                Interest
              </label>
              <select
                id="interest"
                name="interest"
                value={form.interest}
                onChange={onChange}
                className="w-full rounded-xl border border-nq-border bg-nq-surface px-4 py-2.5 text-nq-text focus:border-nq-accent"
              >
                {interests.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Message <span className="text-nq-muted">(required)</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={onChange}
                className="w-full rounded-xl border border-nq-border bg-nq-surface px-4 py-2.5 text-nq-text placeholder:text-nq-muted/60 focus:border-nq-accent resize-y min-h-[140px]"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="nq-btn nq-btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending…" : "Submit inquiry"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
