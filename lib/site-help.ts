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
  kind: "empty" | "greeting" | "thanks" | "off_topic" | "unknown" | "answer";
  intent: Intent;
  query: string;
  facts: string[];
  link?: HelpLink;
  suggestions: string[];
  lead?: string;
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
  "translate this",
  "poem",
  "essay",
  "news today",
  "sports score",
];

const DEFAULT_SUGGESTIONS = [
  "What is NexusQ Global?",
  "Is AuditionQ live?",
  "How do I partner with you?",
  "How do I sign in?",
];

const GREETING = /^(hi|hello|hey|yo|hiya|good (morning|afternoon|evening)|howdy)\b/i;
const THANKS =
  /^(thanks|thank you|thx|cheers|great|awesome|perfect|got it|ok|okay|cool|nice)\b/i;

const knowledge: KnowledgeEntry[] = [
  {
    id: "what-is-nexusq",
    title: "What is NexusQ Global",
    keywords: [
      "nexusq",
      "nexus q",
      "who are you",
      "what is this",
      "this website",
      "this site",
      "company",
      "parent company",
      "about",
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
      "help",
      "guide",
      "tour",
      "sections",
      "what can i do here",
      "show me around",
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
      "talent",
      "casting",
      "audition",
      "interview",
      "auditionq.com",
      "video box",
      "monitor",
      "casting room",
      "open",
      "visit",
      "click",
    ],
    facts: [
      {
        text: "AuditionQ is NexusQ Global’s live flagship product.",
        intents: ["what", "yesno", "general"],
      },
      {
        text: "It is a modern, AI-powered platform that connects talent with opportunities through an audition and interview experience.",
        intents: ["what", "general"],
      },
      {
        text: "AuditionQ is available today at https://www.auditionq.com/.",
        intents: ["where", "how", "yesno"],
      },
      {
        text: "On this homepage, click the casting video box (Live audition / AuditionQ) to open that site.",
        intents: ["how", "where"],
      },
      {
        text: "AuditionQ is a distinct product; NexusQ Global remains the parent company. It is the only platform on this site marked Live.",
        intents: ["yesno", "what", "list"],
      },
    ],
    link: {
      label: "Visit AuditionQ",
      href: "https://www.auditionq.com/",
      external: true,
    },
    suggestions: [
      "Are any other products live?",
      "How do I partner with NexusQ?",
      "What is Future AI?",
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
      "register",
      "account",
      "password",
      "create account",
      "sign out",
      "settings",
    ],
    facts: [
      {
        text: "Use Sign In in the navbar to open /login. You can create an account with name, email, and password, or sign in if you already have one.",
        intents: ["how", "where"],
      },
      {
        text: "After you sign in, the navbar shows your name and Sign Out.",
        intents: ["how", "what"],
      },
      {
        text: "This account is for the NexusQ Global website — it is not an AuditionQ product login. There is no Settings page on this site.",
        intents: ["what", "yesno"],
      },
    ],
    link: { label: "Go to Sign In", href: "/login" },
    suggestions: ["What data do you store?", "How do I partner?"],
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

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9@.#+\s]/g, " ").replace(/\s+/g, " ").trim();
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
  if (SITE_TERMS.some((term) => query.includes(term))) return false;
  return OFF_TOPIC.some((term) => query.includes(term));
}

function isSiteRelated(query: string) {
  return SITE_TERMS.some((term) => query.includes(term));
}

function detectIntent(query: string): Intent {
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
  if (/\b(what is|what's|who is|tell me about|explain)\b/.test(query)) return "what";
  return "general";
}

function scoreEntry(query: string, entry: KnowledgeEntry) {
  let score = 0;
  const qTokens = new Set(query.split(" ").filter((t) => t.length > 1));

  for (const keyword of entry.keywords) {
    if (query.includes(keyword)) {
      score += keyword.includes(" ") ? 8 : 5;
    } else {
      const kTokens = keyword.split(" ");
      const overlap = kTokens.filter((t) => qTokens.has(t)).length;
      if (overlap && overlap === kTokens.length) score += 3;
    }
  }

  for (const word of entry.title.toLowerCase().split(" ")) {
    if (word.length > 2 && qTokens.has(word)) score += 2;
  }

  return score;
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
  said: string,
  limit: number
) {
  const picked: string[] = [];
  for (const entry of entries) {
    const unused = entry.facts.filter((f) => !said.includes(f.text.slice(0, 48).toLowerCase()));
    const tagged = unused.filter((f) => f.intents?.includes(intent));
    const fallback = unused.filter((f) => !tagged.includes(f));
    const pool = [...tagged, ...fallback].map((f) => f.text);
    for (const text of pool) {
      if (picked.includes(text)) continue;
      picked.push(text);
      if (picked.length >= limit) return picked;
    }
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
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  const ranked = knowledge
    .map((entry) => ({ entry, score: scoreEntry(query, entry) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const second = ranked[1];
  const minScore = isSiteRelated(query) ? 3 : 5;

  if (!best || best.score < minScore) {
    return {
      kind: "unknown",
      intent,
      query,
      facts: [],
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  const chosen = [best.entry];
  if (
    second &&
    second.score >= 5 &&
    second.score >= best.score * 0.72 &&
    second.entry.id !== best.entry.id
  ) {
    chosen.push(second.entry);
  }

  const factLimit =
    intent === "yesno" ? (yesNoLead(query, seed) ? 1 : 2) : intent === "where" || intent === "how" ? 2 : 3;
  const facts = selectFacts(chosen, intent, alreadySaid(history), factLimit);

  if (facts.length === 0) {
    return {
      kind: "answer",
      intent,
      query,
      facts: [],
      link: best.entry.link ?? second?.entry.link,
      suggestions: best.entry.suggestions,
      lead: pick(
        [
          "I already shared what this site says on that. Ask a follow-up — partnering, sign-in, or another product.",
          "That’s the extent of the public notes on that topic. What else about NexusQ would you like?",
          "Covered from the site guide already. Try a related question from the chips below.",
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
    lead: intent === "yesno" ? yesNoLead(query, seed) : undefined,
  };
}

function stitch(facts: string[]) {
  return facts.filter(Boolean).join(" ");
}

export function composeSiteHelp(retrieved: RetrievedHelp, rawMessage: string, history: ChatTurn[] = []): HelpReply {
  const seed = seedFrom(rawMessage.trim(), history.length);

  if (retrieved.kind === "empty") {
    return {
      answer: pick(
        [
          "Ask anything about NexusQ Global, our products, or how to use this website.",
          "I can help with this site — products, partnering, or sign-in. What do you want to know?",
          "Fire away: NexusQ, AuditionQ, vision products, partnering, or navigating the site.",
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
          "Hi — I am the NexusQ site assistant. I only cover this website: who NexusQ is, which products are live or still vision, AuditionQ, partnering, and sign-in. What would you like to know?",
          "Hello. I can guide you around NexusQ Global — not general topics. Ask about AuditionQ, the ecosystem, or how to get in touch.",
          "Hey. I am here for questions about this NexusQ site. Try products, Live vs Vision, partnering, or signing in.",
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
          "Glad that helped. Ask another website question whenever you want.",
          "You are welcome. I can also explain partnering, sign-in, or which products are still vision.",
          "Anytime. If you want the next step — visiting AuditionQ or the partner form — just say so.",
        ],
        seed
      ),
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (retrieved.kind === "off_topic") {
    return {
      answer: pick(
        [
          "I only answer questions about the NexusQ Global website and products — not general topics. Try AuditionQ, vision platforms, partnering, or sign-in.",
          "That is outside what I cover. Stick to this site: NexusQ, AuditionQ, partnering, or how the pages work.",
          "I cannot help with that. Ask me about this website instead — for example whether AuditionQ is live.",
        ],
        seed
      ),
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (retrieved.kind === "unknown") {
    return {
      answer: pick(
        [
          "I can only help with this website, and I do not have that in the NexusQ guide. Try what NexusQ is, whether AuditionQ is live, how to partner, or how to sign in.",
          "That is not in my site notes. I can talk about the ecosystem, AuditionQ, partnering, or sign-in.",
          "I am not sure from the pages I know. Ask about a named product, Live vs Vision, or the partner form.",
        ],
        seed
      ),
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  const body = stitch(retrieved.facts);
  const lead = retrieved.lead;
  const answer = lead ? `${lead} ${body}` : body;

  return {
    answer: answer.trim(),
    link: retrieved.link,
    suggestions: retrieved.suggestions,
  };
}

export function answerSiteHelp(rawMessage: string, history: ChatTurn[] = []): HelpReply {
  return composeSiteHelp(retrieveSiteHelp(rawMessage, history), rawMessage, history);
}

export function knowledgeBriefing(retrieved: RetrievedHelp) {
  if (retrieved.kind !== "answer") return "";
  const lines = [...(retrieved.lead ? [retrieved.lead] : []), ...retrieved.facts];
  return lines.map((line, i) => `${i + 1}. ${line}`).join("\n");
}
