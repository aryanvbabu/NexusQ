"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        enableColorScheme={false}
      >
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
}
