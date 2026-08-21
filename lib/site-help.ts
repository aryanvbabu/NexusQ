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
  topic?: string;
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
  "What is AuditionQ?",
  "How do I create an AuditionQ account?",
  "How do I switch Talent and Director?",
  "How do I partner with NexusQ?",
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
      "How do I create an AuditionQ account?",
      "How do I switch Talent and Director?",
      "What is project team collaboration?",
    ],
  },
  {
    id: "auditionq-account",
    title: "AuditionQ create account and sign in",
    keywords: [
      "create account",
      "get started",
      "register",
      "registration",
      "sign up auditionq",
      "auditionq account",
      "otp",
      "verify",
      "forgot password",
      "forgot my password",
      "reset password",
      "password",
      "sign in as",
      "google sign",
      "talent or director",
      "actor or casting",
    ],
    facts: [
      {
        text: "On AuditionQ (auditionq.com), click Get Started and choose Talent (Actor) or Director (Casting Director).",
        intents: ["how", "where"],
      },
      {
        text: "Complete registration with your email and phone, verify OTP codes, then follow onboarding to set up your profile.",
        intents: ["how"],
      },
      {
        text: "One email can later add the other profile and switch between Talent and Director without a second login.",
        intents: ["how", "yesno", "what"],
      },
      {
        text: "If you forgot your password, use Forgot Password on the AuditionQ login page, enter your email, and follow the reset link (check spam if needed).",
        intents: ["how", "where", "general"],
      },
      {
        text: "On login you can choose “Sign in as” Talent or Director when your account has both; your last session is selected by default. Google sign-in uses the same role choice.",
        intents: ["how", "what"],
      },
    ],
    link: {
      label: "Open AuditionQ",
      href: "https://www.auditionq.com/",
      external: true,
    },
    suggestions: [
      "Can one account be both Talent and Director?",
      "How do I switch Talent and Director?",
      "How do I complete my AuditionQ profile?",
    ],
  },
  {
    id: "auditionq-switch-roles",
    title: "AuditionQ Talent and Director modes",
    keywords: [
      "switch",
      "switching",
      "switch profile",
      "switch profiles",
      "talent mode",
      "director mode",
      "switch to talent",
      "switch to director",
      "talent to director",
      "director to talent",
      "talent and director",
      "director and talent",
      "add director",
      "add talent",
      "both talent and director",
      "dual role",
      "same account",
      "second profile",
      "change mode",
      "change role",
    ],
    facts: [
      {
        text: "On AuditionQ, Talent and Director are two modes on the same account — you switch between them without logging out or creating a second login.",
        intents: ["how", "what", "general"],
      },
      {
        text: "To switch from Talent to Director: open the account menu (your avatar in the top header) or the sidebar Switch control, then choose “Switch to Director.” You land on the Director dashboard and can publish casting calls, review applicants, and manage teams.",
        intents: ["how", "where"],
      },
      {
        text: "To switch from Director to Talent: use the same account menu or sidebar Switch control and choose “Switch to Talent.” You land on the Talent dashboard and can complete your profile, browse casting calls, and apply to roles.",
        intents: ["how", "where"],
      },
      {
        text: "If you only have one profile yet, choose “Add Director profile” or “Add Talent profile” from the account menu or sidebar, finish the short setup, then use Switch anytime.",
        intents: ["how", "yesno", "what"],
      },
      {
        text: "AuditionQ remembers the mode you used last and opens that workspace next time you sign in. On the login page you can also pick Talent or Director before signing in if both profiles exist.",
        intents: ["how", "what"],
      },
      {
        text: "Yes — one email can have both a Talent profile and a Director profile.",
        intents: ["yesno", "what"],
      },
      {
        text: "Applying to a casting call needs Talent mode (AuditionQ will prompt you to switch if you are in Director). Team invites and casting collaboration need Director mode.",
        intents: ["how", "why", "yesno"],
      },
    ],
    link: {
      label: "Continue on AuditionQ",
      href: "https://www.auditionq.com/",
      external: true,
    },
    suggestions: [
      "Can one account be both Talent and Director?",
      "How do I apply to a casting call?",
      "How do I publish a casting call?",
    ],
  },
  {
    id: "auditionq-talent",
    title: "AuditionQ for talent and actors",
    keywords: [
      "actor",
      "actress",
      "performer",
      "talent profile",
      "complete profile",
      "apply",
      "apply to",
      "application",
      "cannot apply",
      "can t apply",
      "cant apply",
      "why can t i apply",
      "photo upload",
      "photos",
      "primary photo",
      "match score",
      "see ratings",
      "collaborator notes",
    ],
    facts: [
      {
        text: "After signing in as Talent, complete your profile from the dashboard (Complete Profile or Profile settings): basic info, professional details, photos, and preferences.",
        intents: ["how", "where"],
      },
      {
        text: "A complete profile improves visibility and match scores with casting calls. Director/company profile is completed separately while in Director mode.",
        intents: ["what", "how"],
      },
      {
        text: "If you cannot apply, common reasons are: deadline passed, you are in Director mode, Talent profile incomplete, you already applied, or it is your own casting call. Switch to Talent with a primary photo, then try Apply again.",
        intents: ["why", "how", "yesno"],
      },
      {
        text: "Photo uploads support JPG, PNG, or WebP under 5 MB. If upload fails, try a smaller file, check your connection, refresh, or use Report a Problem in AuditionQ Help.",
        intents: ["how", "why", "what"],
      },
      {
        text: "Ratings, notes, and favourites from casting team collaborators are private to the project team — applicants are not notified and cannot see them.",
        intents: ["yesno", "what"],
      },
    ],
    link: {
      label: "Open AuditionQ",
      href: "https://www.auditionq.com/",
      external: true,
    },
    suggestions: [
      "How do I switch Talent and Director?",
      "Why can’t I apply to a casting call?",
      "What browsers does AuditionQ support?",
    ],
  },
  {
    id: "auditionq-director",
    title: "AuditionQ for casting directors",
    keywords: [
      "publish",
      "publish casting",
      "create casting",
      "new casting call",
      "draft",
      "stuck in draft",
      "review applications",
      "review applicants",
      "invite for audition",
      "reject applicant",
      "kyc",
      "director verification",
    ],
    facts: [
      {
        text: "As a Casting Director, go to Casting Calls, create a call, fill required details, save a draft, then Preview and Publish. KYC verification may be required before publishing.",
        intents: ["how", "where"],
      },
      {
        text: "If you are in Talent mode, switch to Director first. Casting Managers on a shared project can also publish when they have that permission.",
        intents: ["how", "what"],
      },
      {
        text: "Drafts stay unpublished until required fields pass validation — check a future deadline, required roles, and approved director verification.",
        intents: ["why", "how"],
      },
      {
        text: "Open a call from the dashboard or My Casting Calls to review applicants. Depending on permissions you can shortlist, move to Final List, reject, invite for audition, message talent, and update status.",
        intents: ["what"],
      },
    ],
    link: {
      label: "Open AuditionQ",
      href: "https://www.auditionq.com/",
      external: true,
    },
    suggestions: [
      "How do I invite collaborators?",
      "What do the team roles mean?",
      "Where do I find shared casting calls?",
    ],
  },
  {
    id: "auditionq-team",
    title: "AuditionQ project team collaboration",
    keywords: [
      "team",
      "collaboration",
      "collaborating",
      "collaborator",
      "invite",
      "invite collaborators",
      "invite team",
      "team invite",
      "workspace link",
      "whatsapp",
      "casting manager",
      "shortlist reviewer",
      "shortlist",
      "unlist",
      "final list",
      "viewer",
      "shared with me",
      "shared casting",
      "find shared",
      "collaborating on",
      "team tab",
      "team reviews",
      "team roles",
      "access request",
      "approve",
      "remove collaborator",
      "collaborator limit",
      "email mismatch",
      "join team",
      "cannot shortlist",
      "can t shortlist",
      "cant shortlist",
    ],
    facts: [
      {
        text: "Project owners can invite collaborators onto a casting call with roles: Casting Manager, Shortlist Reviewer, or Viewer.",
        intents: ["what", "list", "general"],
      },
      {
        text: "Invite from the casting call → Team tab → Add team member by email, WhatsApp, or a shareable workspace link. Email invites join when the matching account signs in.",
        intents: ["how"],
      },
      {
        text: "WhatsApp/share links for Shortlist Reviewer or Viewer join without approval; Casting Manager links need owner/manager approval. Email-mismatch joins become access requests instead of auto-join.",
        intents: ["how"],
      },
      {
        text: "By default Shortlist Reviewers cannot Short List, Invite for Audition, or message talent. Ask the owner or a Casting Manager to customize permissions or assign Casting Manager instead.",
        intents: ["why", "yesno"],
      },
      {
        text: "Casting Manager is near-owner access (edit/publish, manage team, casting actions). Shortlist Reviewer works Shortlist/Final List (move to Final List, reject, rate/note) but cannot Short List or Invite by default. Viewer is read-only on Shortlist and Final List.",
        intents: ["what", "list", "why"],
      },
      {
        text: "Shared projects appear under Shared with me in the Director sidebar and in My Casting Calls marked Shared.",
        intents: ["where"],
      },
      {
        text: "Owners and Casting Managers see Team reviews (average rating and collaborator notes) on the Team tab — private to the team, not shown to talent. Remove members from the Team tab; each plan has a collaborator seat limit.",
        intents: ["where"],
      },
    ],
    link: {
      label: "Open AuditionQ",
      href: "https://www.auditionq.com/",
      external: true,
    },
    suggestions: [
      "What do the team roles mean?",
      "How do I approve a team access request?",
      "I’m a Shortlist Reviewer — what can I see?",
    ],
  },
  {
    id: "auditionq-settings-support",
    title: "AuditionQ settings and support",
    keywords: [
      "update email",
      "update phone",
      "deactivate",
      "delete account",
      "account privacy",
      "supported browsers",
      "browsers",
      "browser",
      "chrome",
      "firefox",
      "safari",
      "edge",
      "page not loading",
      "not saving",
      "report a problem",
      "cache",
    ],
    facts: [
      {
        text: "Update email or phone in AuditionQ Settings; some changes need OTP. Contact details are shared across Talent and Director on the same account.",
        intents: ["how", "where"],
      },
      {
        text: "Under Settings → Account & Privacy you can deactivate temporarily or request permanent deletion (may need OTP). That applies to the whole account including both profiles.",
        intents: ["how", "where", "what"],
      },
      {
        text: "AuditionQ works best on the latest Chrome, Firefox, Safari, and Edge on desktop, tablet, and mobile with a stable connection for uploads and video.",
        intents: ["what", "list", "how"],
      },
      {
        text: "If a page will not load or save: refresh, check internet, clear cache, or try another browser. Persistent issues: Report a Problem from the AuditionQ Help button and describe what you were doing.",
        intents: ["how", "why"],
      },
    ],
    link: {
      label: "Open AuditionQ",
      href: "https://www.auditionq.com/",
      external: true,
    },
    suggestions: [
      "How do I create an AuditionQ account?",
      "I forgot my AuditionQ password",
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
  const qTokens = new Set(query.split(" ").filter((t) => t.length > 1));

  for (const keyword of entry.keywords) {
    const kw = normalize(keyword);
    if (!kw) continue;
    if (query.includes(kw)) {
      score += kw.includes(" ") ? 10 : 5;
      continue;
    }
    const kTokens = kw.split(" ").filter((t) => t.length > 1);
    if (kTokens.length > 1) {
      const overlap = kTokens.filter((t) => qTokens.has(t)).length;
      if (overlap === kTokens.length) score += 9;
      else if (overlap >= 2) score += 4;
    }
  }

  for (const word of normalize(entry.title).split(" ")) {
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
    } else if (entry.id === "auditionq-account") {
      // Keep password-reset copy for forgot/reset questions only.
      unused = unused.filter((f) => !/forgot your password/i.test(f.text));
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

  const switchTopic =
    best.entry.id === "auditionq-switch-roles" ||
    /\b(switch|switching).*\b(talent|director|profile|mode|role)\b|\b(talent|director).*\b(switch|profile)\b/.test(
      query
    );

  const factLimit = /\b(forgot|reset).*\bpassword\b|\bpassword\b.*\b(forgot|reset)\b/.test(
    query
  )
    ? 1
    : switchTopic
      ? 4
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

  // Yes/no lead (if any) + all facts
  if (lead) {
    return [lead, ...facts].join("\n\n").trim();
  }

  // First fact answers the question; remaining facts are the solution/steps
  const [first, ...rest] = facts;
  if (rest.length === 0) return first;

  if (intent === "how" || intent === "why") {
    return [first, rest.map((step, i) => `${i + 1}. ${step}`).join("\n")].join("\n\n");
  }

  return [first, ...rest].join("\n\n");
}

export function composeSiteHelp(retrieved: RetrievedHelp, rawMessage: string, history: ChatTurn[] = []): HelpReply {
  const seed = seedFrom(rawMessage.trim(), history.length);

  if (retrieved.kind === "empty") {
    return {
      answer: pick(
        [
          "Ask anything about NexusQ Global or AuditionQ — accounts, casting, teams, partnering, or sign-in.",
          "I can help with this site and AuditionQ. What do you want to know?",
          "Fire away: NexusQ, AuditionQ setup, vision products, partnering, or navigating the site.",
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
          "Hello. Ask about AuditionQ setup, the ecosystem, or how to get in touch.",
          "Hey. I’m here for NexusQ and AuditionQ questions — try products, Live vs Vision, partnering, or signing in.",
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
          "You’re welcome. I can also help with partnering, sign-in, or AuditionQ setup.",
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
          "I only answer NexusQ and AuditionQ questions — not general topics. Try accounts, casting, teams, partnering, or sign-in.",
          "That’s outside what I cover. Stick to NexusQ or AuditionQ.",
          "I can’t help with that. Ask about AuditionQ or this website instead — for example how to create an AuditionQ account.",
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
          "I don’t have that in the guide. Try AuditionQ accounts, Talent vs Director, casting teams, partnering, or NexusQ sign-in.",
          "That isn’t in my notes. Ask about AuditionQ how-tos, a named product, Live vs Vision, or the partner form.",
          "I’m not sure from the guide. Rephrase around AuditionQ setup, casting, teams, or NexusQ partnering.",
        ],
        seed
      ),
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

  let answer = formatAnswer(retrieved.intent, retrieved.facts, retrieved.lead);

  // Keep AuditionQ visit as a last nudge only — never the whole answer.
  if (
    retrieved.link?.external &&
    retrieved.link.href.includes("auditionq.com") &&
    retrieved.topic?.toLowerCase().includes("talent")
  ) {
    answer = `${answer}\n\nWhen you’re ready, open AuditionQ with the link below to try the switch.`;
  }

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
  const lines = [
    ...(retrieved.lead ? [`Direct answer: ${retrieved.lead}`] : []),
    "Answer the question simply with these facts (no filler phrases):",
    ...retrieved.facts.map((line, i) => `${i + 1}. ${line}`),
  ];
  return lines.join("\n");
}
