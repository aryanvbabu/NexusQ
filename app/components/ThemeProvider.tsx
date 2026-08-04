"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
<<<<<<< HEAD
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark" // Keeps your current dark theme as the default
      enableSystem={false}
      {...props}
=======

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
>>>>>>> main
    >
      {children}
    </NextThemesProvider>
  );
}