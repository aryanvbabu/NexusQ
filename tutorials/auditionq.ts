import type { TutorialConfig } from "./types";

export const auditionqTutorial: TutorialConfig = {
  id: "auditionq",
  completionKey: "auditionq_completed",
  routeMatch: (pathname, hash) => {
    if (pathname !== "/") return false;
    return hash.replace(/^#/, "") === "auditionq";
  },
  steps: [
    {
      id: "live-badge",
      selector: '[data-tour="aq-live-badge"]',
      title: "AuditionQ is live",
      body: "This is the only product on NexusQ marked LIVE — a real product you can open today.",
      placement: "bottom",
    },
    {
      id: "proof",
      selector: '[data-tour="aq-proof"]',
      title: "Product proof",
      body: "Status and destination are shown clearly so visitors know AuditionQ is shipping, not a concept.",
      placement: "left",
    },
    {
      id: "cta",
      selector: '[data-tour="aq-cta"]',
      title: "Open AuditionQ",
      body: "This button takes you to auditionq.com — the live product experience outside this site.",
      placement: "top",
    },
  ],
};
