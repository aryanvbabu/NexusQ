"use client";

import { SessionProvider } from "next-auth/react";
import  ThemeProvider  from "./components/ThemeProvider";
import { OnboardingProvider } from "@/app/components/onboarding/OnboardingProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <OnboardingProvider>
          {children}
        </OnboardingProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}