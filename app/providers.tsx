"use client";

import { SessionProvider } from "next-auth/react";
import { OnboardingProvider } from "@/app/components/onboarding/OnboardingProvider";
import ThemeProvider from "./components/ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
    <SessionProvider>
      <OnboardingProvider>
        {children}
      </OnboardingProvider>
    </SessionProvider>
    </ThemeProvider>
  );
}
