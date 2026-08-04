import { homepageTutorial } from "./homepage";
import { auditionqTutorial } from "./auditionq";
import { dashboardTutorial } from "./dashboard";
import { profileTutorial } from "./profile";
import type { TutorialConfig, TutorialId } from "./types";

/** Engine reads all section tutorials from this registry. */
export const tutorials: TutorialConfig[] = [
  homepageTutorial,
  auditionqTutorial,
  dashboardTutorial,
  profileTutorial,
];

export function getTutorial(id: TutorialId): TutorialConfig | undefined {
  return tutorials.find((t) => t.id === id);
}

export function findMatchingTutorials(
  pathname: string,
  hash: string
): TutorialConfig[] {
  return tutorials.filter((t) => t.routeMatch(pathname, hash));
}
