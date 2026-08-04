"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, Menu, Settings, X } from "lucide-react";

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-nq-border bg-nq-bg/80 backdrop-blur-md">
      <div className="nq-container flex items-center justify-between px-6 py-3">
        <Link
          href="/"
          data-tour="nav-brand"
          className="block overflow-hidden rounded-xl ring-1 ring-white/10 shrink-0"
          aria-label="NexusQ Global home"
        >
          <Image
            src="/logo.png"
            alt="NexusQ Global"
            width={72}
            height={72}
            className="h-[64px] w-[64px] object-cover"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-7 text-sm text-nq-muted">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-nq-text transition-colors focus-visible:outline-none"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/partner" className="nq-btn nq-btn-primary !py-2 !px-3.5 !text-sm">
            Partner With Us
          </Link>
          <Link
            href="/settings"
            className="nq-btn nq-btn-secondary !py-2 !px-3 !text-sm"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" aria-hidden />
          </Link>
          {session ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                className="nq-btn nq-btn-secondary !py-2 !px-3.5 !text-sm inline-flex items-center gap-1.5"
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
            <Link href="/login" className="nq-btn nq-btn-secondary !py-2 !px-3.5 !text-sm">
              Sign In
            </Link>
          )}
        </div>

        <button
          type="button"
          className="md:hidden nq-btn nq-btn-secondary !p-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-nq-border bg-nq-bg/95 px-6 py-4"
        >
          <ul className="flex flex-col gap-4 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-nq-muted hover:text-nq-text"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              href="/partner"
              className="nq-btn nq-btn-primary w-full"
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
      )}
    </nav>
  );
}
