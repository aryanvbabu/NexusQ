"use client";

<<<<<<< HEAD
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client mount
=======
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

>>>>>>> main
  useEffect(() => {
    setMounted(true);
  }, []);

<<<<<<< HEAD
  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to preserve layout space
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="p-2 rounded-lg border border-nq-border bg-nq-surface text-nq-text hover:bg-nq-surface-elevated transition-colors flex items-center justify-center"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-amber-400" />
      ) : (
        <Moon className="h-5 w-5 text-sky-400" />
=======
  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      className="nq-btn nq-btn-secondary !py-2 !px-3"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
>>>>>>> main
      )}
    </button>
  );
}