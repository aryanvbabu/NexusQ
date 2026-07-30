"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="block overflow-hidden rounded-xl shrink-0 ring-1 ring-white/10"
        >
          <Image
            src="/logo.png"
            alt="NexusQ Logo"
            width={72}
            height={72}
            className="h-[72px] w-[72px] object-cover"
            priority
          />
        </Link>

        <ul className="flex gap-7 text-sm text-zinc-300">
          <li><a href="#home" className="hover:text-white transition">Home</a></li>
          <li><a href="#platforms" className="hover:text-white transition">Platforms</a></li>
          <li><a href="#about" className="hover:text-white transition">About</a></li>
          <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
        </ul>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="text-zinc-400 text-sm">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-zinc-800 text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-white text-black px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
