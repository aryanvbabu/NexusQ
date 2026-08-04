import type { TutorialConfig } from "./types";

/** Config only — auto-starts when a /profile route exists later. */
export const profileTutorial: TutorialConfig = {
  id: "profile",
  completionKey: "profile_completed",
  routeMatch: (pathname) => pathname.startsWith("/profile"),
  steps: [
    {
      id: "profile-intro",
      selector: '[data-tour="profile-root"]',
      title: "Your profile",
      body: "Account and preference settings will be guided here in future product surfaces.",
      placement: "bottom",
    },
  ],
};
