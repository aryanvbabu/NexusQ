"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
  
    handleScroll(); // Set initial state
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
  animate={{
    scale: scrolled ? 0.98 : 1,
    y: scrolled ? -3 : 0,
    opacity: 1,
  }}
  transition={{
    duration: 0.45,
    ease: "easeOut",
  }}
  className="fixed top-4 left-1/2 z-50 w-[96%] max-w-7xl -translate-x-1/2 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500"
>
  <div
  aria-hidden
  className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
  style={{
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), transparent 40%)",
  }}
/>
     <div className="flex items-center justify-between px-7 py-3">
        <Link
          href="/"
          data-tour="nav-brand"
          className="block overflow-hidden rounded-xl ring-1 ring-white/10 shrink-0"
          aria-label="NexusQ Global home"
        >
         <motion.div
  animate={{
    y: [0, -4, 0],
    rotate: [0, 2, 0, -2, 0],
    scale: [1, 1.03, 1],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{
    scale: 1.12,
    rotate: 8,
  }}
>
  <Image
    src="/logo.png"
    alt="NexusQ Global"
    width={72}
    height={72}
    className="h-[64px] w-[64px] object-cover"
    priority
  />
</motion.div>
        </Link>

        <ul className="hidden md:flex items-center gap-7 text-sm text-nq-muted">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
               className="relative text-white/70 hover:text-cyan-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <GuideMeButton />
         <Link
  href="/partner"
  className="nq-btn nq-btn-primary !py-2 !px-3.5 !text-sm text-white border border-[#22D3EE] transition-all duration-300 hover:brightness-110"
  style={{
    backgroundColor: "#22D3EE",
    boxShadow: "0 0 18px rgba(34,211,238,0.28)",
  }}
>
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

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="nq-btn nq-btn-secondary !p-2"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
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
           
  <GuideMeButton />
</div>
            <Link
              href="/partner"
              className="nq-btn nq-btn-primary w-full shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:shadow-[0_0_55px_rgba(34,211,238,0.55)] transition-all duration-500"
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
      )}
    </motion.nav>
  );
  }
