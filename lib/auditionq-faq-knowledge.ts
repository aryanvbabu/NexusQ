import { FAQ_ITEMS, type FaqItem } from "@/faq";

export type FaqHelpLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FaqKnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  facts: { text: string; intents?: string[] }[];
  link?: FaqHelpLink;
  suggestions: string[];
};

const AUDITIONQ = {
  label: "Open AuditionQ",
  href: "https://www.auditionq.com/",
  external: true,
} as const;

const STOP = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "do",
  "does",
  "for",
  "from",
  "how",
  "i",
  "if",
  "in",
  "is",
  "it",
  "my",
  "of",
  "on",
  "or",
  "the",
  "to",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with",
  "can",
  "cant",
  "cannot",
]);

/** Extra phrases visitors actually type (FAQ questions + AuditionQ Help topic labels). */
const EXTRA_KEYWORDS: Record<string, string[]> = {
  "what-is-auditionq": [
    "what is auditionq",
    "what is audition q",
    "auditionq site",
    "auditionq website",
    "auditionq.com",
    "casting platform",
    "about auditionq",
  ],
  "create-account": [
    "create account",
    "create an account",
    "get started",
    "register",
    "sign up auditionq",
    "auditionq account",
    "otp",
    "verify otp",
    "talent or director",
    "actor or casting director",
    "sign-in / role",
  ],
  "switch-talent-director": [
    "switch talent",
    "switch director",
    "switch to talent",
    "switch to director",
    "talent mode",
    "director mode",
    "change mode",
    "change role",
    "account menu",
    "avatar",
    "dual role",
    "talent + director",
  ],
  "add-second-profile": [
    "add director profile",
    "add talent profile",
    "both talent and director",
    "one account both",
    "second profile",
    "same login",
  ],
  "login-choose-role": [
    "sign in as",
    "sign in as director",
    "sign in as talent",
    "login role",
    "google sign-in",
    "google sign in",
    "last session",
    "sign-in / role",
  ],
  "switch-to-apply": [
    "apply in director mode",
    "director mode apply",
    "cannot apply director",
    "switch to apply",
  ],
  "switch-for-team-invite": [
    "team invite",
    "join team",
    "invited to a casting team",
    "only registered as talent",
    "team invite / join",
  ],
  "what-is-team-collaboration": [
    "team collaboration",
    "project team",
    "collaborators",
    "casting manager",
    "shortlist reviewer",
    "viewer",
    "shared with me",
  ],
  "forgot-password": [
    "forgot password",
    "forgot my password",
    "reset password",
    "password reset",
    "reset link",
  ],
  "complete-profile": [
    "complete profile",
    "complete my profile",
    "profile settings",
    "talent profile",
    "match scores",
  ],
  "cannot-apply": [
    "cannot apply",
    "can't apply",
    "cant apply",
    "why can't i apply",
    "unable to apply",
    "apply failed",
  ],
  "photo-upload": [
    "photo upload",
    "photos won't upload",
    "photos wont upload",
    "image format",
    "5 mb",
    "webp",
    "primary photo",
  ],
  "talent-see-team-reviews": [
    "see ratings",
    "see notes",
    "collaborator ratings",
    "private reviews",
    "team reviews talent",
  ],
  "publish-casting": [
    "publish casting",
    "publish a casting call",
    "create casting",
    "new casting call",
    "preview and publish",
    "kyc",
  ],
  "stuck-draft": [
    "stuck in draft",
    "draft casting",
    "cannot publish",
    "wont publish",
    "won't publish",
  ],
  "review-applications": [
    "review applications",
    "review applicants",
    "reviewing applicants",
    "shortlist",
    "final list",
    "invite for audition",
    "review workflow",
  ],
  "invite-team-members": [
    "invite collaborators",
    "invite team",
    "add team member",
    "team tab",
    "whatsapp invite",
    "workspace link",
    "invites / links",
  ],
  "team-roles-explained": [
    "team roles",
    "role permissions",
    "casting manager",
    "shortlist reviewer",
    "viewer role",
    "what do the roles mean",
  ],
  "workspace-link-vs-email": [
    "workspace link",
    "email invite",
    "share link",
    "whatsapp link",
    "difference between invite",
  ],
  "approve-team-requests": [
    "approve request",
    "access request",
    "team requests",
    "action required",
    "access request / approval",
  ],
  "find-shared-projects": [
    "shared with me",
    "shared casting",
    "collaborating on",
    "find shared",
    "can't find shared",
  ],
  "shortlist-reviewer-cannot-shortlist": [
    "cannot shortlist",
    "can't shortlist",
    "cant shortlist",
    "unlist",
    "shortlist / unlist",
    "shortlist reviewer cannot",
  ],
  "shortlist-reviewer-view": [
    "shortlist reviewer see",
    "what can i see",
    "reviewer view",
  ],
  "team-reviews-summary": [
    "team reviews",
    "collaborator notes",
    "ratings and notes",
    "average rating",
  ],
  "remove-collaborator": [
    "remove collaborator",
    "remove team member",
    "remove from team",
  ],
  "collaborator-limit": [
    "collaborator limit",
    "invite more",
    "can't invite more",
    "seat limit",
    "upgrade plan",
  ],
  "email-mismatch-invite": [
    "different email",
    "email mismatch",
    "wrong email invite",
    "signed in with a different email",
  ],
  "update-contact": [
    "update email",
    "update phone",
    "change email",
    "change phone",
    "account details",
  ],
  "deactivate-account": [
    "deactivate",
    "delete account",
    "account & privacy",
    "permanent deletion",
  ],
  "supported-browsers": [
    "supported browsers",
    "which browsers",
    "chrome",
    "firefox",
    "safari",
    "edge",
    "mobile",
  ],
  "page-not-loading": [
    "page isn't loading",
    "page not loading",
    "not saving",
    "report a problem",
    "clear cache",
    "something else",
  ],
};

const RELATED_IDS: Record<string, string[]> = {
  "what-is-auditionq": ["create-account", "switch-talent-director", "what-is-team-collaboration"],
  "create-account": ["switch-talent-director", "forgot-password", "complete-profile"],
  "switch-talent-director": ["add-second-profile", "login-choose-role", "switch-to-apply"],
  "add-second-profile": ["switch-talent-director", "login-choose-role", "create-account"],
  "login-choose-role": ["switch-talent-director", "forgot-password", "create-account"],
  "switch-to-apply": ["cannot-apply", "switch-talent-director", "complete-profile"],
  "switch-for-team-invite": ["invite-team-members", "add-second-profile", "what-is-team-collaboration"],
  "what-is-team-collaboration": ["team-roles-explained", "invite-team-members", "find-shared-projects"],
  "forgot-password": ["create-account", "login-choose-role", "update-contact"],
  "complete-profile": ["photo-upload", "cannot-apply", "switch-talent-director"],
  "cannot-apply": ["switch-to-apply", "complete-profile", "photo-upload"],
  "photo-upload": ["complete-profile", "page-not-loading", "supported-browsers"],
  "talent-see-team-reviews": ["team-reviews-summary", "review-applications", "what-is-team-collaboration"],
  "publish-casting": ["stuck-draft", "switch-talent-director", "invite-team-members"],
  "stuck-draft": ["publish-casting", "page-not-loading", "review-applications"],
  "review-applications": ["team-roles-explained", "shortlist-reviewer-view", "invite-team-members"],
  "invite-team-members": ["workspace-link-vs-email", "team-roles-explained", "approve-team-requests"],
  "team-roles-explained": ["shortlist-reviewer-cannot-shortlist", "invite-team-members", "what-is-team-collaboration"],
  "workspace-link-vs-email": ["invite-team-members", "email-mismatch-invite", "approve-team-requests"],
  "approve-team-requests": ["email-mismatch-invite", "invite-team-members", "find-shared-projects"],
  "find-shared-projects": ["what-is-team-collaboration", "switch-talent-director", "invite-team-members"],
  "shortlist-reviewer-cannot-shortlist": ["shortlist-reviewer-view", "team-roles-explained", "review-applications"],
  "shortlist-reviewer-view": ["shortlist-reviewer-cannot-shortlist", "team-reviews-summary", "review-applications"],
  "team-reviews-summary": ["talent-see-team-reviews", "review-applications", "team-roles-explained"],
  "remove-collaborator": ["collaborator-limit", "invite-team-members", "find-shared-projects"],
  "collaborator-limit": ["remove-collaborator", "invite-team-members", "publish-casting"],
  "email-mismatch-invite": ["approve-team-requests", "workspace-link-vs-email", "switch-for-team-invite"],
  "update-contact": ["forgot-password", "deactivate-account", "create-account"],
  "deactivate-account": ["update-contact", "forgot-password", "create-account"],
  "supported-browsers": ["page-not-loading", "photo-upload", "what-is-auditionq"],
  "page-not-loading": ["supported-browsers", "photo-upload", "forgot-password"],
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9@.#+\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keywordsFromQuestion(question: string): string[] {
  const words = normalize(question)
    .split(" ")
    .filter((w) => w.length > 2 && !STOP.has(w));
  const grams: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    grams.push(`${words[i]} ${words[i + 1]}`);
  }
  for (let i = 0; i < words.length - 2; i++) {
    grams.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  return grams;
}

function questionById(id: string): string | undefined {
  return FAQ_ITEMS.find((item) => item.id === id)?.question;
}

function suggestionsFor(item: FaqItem): string[] {
  const ids = RELATED_IDS[item.id] ?? [];
  return ids
    .map((id) => questionById(id))
    .filter((q): q is string => Boolean(q))
    .slice(0, 3);
}

function factsFor(item: FaqItem): FaqKnowledgeEntry["facts"] {
  const facts = [{ text: item.answer }];
  if (item.id === "what-is-auditionq") {
    facts.push({
      text: "AuditionQ is NexusQ Global’s live flagship — the only product on this website marked Live. Open it at https://www.auditionq.com/, or click the casting video box on this homepage.",
    });
  }
  return facts;
}

export function auditionqFaqKnowledge(): FaqKnowledgeEntry[] {
  return FAQ_ITEMS.map((item) => {
    const keywords = [
      ...new Set([
        normalize(item.question),
        ...keywordsFromQuestion(item.question),
        ...(EXTRA_KEYWORDS[item.id] ?? []),
        item.audience === "artist" ? "actor" : "",
        item.audience === "director" ? "casting director" : "",
      ]),
    ].filter(Boolean);

    return {
      id: `faq-${item.id}`,
      title: item.question,
      keywords,
      facts: factsFor(item),
      link: { ...AUDITIONQ },
      suggestions: suggestionsFor(item),
    };
  });
}

/** AuditionQ in-app Help topics (problem / suggestion / feedback). */
export const AUDITIONQ_HELP_TOPICS: FaqKnowledgeEntry = {
  id: "auditionq-help-topics",
  title: "AuditionQ Help — report a problem, suggestion, or feedback",
  keywords: [
    "report a problem",
    "report a problem on auditionq",
    "how do i report",
    "auditionq help",
    "suggestion",
    "feedback",
    "help button",
    "help bubble",
    "team invite / join",
    "access request / approval",
    "role permissions",
    "shared with me",
    "sign-in / role",
    "shortlist / unlist",
    "team roles",
    "invites / links",
    "team reviews",
    "other idea",
    "something else",
    "talent + director",
    "reviewing applicants",
    "team collaboration",
  ],
  facts: [
    {
      text: "On the AuditionQ site (auditionq.com), use the Help button to report a problem, send a suggestion, or share feedback.",
    },
    {
      text: "Help topics cover sign-in / Talent vs Director, team invites and joining, access-request approval, role permissions, Shared with me, shortlist/unlist, team reviews, and switching between Talent and Director.",
    },
    {
      text: "If something still fails, include what you tried and what you expected — then submit from Help, or ask here to reach customer support.",
    },
  ],
  link: { ...AUDITIONQ },
  suggestions: [
    "How do I report a problem on AuditionQ?",
    "I was invited to a casting team but I’m only registered as Talent — what do I do?",
    "How do I switch from Talent to Director (or Director to Talent)?",
  ],
};
