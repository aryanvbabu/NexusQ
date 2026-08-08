"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, Menu, Settings, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      data-testid="site-navbar"
      className="fixed inset-x-0 top-0 z-[9999] px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className="mx-auto w-full max-w-7xl rounded-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
        style={{
          backgroundColor: scrolled
            ? "rgba(8, 12, 20, 0.98)"
            : "rgba(10, 14, 22, 0.96)",
        }}
      >
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-5 sm:py-3">
          <Link
            href="/"
            data-tour="nav-brand"
            className="relative z-[1] block shrink-0 overflow-hidden rounded-xl ring-1 ring-white/20"
            aria-label="NexusQ Global home"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="NexusQ Global"
              width={72}
              height={72}
              className="h-11 w-11 object-cover sm:h-14 sm:w-14"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-7 text-sm md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/80 transition-colors hover:text-cyan-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <GuideMeButton />
            <Link
              href="/partner"
              className="nq-btn nq-btn-primary !px-3.5 !py-2 !text-sm border border-[#22D3EE] text-white"
              style={{
                backgroundColor: "#22D3EE",
                boxShadow: "0 0 18px rgba(34,211,238,0.28)",
              }}
            >
              Partner With Us
            </Link>
            <Link
              href="/settings"
              className="nq-btn nq-btn-secondary !px-3 !py-2 !text-sm"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" aria-hidden />
            </Link>
            {session ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="nq-btn nq-btn-secondary !px-3.5 !py-2 !text-sm inline-flex items-center gap-1.5"
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
                className="nq-btn nq-btn-secondary !px-3.5 !py-2 !text-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="relative z-[1] flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="border-t border-white/10 px-4 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-1 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2.5 text-white/85 hover:bg-white/5 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <GuideMeButton />
              <Link
                href="/partner"
                className="nq-btn nq-btn-primary w-full text-white"
                style={{ backgroundColor: "#22D3EE" }}
                onClick={() => setOpen(false)}
              >
                Partner With Us
              </Link>
              <Link
                href="/settings"
                className="nq-btn nq-btn-secondary w-full"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>
              {session ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="nq-btn nq-btn-secondary w-full"
                >
                  Sign Out ({session.user?.name})
                </button>
              ) : (
                <Link
                  href="/login"
                  className="nq-btn nq-btn-secondary w-full"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
