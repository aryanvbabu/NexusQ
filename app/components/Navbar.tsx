"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, Settings } from "lucide-react";
import GuideMeButton from "@/app/components/onboarding/GuideMeButton";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#platforms", label: "Platforms" },
  { href: "/#auditionq", label: "AuditionQ" },
  { href: "/#future", label: "Future" },
  { href: "/partner", label: "Partner" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!userMenuRef.current?.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [userMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className="fixed inset-x-0 top-0 z-[9999] px-2 pt-3 sm:px-4 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
        style={{
          backgroundColor: scrolled
            ? "rgba(8, 12, 20, 0.98)"
            : "rgba(10, 14, 22, 0.94)",
        }}
      >
        {/* Same layout as desktop screenshot on every screen size */}
        <div className="flex items-center gap-3 overflow-x-auto px-3 py-2.5 sm:gap-4 sm:px-5 sm:py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/"
            data-tour="nav-brand"
            className="block shrink-0 overflow-hidden rounded-xl ring-1 ring-white/15"
            aria-label="NexusQ Global home"
          >
            <Image
              src="/logo.png"
              alt="NexusQ Global"
              width={72}
              height={72}
              className="h-12 w-12 object-cover sm:h-14 sm:w-14"
              priority
            />
          </Link>

          <ul className="flex shrink-0 items-center gap-4 text-sm sm:gap-6 md:gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap text-white/80 transition-colors hover:text-cyan-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <GuideMeButton />
            <Link
              href="/partner"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-[#22D3EE] px-3.5 py-2 text-sm font-semibold text-slate-900 transition hover:brightness-110"
              style={{
                backgroundColor: "#22D3EE",
                boxShadow: "0 0 18px rgba(34,211,238,0.28)",
              }}
            >
              Partner With Us
            </Link>
            <Link
              href="/settings"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" aria-hidden />
            </Link>
            {session ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white hover:bg-white/10"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                  onClick={() => setUserMenuOpen((v) => !v)}
                >
                  <span className="max-w-[8rem] truncate">
                    {session.user?.name}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
                </button>
                {userMenuOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-44 rounded-xl border border-nq-border bg-nq-surface-elevated py-1.5 shadow-xl"
                  >
                    <Link
                      role="menuitem"
                      href="/settings"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-nq-muted hover:bg-nq-accent-soft hover:text-nq-text"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Account settings
                    </Link>
                    <button
                      role="menuitem"
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-nq-muted hover:bg-nq-accent-soft hover:text-nq-text"
                      onClick={() => {
                        setUserMenuOpen(false);
                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
