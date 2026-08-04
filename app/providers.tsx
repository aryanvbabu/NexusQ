"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { OnboardingProvider } from "@/app/components/onboarding/OnboardingProvider";
import ThemeProvider from "./components/ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< HEAD
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
=======
    <ThemeProvider>
    <SessionProvider>
      <OnboardingProvider>
        {children}
      </OnboardingProvider>
    </SessionProvider>
    </ThemeProvider>
>>>>>>> main
  );
}
