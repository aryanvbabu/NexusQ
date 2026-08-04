"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useOnboarding } from "@/app/components/onboarding/useOnboarding";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { resetAll, completion } = useOnboarding();
  const [restarted, setRestarted] = useState(false);

  return (
    <main className="min-h-screen bg-nq-bg text-nq-text">
      <Navbar />
      <div className="nq-container px-6 pt-32 pb-20 max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-nq-muted hover:text-nq-text"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back home
        </Link>

        <h1 className="nq-heading mt-6 text-3xl md:text-4xl">Settings</h1>
        {status === "authenticated" ? (
          <p className="mt-3 text-nq-muted">
            Signed in as{" "}
            <span className="text-nq-text">
              {session?.user?.email ?? session?.user?.name}
            </span>
          </p>
        ) : (
          <p className="mt-3 text-nq-muted">
            <Link href="/login" className="text-nq-accent underline-offset-2 hover:underline">
              Sign in
            </Link>{" "}
            to personalize your account. Tutorial progress works for everyone.
          </p>
        )}

        <section className="mt-10 rounded-2xl border border-nq-border bg-nq-surface p-6 md:p-8">
          <h2 className="text-lg font-semibold tracking-tight">Onboarding</h2>
          <p className="mt-2 text-sm text-nq-muted leading-relaxed">
            Replay guided tours for NexusQ sections. Completed tours stay hidden until you
            restart them here.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-nq-muted" aria-label="Tutorial progress">
            <li>
              Homepage:{" "}
              <span className="text-nq-text">
                {completion.homepage_completed ? "Completed" : "Not completed"}
              </span>
            </li>
            <li>
              AuditionQ:{" "}
              <span className="text-nq-text">
                {completion.auditionq_completed ? "Completed" : "Not completed"}
              </span>
            </li>
            <li>
              Dashboard:{" "}
              <span className="text-nq-text">
                {completion.dashboard_completed ? "Completed" : "Not available yet"}
              </span>
            </li>
            <li>
              Profile:{" "}
              <span className="text-nq-text">
                {completion.profile_completed ? "Completed" : "Not available yet"}
              </span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => {
              resetAll();
              if (typeof window !== "undefined") {
                window.sessionStorage.setItem("nq_guide_me", "homepage");
              }
              setRestarted(true);
              router.push("/");
            }}
            className="nq-btn nq-btn-primary mt-7 inline-flex items-center gap-2"
            aria-label="Restart all tutorials"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Restart Tutorial
          </button>
          {restarted ? (
            <p className="mt-3 text-sm text-nq-accent" role="status">
              Progress cleared — starting homepage tour…
            </p>
          ) : null}
        </section>
      </div>
      <Footer />
    </main>
  );
}
