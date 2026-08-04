export type TutorialPlacement = "top" | "bottom" | "left" | "right" | "auto";

export type TutorialStep = {
  id: string;
  selector: string;
  title: string;
  body: string;
  placement?: TutorialPlacement;
};

export type TutorialId = "homepage" | "auditionq" | "dashboard" | "profile";

export type TutorialConfig = {
  id: TutorialId;
  completionKey:
    | "homepage_completed"
    | "auditionq_completed"
    | "dashboard_completed"
    | "profile_completed";
  /** Pathname or pathname+hash patterns that can auto-start this tour */
  routeMatch: (pathname: string, hash: string) => boolean;
  steps: TutorialStep[];
};

export type CompletionState = Record<TutorialConfig["completionKey"], boolean>;

export const COMPLETION_KEYS: TutorialConfig["completionKey"][] = [
  "homepage_completed",
  "auditionq_completed",
  "dashboard_completed",
  "profile_completed",
];

export const EMPTY_COMPLETION: CompletionState = {
  homepage_completed: false,
  auditionq_completed: false,
  dashboard_completed: false,
  profile_completed: false,
};
