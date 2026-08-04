import type { TutorialConfig } from "./types";

export const homepageTutorial: TutorialConfig = {
  id: "homepage",
  completionKey: "homepage_completed",
  routeMatch: (pathname, hash) => {
    if (pathname !== "/") return false;
    const h = hash.replace(/^#/, "");
    return !h || h === "home" || h === "about" || h === "platforms" || h === "future" || h === "trust" || h === "contact";
  },
  steps: [
    {
      id: "brand",
      selector: '[data-tour="nav-brand"]',
      title: "Welcome to NexusQ Global",
      body: "This is the parent company behind AuditionQ and a growing product ecosystem. Start here anytime.",
      placement: "bottom",
    },
    {
      id: "platforms",
      selector: '[data-tour="section-platforms"]',
      title: "The ecosystem",
      body: "Browse live and vision platforms. Only AuditionQ is live today — everything else is labeled honestly.",
      placement: "top",
    },
    {
      id: "auditionq-teaser",
      selector: '[data-tour="section-auditionq"]',
      title: "Flagship: AuditionQ",
      body: "Our live product for performers and casting. You’ll get a short focused tour when you visit this section.",
      placement: "top",
    },
    {
      id: "partner",
      selector: '[data-tour="section-partner"]',
      title: "Partner with us",
      body: "Studios, schools, and collaborators can reach the team through the partner form.",
      placement: "top",
    },
  ],
};
