import type { TutorialConfig } from "./types";

/** Config only — auto-starts when a /dashboard route exists later. */
export const dashboardTutorial: TutorialConfig = {
  id: "dashboard",
  completionKey: "dashboard_completed",
  routeMatch: (pathname) => pathname.startsWith("/dashboard"),
  steps: [
    {
      id: "dashboard-intro",
      selector: '[data-tour="dashboard-root"]',
      title: "Your dashboard",
      body: "Product dashboards will live here when NexusQ launches signed-in product surfaces.",
      placement: "bottom",
    },
  ],
};
