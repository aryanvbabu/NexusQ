"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, Menu, X } from "lucide-react";
import GuideMeButton from "@/app/components/onboarding/GuideMeButton";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#home", id: "home", label: "Home" },
  { href: "/#platforms", id: "platforms", label: "Platforms" },
  { href: "/#auditionq", id: "auditionq", label: "AuditionQ" },
  { href: "/#future", id: "future", label: "Future" },
  { href: "/partner", id: "partner", label: "Partner" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
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

  useEffect(() => {
    if (pathname === "/partner") {
      setActiveId("partner");
      return;
    }
    if (pathname !== "/") return;

    const sectionIds = ["home", "platforms", "auditionq", "future"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        }
        let bestId = "home";
        let bestRatio = 0;
        for (const id of sectionIds) {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        if (bestRatio > 0) setActiveId(bestId);
        else if (window.scrollY < 120) setActiveId("home");
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const authButton = session ? (
    <div className="relative" ref={userMenuRef}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white hover:bg-white/10"
        aria-expanded={userMenuOpen}
        aria-haspopup="menu"
        onClick={() => setUserMenuOpen((v) => !v)}
      >
        <span className="max-w-[8rem] truncate">{session.user?.name}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </button>
      {userMenuOpen ? (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-40 rounded-xl border border-nq-border bg-nq-surface-elevated py-1.5 shadow-xl"
        >
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
  );

  return (
    <header
      data-testid="site-navbar"
      className="fixed inset-x-0 top-0 z-[9999] px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className="mx-auto w-full max-w-7xl rounded-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
        style={{
          backgroundColor: scrolled
            ? "rgba(8, 12, 20, 0.98)"
            : "rgba(10, 14, 22, 0.94)",
        }}
      >
        {/* Mobile */}
        <div className="flex items-center gap-2 px-2.5 py-2 md:hidden">
          <Link
            href="/"
            data-tour="nav-brand"
            className="block shrink-0 overflow-hidden rounded-lg ring-1 ring-white/15"
            aria-label="NexusQ Global home"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="NexusQ Global"
              width={56}
              height={56}
              className="h-9 w-9 object-cover"
              priority
            />
          </Link>

          <ul className="flex min-w-0 flex-1 items-center justify-center gap-1.5 sm:gap-2.5">
            {links.map((link) => {
              const active = activeId === link.id;
              return (
                <li key={link.href} className="shrink-0">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "rounded-md bg-cyan-400/15 px-1.5 py-1 text-[10px] font-medium text-cyan-300 ring-1 ring-cyan-400/30 sm:text-[11px]"
                        : "rounded-md px-1.5 py-1 text-[10px] font-medium text-white/80 sm:text-[11px] hover:text-cyan-300"
                    }
                    onClick={() => {
                      setActiveId(link.id);
                      setOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {!session ? (
            <Link
              href="/login"
              className="hidden shrink-0 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 text-[10px] font-semibold text-white sm:inline-flex"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
          ) : null}

          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="border-t border-white/10 px-3 py-3 md:hidden"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-white/50">Theme</span>
                <ThemeToggle />
              </div>
              <GuideMeButton />
              <Link
                href="/partner"
                className="inline-flex items-center justify-center rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900"
                style={{ backgroundColor: "#22D3EE" }}
                onClick={() => setOpen(false)}
              >
                Partner With Us
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
                  className="nq-btn nq-btn-secondary w-full sm:hidden"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        ) : null}

        {/* Desktop */}
        <div className="hidden items-center gap-5 px-5 py-3 md:flex">
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
              className="h-14 w-14 object-cover"
              priority
            />
          </Link>

          <ul className="flex items-center gap-6 text-sm lg:gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={activeId === link.id ? "page" : undefined}
                  className={
                    activeId === link.id
                      ? "relative text-cyan-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-cyan-400"
                      : "text-white/80 transition-colors hover:text-cyan-300"
                  }
                  onClick={() => setActiveId(link.id)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-3">
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
            {authButton}
          </div>
        </div>
      </nav>
    </header>
  );
}
