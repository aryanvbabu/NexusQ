import { AUDITIONQ_HELP_TOPICS, auditionqFaqKnowledge } from "@/lib/auditionq-faq-knowledge";

export type ChatRole = "user" | "assistant";

export type ChatTurn = {
  role: ChatRole;
  content: string;
};

export type HelpLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type HelpReply = {
  answer: string;
  link?: HelpLink;
  suggestions: string[];
  collectEmail?: boolean;
};

type Intent = "what" | "how" | "where" | "why" | "yesno" | "list" | "general";

type Fact = {
  text: string;
  intents?: Intent[];
};

type KnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  facts: Fact[];
  link?: HelpLink;
  suggestions: string[];
};

export type RetrievedHelp = {
  kind:
    | "empty"
    | "greeting"
    | "thanks"
    | "off_topic"
    | "unknown"
    | "answer"
    | "support_need_email"
    | "support_send"
    | "support_declined";
  intent: Intent;
  query: string;
  facts: string[];
  link?: HelpLink;
  suggestions: string[];
  lead?: string;
  topic?: string;
  visitorEmail?: string;
  unansweredQuestion?: string;
};

const SITE_TERMS = [
  "nexusq",
  "nexus q",
  "auditionq",
  "audition q",
  "fursure",
  "fur sure",
  "rideq",
  "ride q",
  "caringminds",
  "caring minds",
  "onakkodi",
  "onak kodi",
  "future ai",
  "partner",
  "partnership",
  "collaborate",
  "collaborator",
  "login",
  "sign in",
  "sign up",
  "account",
  "privacy",
  "terms",
  "website",
  "this site",
  "this page",
  "homepage",
  "product",
  "products",
  "ecosystem",
  "flagship",
  "vision",
  "exploration",
  "navbar",
  "navigation",
  "guide me",
  "tour",
  "theme",
  "dark mode",
  "light mode",
  "contact",
  "email",
  "inquiry",
  "enquiry",
  "admin@",
  "auditionq.com",
  "video box",
  "monitor",
  // AuditionQ product help
  "casting",
  "casting call",
  "casting director",
  "talent",
  "actor",
  "actress",
  "performer",
  "director",
  "director mode",
  "talent mode",
  "apply",
  "application",
  "shortlist",
  "final list",
  "profile",
  "otp",
  "kyc",
  "team invite",
  "shared with me",
  "workspace link",
  "casting manager",
  "shortlist reviewer",
  "forgot password",
  "password",
  "deactivate",
  "browser",
  "browsers",
  "support",
  "customer support",
  "report a problem",
  "suggestion",
  "feedback",
  "whatsapp",
  "workspace",
  "kyc",
  "shortlist reviewer",
  "shared with me",
];

const OFF_TOPIC = [
  "weather",
  "recipe",
  "recipes",
  "joke",
  "jokes",
  "homework",
  "capital of",
  "who won",
  "stock price",
  "bitcoin",
  "crypto",
  "write python",
  "write javascript",
  "write code",
  "python script",
  "javascript",
  "translate this",
  "poem",
  "essay",
  "news today",
  "sports score",
];

const DEFAULT_SUGGESTIONS = [
  "What is AuditionQ?",
  "How do I create an account as an Actor or Casting Director?",
  "How do I switch from Talent to Director (or Director to Talent)?",
  "How do I partner with NexusQ?",
];

const SUPPORT_SUGGESTIONS = [
  "Yes, contact support",
  "What is AuditionQ?",
  "How do I create an account as an Actor or Casting Director?",
];

const GREETING = /^(hi|hello|hey|yo|hiya|good (morning|afternoon|evening)|howdy)\b/i;
const THANKS =
  /^(thanks|thank you|thx|cheers|great|awesome|perfect|got it|ok|okay|cool|nice)\b/i;

const siteKnowledge: KnowledgeEntry[] = [
  {
    id: "what-is-nexusq",
    title: "What is NexusQ Global",
    keywords: [
      "nexusq",
      "nexus q",
      "who are you",
      "what is this",
      "what is this site",
      "what is this website",
      "company",
      "parent company",
      "about nexusq",
      "what do you do",
      "who is nexusq",
      "overview",
    ],
    facts: [
      {
        text: "NexusQ Global is a product-first parent company that designs and ships focused digital platforms.",
        intents: ["what", "general"],
      },
      {
        text: "This website is the company home: it introduces the ecosystem and how to partner with the team.",
        intents: ["what", "how", "general"],
      },
      {
        text: "NexusQ is not a single-app company — AuditionQ is the live flagship, and other named platforms stay labelled until they ship.",
        intents: ["what", "list", "yesno"],
      },
    ],
    link: { label: "Go to Home", href: "/#home" },
    suggestions: [
      "What products are in the ecosystem?",
      "Is AuditionQ live?",
      "How do I partner with you?",
    ],
  },
  {
    id: "how-to-use-site",
    title: "How to use this website",
    keywords: [
      "how to use",
      "how does this site",
      "navigate",
      "where do i start",
      "help me around",
      "show me around",
      "sections",
      "what can i do here",
      "site tour",
    ],
    facts: [
      {
        text: "Use the top navigation to jump around the homepage.",
        intents: ["how", "where", "general"],
      },
      {
        text: "Home introduces NexusQ. Platforms lists every product with Live, Vision, or Exploration labels.",
        intents: ["how", "list", "what"],
      },
      {
        text: "You can click the homepage casting video box to open AuditionQ, or use the AuditionQ section CTA.",
        intents: ["how", "where"],
      },
      {
        text: "Sign In is in the navbar. Theme toggle and Guide me (spotlight tour) are in the menu as well.",
        intents: ["how", "where"],
      },
    ],
    link: { label: "Explore platforms", href: "/#platforms" },
    suggestions: [
      "What is the difference between Live and Vision?",
      "How do I contact you?",
      "Where is AuditionQ?",
    ],
  },
  {
    id: "auditionq",
    title: "AuditionQ",
    keywords: [
      "auditionq",
      "audition q",
      "flagship",
      "live product",
      "audition",
      "interview",
      "auditionq.com",
      "video box",
      "monitor",
      "casting room",
      "open auditionq",
      "visit auditionq",
      "what is auditionq",
    ],
    facts: [
      {
        text: "AuditionQ is NexusQ Global’s live flagship product — the only platform on this site marked Live.",
        intents: ["what", "yesno", "general"],
      },
      {
        text: "It is a modern casting platform that connects actors and performers with casting directors and production companies.",
        intents: ["what", "general"],
      },
      {
        text: "Actors can discover casting calls, build profiles, and apply to roles. Casting directors can publish calls, search talent, manage applications, and invite collaborators.",
        intents: ["what", "list", "how"],
      },
      {
        text: "AuditionQ is available today at https://www.auditionq.com/.",
        intents: ["where", "how", "yesno"],
      },
      {
        text: "On this NexusQ homepage, click the casting video box to open AuditionQ in a new tab.",
        intents: ["how", "where"],
      },
      {
        text: "AuditionQ is a distinct product; NexusQ Global remains the parent company. An account on this NexusQ site is not an AuditionQ product login.",
        intents: ["yesno"],
      },
    ],
    link: {
      label: "Visit AuditionQ",
      href: "https://www.auditionq.com/",
      external: true,
    },
    suggestions: [
      "How do I create an account as an Actor or Casting Director?",
      "How do I switch from Talent to Director (or Director to Talent)?",
      "What is project team collaboration?",
    ],
  },
  {
    id: "customer-support",
    title: "Customer support",
    keywords: [
      "customer support",
      "contact support",
      "talk to support",
      "talk to a human",
      "human support",
      "help desk",
      "reach support",
      "report a problem",
      "need help from someone",
    ],
    facts: [
      {
        text: "Yes — you can reach NexusQ / AuditionQ customer support at admin@auditionq.com.",
        intents: ["yesno", "how", "where", "what", "general"],
      },
      {
        text: "On AuditionQ (auditionq.com), use the Help button to report a problem, send a suggestion, or share feedback.",
        intents: ["how", "where"],
      },
      {
        text: "For partnerships and business inquiries, the Partner form at /partner is the preferred path.",
        intents: ["how", "where"],
      },
    ],
    link: { label: "Email support", href: "mailto:admin@auditionq.com" },
    suggestions: [
      "How do I report a problem on AuditionQ?",
      "How do I partner with NexusQ?",
      "What is AuditionQ?",
    ],
  },
  {
    id: "ecosystem",
    title: "Product ecosystem",
    keywords: [
      "ecosystem",
      "platforms",
      "products",
      "suite",
      "all products",
      "what products",
      "what do you build",
      "product list",
    ],
    facts: [
      {
        text: "The ecosystem is AuditionQ (Live), FurSure (Vision), RideQ (Vision), CaringMinds (Vision), Onakkodi (Vision), and Future AI (Exploration).",
        intents: ["list", "what", "general"],
      },
      {
        text: "Only AuditionQ is available today.",
        intents: ["yesno", "list"],
      },
      {
        text: "Vision and exploration products have no download, store, or “launch app” buttons until they ship.",
        intents: ["how", "yesno", "what"],
      },
    ],
    link: { label: "See platforms", href: "/#platforms" },
    suggestions: [
      "Tell me about FurSure",
      "Tell me about RideQ",
      "Is AuditionQ live?",
    ],
  },
  {
    id: "live-vs-vision",
    title: "Live, vision, and exploration",
    keywords: [
      "live",
      "vision",
      "exploration",
      "status",
      "launched",
      "available",
      "not launched",
      "coming soon",
      "download",
      "difference between",
      "labels",
    ],
    facts: [
      {
        text: "Live means the product is publicly available now — that is only AuditionQ.",
        intents: ["what", "yesno", "list"],
      },
      {
        text: "Vision means a named direction or early concept that is not launched and is not offered as a service.",
        intents: ["what", "yesno"],
      },
      {
        text: "Exploration (Future AI) is research and experimentation, not a shipped product.",
        intents: ["what", "yesno"],
      },
      {
        text: "We do not invent launch dates, store links, or fake metrics.",
        intents: ["why", "what"],
      },
    ],
    suggestions: [
      "What is AuditionQ?",
      "Which products are vision?",
      "How do I partner?",
    ],
  },
  {
    id: "fursure",
    title: "FurSure",
    keywords: ["fursure", "fur sure", "pet", "paw"],
    facts: [
      {
        text: "FurSure is a vision product in the NexusQ ecosystem.",
        intents: ["what", "yesno", "general"],
      },
      {
        text: "Details will be shared when it moves beyond exploration. It is not launched and cannot be downloaded or used yet.",
        intents: ["what", "yesno", "how"],
      },
    ],
    link: { label: "See platforms", href: "/#platforms" },
    suggestions: ["What else is in vision?", "Is AuditionQ live?"],
  },
  {
    id: "rideq",
    title: "RideQ",
    keywords: ["rideq", "ride q", "mobility", "car", "transport"],
    facts: [
      {
        text: "RideQ is a vision product focused on future mobility experiences.",
        intents: ["what", "general"],
      },
      {
        text: "It is in early concept and is not launched.",
        intents: ["yesno", "what"],
      },
    ],
    link: { label: "See platforms", href: "/#platforms" },
    suggestions: ["What is CaringMinds?", "How do I partner?"],
  },
  {
    id: "caringminds",
    title: "CaringMinds",
    keywords: ["caringminds", "caring minds", "wellbeing", "well being", "care", "health"],
    facts: [
      {
        text: "CaringMinds is a vision product exploring digital tools for wellbeing and care.",
        intents: ["what", "general"],
      },
      {
        text: "It is presented as direction, not a live service.",
        intents: ["yesno", "what"],
      },
    ],
    link: { label: "See platforms", href: "/#platforms" },
    suggestions: ["What is Onakkodi?", "Is AuditionQ live?"],
  },
  {
    id: "onakkodi",
    title: "Onakkodi",
    keywords: ["onakkodi", "onak kodi", "apparel", "fashion", "clothing"],
    facts: [
      {
        text: "Onakkodi is a vision product under the NexusQ umbrella.",
        intents: ["what", "general"],
      },
      {
        text: "Status is concept / early development — it is not available yet.",
        intents: ["yesno", "what"],
      },
    ],
    link: { label: "See platforms", href: "/#platforms" },
    suggestions: ["What is Future AI?", "How do I partner?"],
  },
  {
    id: "future-ai",
    title: "Future AI",
    keywords: [
      "future ai",
      "ai",
      "ai agents",
      "artificial intelligence",
      "innovation",
      "experiment",
      "next generation",
    ],
    facts: [
      {
        text: "Future AI is ongoing exploration into AI capabilities and future platforms — experimentation only, not a shipped product.",
        intents: ["what", "yesno", "general"],
      },
      {
        text: "The Future section also mentions AI agents, global expansion, and future platforms as directions, introduced only when ready.",
        intents: ["what", "list", "how"],
      },
    ],
    link: { label: "See Future", href: "/#future" },
    suggestions: ["What is live today?", "How do I partner?"],
  },
  {
    id: "partner",
    title: "Partner with NexusQ",
    keywords: [
      "partner",
      "partnership",
      "collaborate",
      "collaboration",
      "client",
      "business",
      "investment",
      "contact",
      "inquiry",
      "enquiry",
      "work with",
      "reach out",
      "get in touch",
      "start a conversation",
    ],
    facts: [
      {
        text: "NexusQ welcomes partnerships, client work, collaboration, investment/business conversations, and other legitimate inquiries.",
        intents: ["what", "general"],
      },
      {
        text: "Open /partner, then send your name, email, optional company, interest type, and a message. The team reads every submission.",
        intents: ["how", "where"],
      },
      {
        text: "You can also email admin@auditionq.com.",
        intents: ["how", "where"],
      },
    ],
    link: { label: "Open partner form", href: "/partner" },
    suggestions: [
      "What email can I use?",
      "Is AuditionQ live?",
      "What is NexusQ Global?",
    ],
  },
  {
    id: "email",
    title: "Contact email",
    keywords: ["email", "mail", "admin@", "write to you", "phone", "address"],
    facts: [
      {
        text: "The contact address published on this site is admin@auditionq.com.",
        intents: ["where", "how", "what"],
      },
      {
        text: "For partnerships, the Partner form at /partner is the preferred path.",
        intents: ["how", "where"],
      },
      {
        text: "We do not publish a street address or phone number on this website.",
        intents: ["where", "what", "yesno"],
      },
    ],
    link: { label: "Open partner form", href: "/partner" },
    suggestions: ["How does the partner form work?", "Where is Privacy?"],
  },
  {
    id: "login",
    title: "Sign in and sign up",
    keywords: [
      "login",
      "log in",
      "sign in",
      "sign up",
      "signup",
      "nexusq account",
      "this site account",
      "website account",
      "nexusq site",
      "sign out",
      "settings page",
    ],
    facts: [
      {
        text: "After you sign in, the navbar shows your name and Sign Out. There is no Settings page on this NexusQ site.",
        intents: ["what"],
      },
      {
        text: "Use Sign In in the navbar to open /login. You can create a NexusQ website account with name, email, and password, or sign in if you already have one.",
        intents: ["how", "where"],
      },
      {
        text: "This account is only for the NexusQ Global website — not AuditionQ. To use AuditionQ as Talent or Director, create an account at https://www.auditionq.com/ (Get Started).",
        intents: ["what", "yesno", "how"],
      },
    ],
    link: { label: "Go to Sign In", href: "/login" },
    suggestions: [
      "How do I create an AuditionQ account?",
      "What data do you store?",
      "How do I partner?",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    keywords: ["privacy", "data", "personal information", "cookies", "gdpr"],
    facts: [
      {
        text: "The Privacy page is a placeholder pending final legal review — not lawyer-reviewed legal advice.",
        intents: ["what", "general"],
      },
      {
        text: "The partner form collects name, email, company, interest, and message. Accounts store name, email, and a hashed password.",
        intents: ["what", "how"],
      },
      {
        text: "Privacy questions: admin@auditionq.com.",
        intents: ["how", "where"],
      },
    ],
    link: { label: "Read Privacy", href: "/privacy" },
    suggestions: ["Where are the Terms?", "How do I sign in?"],
  },
  {
    id: "terms",
    title: "Terms of use",
    keywords: ["terms", "legal", "conditions", "warranty"],
    facts: [
      {
        text: "The Terms page is a placeholder pending final legal review.",
        intents: ["what", "general"],
      },
      {
        text: "AuditionQ is described as live; other named platforms may be vision or exploration and are not offered as available services unless explicitly stated.",
        intents: ["what", "yesno"],
      },
    ],
    link: { label: "Read Terms", href: "/terms" },
    suggestions: ["Where is Privacy?", "What is live today?"],
  },
  {
    id: "trust",
    title: "Trust and honesty",
    keywords: [
      "trust",
      "metrics",
      "testimonials",
      "customers",
      "proof",
      "honest",
      "hype",
    ],
    facts: [
      {
        text: "This website does not publish fabricated metrics, testimonials, or customer logos.",
        intents: ["what", "why", "yesno"],
      },
      {
        text: "Trust is meant to come from shipped work (AuditionQ is live) and clear Live vs Vision labels.",
        intents: ["what", "why"],
      },
    ],
    link: { label: "See Trust", href: "/#trust" },
    suggestions: ["Is AuditionQ live?", "How do I partner?"],
  },
  {
    id: "theme",
    title: "Light and dark theme",
    keywords: ["theme", "dark mode", "light mode", "appearance", "toggle"],
    facts: [
      {
        text: "The navbar includes a theme toggle for dark (default) and light mode.",
        intents: ["how", "where", "what"],
      },
      {
        text: "The same pages and product labels stay available in both themes.",
        intents: ["what", "yesno"],
      },
    ],
    suggestions: ["How do I navigate the site?", "How do I sign in?"],
  },
  {
    id: "vision-company",
    title: "Why NexusQ exists",
    keywords: ["why", "pillars", "craft", "mission", "about us"],
    facts: [
      {
        text: "NexusQ exists to build and steward an ecosystem of focused digital products — not a single app.",
        intents: ["why", "what"],
      },
      {
        text: "We ship what is real (AuditionQ is live) and keep vision products clearly labelled until they are ready.",
        intents: ["why", "what", "yesno"],
      },
    ],
    link: { label: "Read why we exist", href: "/#about" },
    suggestions: ["What products exist?", "How do I partner?"],
  },
];

const knowledge: KnowledgeEntry[] = [
  ...siteKnowledge,
  ...(auditionqFaqKnowledge() as KnowledgeEntry[]),
  AUDITIONQ_HELP_TOPICS as KnowledgeEntry,
];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9@.#+\s]/g, " ").replace(/\s+/g, " ").trim();
}

function containsTerm(query: string, term: string) {
  const t = term.trim();
  if (!t) return false;
  if (t.includes(" ")) return query.includes(t);
  const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:[^a-z0-9]|$)`).test(query);
}

function seedFrom(text: string, extra = 0) {
  let h = extra + 7;
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 31) + text.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(items: readonly T[], seed: number): T {
  return items[seed % items.length];
}

function isOffTopic(query: string) {
  if (SITE_TERMS.some((term) => containsTerm(query, term))) return false;
  return OFF_TOPIC.some((term) => containsTerm(query, term));
}

function isSiteRelated(query: string) {
  return SITE_TERMS.some((term) => containsTerm(query, term));
}

function detectIntent(query: string): Intent {
  if (/\b(forgot|reset).*\bpassword\b|\bpassword\b.*\b(forgot|reset)\b/.test(query)) {
    return "how";
  }
  if (/\b(how do i|how can i|how to|how does|steps?)\b/.test(query)) return "how";
  if (/\bwhere\b/.test(query)) return "where";
  if (/\bwhy\b/.test(query)) return "why";
  if (/\b(which|list|all product|ecosystem|platforms|what products)\b/.test(query)) {
    return "list";
  }
  if (
    /^(is|are|does|do|can|will)\b/.test(query) ||
    /\b(is it live|are they live|available yet|launched yet|not launched)\b/.test(query)
  ) {
    return "yesno";
  }
  if (
    /\b(what is|what's|what are|what do|what does|who is|tell me about|explain|mean)\b/.test(
      query
    )
  ) {
    return "what";
  }
  return "general";
}

function scoreEntry(query: string, entry: KnowledgeEntry) {
  let score = 0;
  let wordHits = 0;
  const qTokens = new Set(query.split(" ").filter((t) => t.length > 1));
  const titleWords = normalize(entry.title)
    .split(" ")
    .filter((w) => w.length > 2 && !["the", "and", "for", "how", "what", "why"].includes(w));

  for (const keyword of entry.keywords) {
    const kw = normalize(keyword);
    if (!kw) continue;
    if (query.includes(kw) && (kw.includes(" ") || containsTerm(query, kw))) {
      if (kw.includes(" ")) score += Math.min(14, 8 + kw.split(" ").length * 2);
      else wordHits += 1;
      continue;
    }
    const kTokens = kw.split(" ").filter((t) => t.length > 1);
    if (kTokens.length > 1) {
      const overlap = kTokens.filter((t) => qTokens.has(t)).length;
      if (overlap === kTokens.length) score += 8;
      else if (overlap >= 2) score += 3;
    }
  }

  score += Math.min(10, wordHits * 3);

  if (titleWords.length > 0) {
    const titleHits = titleWords.filter((w) => qTokens.has(w)).length;
    score += Math.round((titleHits / titleWords.length) * 18);
    if (titleHits === titleWords.length && titleWords.length >= 4) score += 12;
  }

  const title = normalize(entry.title);
  if (title === query) score += 20;
  else if (
    title.length >= 16 &&
    (query.includes(title) || (title.includes(query) && query.length >= 16))
  ) {
    score += 16;
  }

  if (entry.id.startsWith("faq-") && titleWords.length >= 3) {
    const titleHits = titleWords.filter((w) => qTokens.has(w)).length;
    if (titleHits / titleWords.length >= 0.5) score += 4;
  }

  return score;
}

const EMAIL_IN_TEXT = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;

function extractVisitorEmail(text: string): string | undefined {
  const match = text.match(EMAIL_IN_TEXT);
  if (!match) return undefined;
  const email = match[0].toLowerCase();
  if (email === "admin@auditionq.com" || email.endsWith("@resend.dev")) return undefined;
  return email;
}

function isAffirmative(text: string) {
  const n = text.trim();
  return (
    /^(yes|yeah|yep|yup|sure|please|ok|okay|yea)\b/i.test(n) ||
    /\b(contact support|reach support|email me|send (me )?an email)\b/i.test(n)
  );
}

function isNegative(text: string) {
  return /^(no|nope|nah|no thanks|no thank you|not now)\b/i.test(text.trim());
}

function unansweredQuestion(history: ChatTurn[], current: string): string {
  const users = [
    ...history.filter((t) => t.role === "user").map((t) => t.content),
    current,
  ];
  for (let i = users.length - 1; i >= 0; i--) {
    const content = users[i].trim();
    if (isAffirmative(content) || isNegative(content)) continue;
    const email = extractVisitorEmail(content);
    if (email && content.replace(EMAIL_IN_TEXT, "").trim().length < 8) continue;
    return content.slice(0, 500);
  }
  return current.slice(0, 500);
}

function detectSupportFollowUp(
  message: string,
  history: ChatTurn[]
): RetrievedHelp | null {
  const last = [...history].reverse().find((t) => t.role === "assistant");
  if (!last) return null;
  const offered = last.content.includes("reach our customer support");
  const askedEmail =
    last.content.includes("email address I should write to") ||
    last.content.includes("Share your email");
  if (!offered && !askedEmail) return null;

  const email = extractVisitorEmail(message);
  if (isNegative(message) && !email) {
    return {
      kind: "support_declined",
      intent: "general",
      query: normalize(message),
      facts: [],
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }
  if (email) {
    return {
      kind: "support_send",
      intent: "general",
      query: normalize(message),
      facts: [],
      suggestions: DEFAULT_SUGGESTIONS,
      visitorEmail: email,
      unansweredQuestion: unansweredQuestion(history, message),
    };
  }
  if (isAffirmative(message) || askedEmail) {
    return {
      kind: "support_need_email",
      intent: "general",
      query: normalize(message),
      facts: [],
      suggestions: ["No thanks"],
    };
  }
  return null;
}

function expandWithHistory(message: string, history: ChatTurn[]) {
  const trimmed = message.trim();
  const words = trimmed.split(/\s+/);
  const followUp =
    words.length <= 10 &&
    /^(and |what about|how about|tell me more|more|is it|is that|can i|where|how|why|that|this|them|those|it |the |also)\b/i.test(
      trimmed
    );

  if (!followUp) return trimmed;

  const lastUser = [...history].reverse().find((t) => t.role === "user");
  const lastAssistant = [...history].reverse().find((t) => t.role === "assistant");
  return [lastUser?.content, lastAssistant?.content.slice(0, 180), trimmed]
    .filter(Boolean)
    .join(" ");
}

function alreadySaid(history: ChatTurn[]) {
  return history
    .filter((t) => t.role === "assistant")
    .map((t) => t.content.toLowerCase())
    .join("\n");
}

function yesNoLead(query: string, seed: number): string | undefined {
  const liveYes = /\b(auditionq|audition q)\b/.test(query) && /\b(live|available|launched|out yet)\b/.test(query);
  const liveAny = /\b(any other|other product|anything else).*(live|available)/.test(query);
  const visionName =
    /\b(fursure|fur sure|rideq|ride q|caringminds|caring minds|onakkodi|future ai)\b/.test(
      query
    ) && /\b(live|available|launched|out yet|ready)\b/.test(query);

  if (liveYes) {
    return pick(
      [
        "Yes — AuditionQ is live today.",
        "Yes. AuditionQ is the only live product on this site.",
        "Short answer: yes. AuditionQ is live.",
      ],
      seed
    );
  }
  if (liveAny) {
    return pick(
      [
        "No — only AuditionQ is live.",
        "Nothing else is live yet. AuditionQ is the one shipped product.",
        "Just AuditionQ for now. The others are vision or exploration.",
      ],
      seed
    );
  }
  if (visionName) {
    return pick(
      [
        "No — that one is not launched.",
        "Not yet. It is still labelled vision or exploration, not a live service.",
        "It is not available to use today.",
      ],
      seed
    );
  }
  return undefined;
}

function selectFacts(
  entries: KnowledgeEntry[],
  intent: Intent,
  query: string,
  said: string,
  limit: number
) {
  const picked: string[] = [];
  const passwordOnly = /\b(forgot|reset).*\bpassword\b|\bpassword\b.*\b(forgot|reset)\b/.test(
    query
  );

  for (const entry of entries) {
    let unused = entry.facts.filter((f) => !said.includes(f.text.slice(0, 48).toLowerCase()));
    if (passwordOnly) {
      unused = unused.filter((f) => /password/i.test(f.text));
    }
    const tagged = unused.filter((f) => f.intents?.includes(intent));
    const pool = (tagged.length > 0 ? tagged : unused).map((f) => f.text);
    const before = picked.length;
    for (const text of pool) {
      if (picked.includes(text)) continue;
      picked.push(text);
      if (picked.length >= limit) return picked;
    }
    // Stick to the best-matching topic so unrelated second hits do not pad the reply.
    if (picked.length > before) return picked;
  }
  if (picked.length === 0) {
    for (const entry of entries) {
      for (const fact of entry.facts) {
        if (!picked.includes(fact.text)) picked.push(fact.text);
        if (picked.length >= limit) return picked;
      }
    }
  }
  return picked;
}

export function retrieveSiteHelp(
  rawMessage: string,
  history: ChatTurn[] = []
): RetrievedHelp {
  const message = rawMessage.trim();
  const seed = seedFrom(message, history.length);

  if (!message) {
    return {
      kind: "empty",
      intent: "general",
      query: "",
      facts: [],
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (GREETING.test(message) && message.split(/\s+/).length <= 6) {
    return {
      kind: "greeting",
      intent: "general",
      query: normalize(message),
      facts: [],
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  const supportFollowUp = detectSupportFollowUp(message, history);
  if (supportFollowUp) return supportFollowUp;

  if (THANKS.test(message) && message.split(/\s+/).length <= 8) {
    return {
      kind: "thanks",
      intent: "general",
      query: normalize(message),
      facts: [],
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  const query = normalize(expandWithHistory(message, history));
  const intent = detectIntent(query);

  if (isOffTopic(query) && !isSiteRelated(query)) {
    return {
      kind: "off_topic",
      intent,
      query,
      facts: [],
      suggestions: SUPPORT_SUGGESTIONS,
    };
  }

  const ranked = knowledge
    .map((entry) => ({ entry, score: scoreEntry(query, entry) }))
    .sort((a, b) => b.score - a.score);

  let best = ranked[0];
  const second = ranked[1];
  const genericSiteAuth =
    /\b(sign in|sign up|log in|login)\b/.test(query) &&
    !/\b(auditionq|talent|director|actor|otp|get started|casting|forgot|password)\b/.test(
      query
    );
  if (genericSiteAuth) {
    const siteLogin = ranked.find((r) => r.entry.id === "login");
    if (siteLogin) best = siteLogin;
  }
  const minScore = isSiteRelated(query) ? 4 : 6;

  if (!best || best.score < minScore) {
    return {
      kind: "unknown",
      intent,
      query,
      facts: [],
      suggestions: SUPPORT_SUGGESTIONS,
    };
  }

  const faqTopic = best.entry.id.startsWith("faq-");
  const chosen = [best.entry];
  if (
    !faqTopic &&
    second &&
    second.score >= 6 &&
    second.score >= best.score * 0.72 &&
    second.entry.id !== best.entry.id &&
    !second.entry.id.startsWith("faq-")
  ) {
    chosen.push(second.entry);
  }

  const factLimit = /\b(forgot|reset).*\bpassword\b|\bpassword\b.*\b(forgot|reset)\b/.test(
    query
  )
    ? 1
    : faqTopic
      ? Math.min(2, best.entry.facts.length)
      : intent === "yesno"
        ? yesNoLead(query, seed)
          ? 1
          : 2
        : intent === "where"
          ? 2
          : 3;
  const facts = selectFacts(chosen, intent, query, alreadySaid(history), factLimit);

  if (facts.length === 0) {
    return {
      kind: "answer",
      intent,
      query,
      facts: [],
      link: best.entry.link ?? second?.entry.link,
      suggestions: best.entry.suggestions,
      topic: best.entry.title,
      lead: pick(
        [
          "I already covered that from the guide. Ask a follow-up — for example partnering, sign-in, or another AuditionQ step.",
          "That’s all I have left on that topic. What else about NexusQ or AuditionQ would you like?",
          "Covered already. Try a related question from the chips below.",
        ],
        seed
      ),
    };
  }

  return {
    kind: "answer",
    intent,
    query,
    facts,
    link: best.entry.link ?? second?.entry.link,
    suggestions: best.entry.suggestions,
    topic: best.entry.title,
    lead: intent === "yesno" ? yesNoLead(query, seed) : undefined,
  };
}

function formatAnswer(intent: Intent, facts: string[], lead?: string): string {
  if (facts.length === 0) return (lead ?? "").trim();

  if (lead) {
    return [lead, ...facts].join("\n\n").trim();
  }

  const [first, ...rest] = facts;
  if (rest.length === 0) return first;

  const shortSteps = rest.every((step) => step.length < 180);
  if ((intent === "how" || intent === "why") && shortSteps) {
    return [first, rest.map((step, i) => `${i + 1}. ${step}`).join("\n")].join("\n\n");
  }

  return [first, ...rest].join("\n\n");
}

const SUPPORT_OFFER_OFF_TOPIC = [
  "That’s outside NexusQ and AuditionQ help — I stay with this website and the AuditionQ product. Would you like to reach our customer support?",
  "I don’t cover general topics. Would you like to reach our customer support? I can email you a note so the team can help.",
  "That’s not something I can answer from the guide. Would you like to reach our customer support?",
];

const SUPPORT_OFFER_UNKNOWN = [
  "I don’t have that in the NexusQ / AuditionQ guide. Would you like to reach our customer support?",
  "I’m not sure from the published help. Would you like to reach our customer support? Share your email and I’ll write to you.",
  "That isn’t in my notes. Would you like to reach our customer support so someone can follow up?",
];

export function composeSiteHelp(retrieved: RetrievedHelp, rawMessage: string, history: ChatTurn[] = []): HelpReply {
  const seed = seedFrom(rawMessage.trim(), history.length);

  if (retrieved.kind === "empty") {
    return {
      answer: pick(
        [
          "Ask anything about NexusQ Global or AuditionQ — accounts, Talent vs Director, casting, teams, partnering, or this website.",
          "I can help with this site and the AuditionQ product. What do you want to know?",
          "Fire away: NexusQ, AuditionQ how-tos, vision products, partnering, or navigating the site.",
        ],
        seed
      ),
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (retrieved.kind === "greeting") {
    return {
      answer: pick(
        [
          "Hi — I can help with NexusQ and AuditionQ: accounts, Talent vs Director, casting, teams, partnering, and sign-in. What would you like to know?",
          "Hello. Ask about AuditionQ on auditionq.com, the ecosystem here, or how to get in touch.",
          "Hey. I’m here for NexusQ and AuditionQ questions — try a product how-to, Live vs Vision, partnering, or signing in.",
        ],
        seed
      ),
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (retrieved.kind === "thanks") {
    return {
      answer: pick(
        [
          "Glad that helped. Ask another question whenever you want.",
          "You’re welcome. I can also help with partnering, sign-in, or another AuditionQ step.",
          "Anytime. If you want the next step — visiting AuditionQ or the partner form — just say so.",
        ],
        seed
      ),
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (retrieved.kind === "off_topic") {
    return {
      answer: pick(SUPPORT_OFFER_OFF_TOPIC, seed),
      suggestions: SUPPORT_SUGGESTIONS,
    };
  }

  if (retrieved.kind === "unknown") {
    return {
      answer: pick(SUPPORT_OFFER_UNKNOWN, seed),
      suggestions: SUPPORT_SUGGESTIONS,
    };
  }

  if (retrieved.kind === "support_need_email") {
    return {
      answer:
        "Share the email address I should write to. I’ll send you a note asking if you want to reach our customer support.",
      suggestions: ["No thanks"],
      collectEmail: true,
    };
  }

  if (retrieved.kind === "support_send") {
    return {
      answer:
        "Thanks — I’ll email you now asking if you’d like to reach our customer support. You can also write to admin@auditionq.com anytime.",
      link: { label: "Email support", href: "mailto:admin@auditionq.com" },
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (retrieved.kind === "support_declined") {
    return {
      answer:
        "No problem. Ask whenever you like about NexusQ, AuditionQ, partnering, or this website.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (retrieved.facts.length === 0 && retrieved.lead) {
    return {
      answer: retrieved.lead,
      link: retrieved.link,
      suggestions: retrieved.suggestions,
    };
  }

  const answer = formatAnswer(retrieved.intent, retrieved.facts, retrieved.lead);

  return {
    answer: answer.trim(),
    link: retrieved.link,
    suggestions: retrieved.suggestions.length ? retrieved.suggestions : DEFAULT_SUGGESTIONS,
  };
}

export function answerSiteHelp(rawMessage: string, history: ChatTurn[] = []): HelpReply {
  return composeSiteHelp(retrieveSiteHelp(rawMessage, history), rawMessage, history);
}

export function knowledgeBriefing(retrieved: RetrievedHelp) {
  if (retrieved.kind !== "answer") return "";
  const lines = [
    ...(retrieved.lead ? [`Direct answer: ${retrieved.lead}`] : []),
    "Answer the question simply with these facts (no filler phrases):",
    ...retrieved.facts.map((line, i) => `${i + 1}. ${line}`),
  ];
  return lines.join("\n");
}
