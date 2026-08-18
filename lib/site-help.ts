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

type KnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  link?: HelpLink;
  suggestions: string[];
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
  "platform",
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
    answer:
      "NexusQ Global is a product-first parent company that designs and ships focused digital platforms. This website is the company home: it introduces the ecosystem, shows which products are live versus still in vision, and offers a way to partner with the team. We are not a single-app company — AuditionQ is the live flagship, and other named platforms are labelled honestly until they ship.",
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
    answer:
      "Use the top navigation to jump around. Home introduces NexusQ. Platforms lists every product with Live, Vision, or Exploration labels. AuditionQ is the live flagship section, with a link to auditionq.com. You can also click the homepage casting video box to open AuditionQ. Future covers AI agents, global expansion, and future platforms — none of those are launched. Partner opens a form for business inquiries. You can also Sign In from the navbar, switch light/dark theme, or tap Guide me in the menu for a short spotlight walkthrough of the homepage.",
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
    ],
    answer:
      "AuditionQ is NexusQ Global’s live flagship product — a modern, AI-powered platform that connects talent with opportunities through an audition and interview experience. It is available today at https://www.auditionq.com/. On the homepage, click the casting video box (Live audition / AuditionQ) to open that site. AuditionQ is a distinct product; NexusQ Global remains the parent company. It is the only platform on this site marked Live.",
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
      "what do you build",
      "product list",
    ],
    answer:
      "The NexusQ ecosystem currently includes: AuditionQ (Live), FurSure (Vision), RideQ (Vision), CaringMinds (Vision), Onakkodi (Vision), and Future AI (Exploration). Only AuditionQ is available today. Vision and exploration products have no download, store, or “launch app” buttons until they actually ship.",
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
    answer:
      "Live means the product is publicly available now — that is only AuditionQ. Vision means a named direction or early concept that is not launched and is not offered as a service. Exploration (Future AI) is research and experimentation, not a shipped product. We label status clearly and do not invent launch dates, store links, or fake metrics.",
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
    answer:
      "FurSure is a vision product in the NexusQ ecosystem. Details will be shared when it moves beyond exploration. It is not launched and is not available to download or use yet.",
    link: { label: "See platforms", href: "/#platforms" },
    suggestions: ["What else is in vision?", "Is AuditionQ live?"],
  },
  {
    id: "rideq",
    title: "RideQ",
    keywords: ["rideq", "ride q", "mobility", "car", "transport"],
    answer:
      "RideQ is a vision product focused on future mobility experiences. It is in early concept and is not launched.",
    link: { label: "See platforms", href: "/#platforms" },
    suggestions: ["What is CaringMinds?", "How do I partner?"],
  },
  {
    id: "caringminds",
    title: "CaringMinds",
    keywords: ["caringminds", "caring minds", "wellbeing", "well being", "care", "health"],
    answer:
      "CaringMinds is a vision product exploring digital tools for wellbeing and care. It is presented as direction, not a live service.",
    link: { label: "See platforms", href: "/#platforms" },
    suggestions: ["What is Onakkodi?", "Is AuditionQ live?"],
  },
  {
    id: "onakkodi",
    title: "Onakkodi",
    keywords: ["onakkodi", "onak kodi", "apparel", "fashion", "clothing"],
    answer:
      "Onakkodi is a vision product under the NexusQ umbrella. Status is concept / early development — it is not available yet.",
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
    answer:
      "Future AI is ongoing exploration into AI capabilities and future platforms. It is experimentation only — not a shipped product. The Future section of this site also mentions AI agents, global expansion, and future platforms; those are directions we are exploring, and every future product will be introduced only when it is ready.",
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
    answer:
      "We welcome partnerships, client work, collaboration, investment/business conversations, and other legitimate inquiries. Open the Partner page, fill in your name, email, optional company, interest type, and a message. The team reads every submission. You can also email admin@auditionq.com.",
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
    answer:
      "The contact address published on this site is admin@auditionq.com. For partnerships and business inquiries, the Partner form at /partner is the preferred path. We do not publish a street address or phone number on this website.",
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
    answer:
      "Use Sign In in the navbar to open /login. You can create an account with name, email, and password, or sign in if you already have one. After you sign in, the navbar shows your name and a Sign Out option. This account is for the NexusQ Global website — it is not an AuditionQ product login. There is no Settings page on this site.",
    link: { label: "Go to Sign In", href: "/login" },
    suggestions: ["What data do you store?", "How do I partner?"],
  },
  {
    id: "privacy",
    title: "Privacy",
    keywords: ["privacy", "data", "personal information", "cookies", "gdpr"],
    answer:
      "The Privacy page is a placeholder pending final legal review — it is not lawyer-reviewed legal advice. It currently says: if you submit the partner form we collect name, email, company, interest, and message; if you create an account we store name, email, and a hashed password. Partner inquiries are used to respond to you; account data is used to sign you in. Privacy questions: admin@auditionq.com.",
    link: { label: "Read Privacy", href: "/privacy" },
    suggestions: ["Where are the Terms?", "How do I sign in?"],
  },
  {
    id: "terms",
    title: "Terms of use",
    keywords: ["terms", "legal", "conditions", "warranty"],
    answer:
      "The Terms page is a placeholder pending final legal review. By using the site you agree to those placeholder terms. AuditionQ is described as live; other named platforms may be vision or exploration and are not offered as available services unless explicitly stated. Site content is for general information and we do not guarantee completeness or uninterrupted availability.",
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
    answer:
      "NexusQ does not publish fabricated metrics, testimonials, or customer logos on this website. Trust is meant to come from shipped work (AuditionQ is live) and clear communication about vision versus live status. We are open to partnership and serious business inquiries.",
    link: { label: "See Trust", href: "/#trust" },
    suggestions: ["Is AuditionQ live?", "How do I partner?"],
  },
  {
    id: "theme",
    title: "Light and dark theme",
    keywords: ["theme", "dark mode", "light mode", "appearance", "toggle"],
    answer:
      "The navbar includes a theme toggle so you can switch between dark (the default look) and light mode. The same pages and product labels stay available in both themes.",
    suggestions: ["How do I navigate the site?", "How do I sign in?"],
  },
  {
    id: "vision-company",
    title: "Why NexusQ exists",
    keywords: ["why", "vision", "pillars", "craft", "mission", "about us"],
    answer:
      "NexusQ exists to build and steward an ecosystem of focused digital products — not a single app. We ship what is real (AuditionQ is live today) and keep vision products clearly labelled until they are ready. We prioritize clarity, usefulness, and long-term product quality over hype.",
    link: { label: "Read why we exist", href: "/#about" },
    suggestions: ["What products exist?", "How do I partner?"],
  },
];

const GREETING = /^(hi|hello|hey|yo|hiya|good (morning|afternoon|evening)|howdy)\b/i;
const THANKS = /^(thanks|thank you|thx|cheers|great|awesome|perfect|got it|ok|okay)\b/i;

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9@.#+\s]/g, " ").replace(/\s+/g, " ").trim();
}

function isOffTopic(query: string) {
  const onSite = SITE_TERMS.some((term) => query.includes(term));
  if (onSite) return false;
  return OFF_TOPIC.some((term) => query.includes(term));
}

function isSiteRelated(query: string) {
  return SITE_TERMS.some((term) => query.includes(term));
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
    /^(and |what about|how about|is it|is that|can i|where|how|why|that|this|them|those|it |the |also)\b/i.test(
      trimmed
    );

  if (!followUp) return trimmed;

  const lastUser = [...history].reverse().find((t) => t.role === "user");
  const lastAssistant = [...history].reverse().find((t) => t.role === "assistant");
  return [lastUser?.content, lastAssistant?.content.slice(0, 180), trimmed]
    .filter(Boolean)
    .join(" ");
}

export function answerSiteHelp(
  rawMessage: string,
  history: ChatTurn[] = []
): HelpReply {
  const message = rawMessage.trim();

  if (!message) {
    return {
      answer: "Ask a question about NexusQ Global, our products, or how to use this website.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (GREETING.test(message) && message.split(/\s+/).length <= 6) {
    return {
      answer:
        "Hello — I am the NexusQ site assistant. I can help with this website only: who NexusQ is, which products are live or still vision, AuditionQ, partnering, sign-in, and privacy/terms. What would you like to know?",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (THANKS.test(message) && message.split(/\s+/).length <= 8) {
    return {
      answer:
        "Glad that helped. If you have another question about this website or our products, ask away.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  const query = normalize(expandWithHistory(message, history));

  if (isOffTopic(query) && !isSiteRelated(query)) {
    return {
      answer:
        "I only answer questions about the NexusQ Global website and products. I cannot help with general topics. Try asking about AuditionQ, our vision platforms, partnering, or how to sign in.",
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
      answer:
        "I can only help with this website. I do not have that in the NexusQ site guide. Try asking what NexusQ is, whether AuditionQ is live, how to partner, or how to sign in.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  let answer = best.entry.answer;
  let link = best.entry.link;
  const suggestions = best.entry.suggestions;

  if (second && second.score >= 5 && second.score >= best.score * 0.72 && second.entry.id !== best.entry.id) {
    answer = `${best.entry.answer}\n\n${second.entry.answer}`;
    if (!link) link = second.entry.link;
  }

  return { answer, link, suggestions };
}
