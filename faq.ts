export type FaqAudience = 'all' | 'artist' | 'director';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  audience: FaqAudience;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what-is-auditionq',
    question: 'What is AuditionQ?',
    answer:
      'AuditionQ is a modern casting platform that connects actors and performers with casting directors and production companies. Actors can discover casting calls, build profiles, and apply to roles. Casting directors can publish calls, search talent, manage applications, and invite collaborators to help review and cast a project.',
    audience: 'all',
  },
  {
    id: 'create-account',
    question: 'How do I create an account as an Actor or Casting Director?',
    answer:
      'From the homepage, click Get Started and choose Talent (Actor) or Director (Casting Director). Complete registration with your email and phone, verify OTP codes, and follow the onboarding steps to set up your profile. Later you can add the other profile on the same account and switch between Talent and Director modes without creating a second login.',
    audience: 'all',
  },
  {
    id: 'switch-talent-director',
    question: 'How do I switch from Talent to Director (or Director to Talent)?',
    answer:
      'You do not need to log out. Open your account menu in the top header (avatar) — it shows whether you are in Talent mode or Director mode. Choose “Switch to Director” or “Switch to Talent.” You can also use the same Switch control in the sidebar menu on your dashboard. After switching, you land on that mode’s dashboard and can use its features. When you sign in next time, AuditionQ opens in the mode you used last. On the login page you can also choose Talent or Director before signing in if your account has both profiles.',
    audience: 'all',
  },
  {
    id: 'add-second-profile',
    question: 'Can one account be both Talent and Casting Director?',
    answer:
      'Yes. One email can have both a Talent profile and a Director profile. If you only have one, open the account menu or sidebar and choose “Add Director profile” or “Add Talent profile.” Confirm when prompted — this keeps the same login. You may be asked to complete a short profile setup. After that, use Switch to move between modes anytime.',
    audience: 'all',
  },
  {
    id: 'login-choose-role',
    question: 'How do I sign in as Director if I last used Talent (or the other way around)?',
    answer:
      'On the login page, after you enter your email (or if AuditionQ remembers your last session), you will see “Sign in as” with Talent and/or Director. Your last session is selected by default. Choose the other role if you want to open that workspace immediately, then continue with email/password or Google. Google sign-in uses the same role choice.',
    audience: 'all',
  },
  {
    id: 'switch-to-apply',
    question: 'I’m in Director mode — how do I apply to a casting call?',
    answer:
      'Applications require Talent mode. Open the casting call and start Apply — AuditionQ will prompt you to switch to Talent (or add a Talent profile if you do not have one yet). After switching, continue the application. You cannot apply to a casting call that you own as a director.',
    audience: 'all',
  },
  {
    id: 'switch-for-team-invite',
    question: 'I was invited to a casting team but I’m only registered as Talent — what do I do?',
    answer:
      'Team collaboration uses Director mode. Open the invite link from your email or WhatsApp (or tap Join team on the in-app invitation notification). AuditionQ will ask you to add a Director profile or switch to Director, then continue joining the team. Use the same email that received the invite when possible. You can switch back to Talent afterward anytime.',
    audience: 'all',
  },
  {
    id: 'what-is-team-collaboration',
    question: 'What is project team collaboration?',
    answer:
      'Project owners can invite other people onto a casting call as collaborators. Each person gets a workspace role (Casting Manager, Shortlist Reviewer, or Viewer) with permissions for managing the project, reviewing shortlisted talent, or view-only access. Collaborators open shared projects from Shared with me in the Director sidebar, and they also appear in My Casting Calls marked as Shared.',
    audience: 'all',
  },
  {
    id: 'forgot-password',
    question: 'I forgot my password — what do I do?',
    answer:
      'On the login page, click Forgot Password, enter your registered email, and follow the reset link sent to your inbox. If you do not see the email, check your spam folder.',
    audience: 'all',
  },
  {
    id: 'complete-profile',
    question: 'How do I complete my profile?',
    answer:
      'After signing in as an Actor, go to your dashboard and follow Complete Profile or visit Profile settings. Add basic info, professional details, photos, and preferences. A complete profile improves your visibility and match scores with casting calls. If you also use Director mode, complete your director/company profile separately while switched to Director.',
    audience: 'artist',
  },
  {
    id: 'cannot-apply',
    question: "Why can't I apply to a casting call?",
    answer:
      'Common reasons: the deadline has passed, you are currently in Director mode (switch to Talent first), your Talent profile is incomplete, you have already applied, or this is your own casting call. Ensure you are in Talent mode with a primary photo, then try Apply again.',
    audience: 'artist',
  },
  {
    id: 'photo-upload',
    question: "My photos won't upload — what formats and sizes are supported?",
    answer:
      'Use JPG, PNG, or WebP images under 5 MB. If upload fails, try a smaller file, check your connection, and refresh the page. Contact us via Report a Problem if the issue continues.',
    audience: 'artist',
  },
  {
    id: 'talent-see-team-reviews',
    question: 'Can talent see collaborator ratings or notes on my application?',
    answer:
      'No. Ratings, notes, and favourites left by casting team collaborators are private to the project team. Applicants are not notified and cannot see those private team reviews on their application.',
    audience: 'artist',
  },
  {
    id: 'publish-casting',
    question: 'How do I publish a casting call?',
    answer:
      'As a Casting Director, go to Casting Calls and create a new call. Fill in required details, save your draft, then use Preview and Publish. KYC verification may be required before publishing. If you are signed in as Talent, switch to Director mode first from the account menu or sidebar. Casting Managers on a shared project can also publish when they have that permission.',
    audience: 'director',
  },
  {
    id: 'stuck-draft',
    question: 'Why is my casting call stuck in draft?',
    answer:
      'Draft calls stay unpublished until you complete required fields and pass validation. Check that your deadline is in the future, required roles are filled in, and your director verification is approved.',
    audience: 'director',
  },
  {
    id: 'review-applications',
    question: 'How do I review applications?',
    answer:
      'Open your casting call from the dashboard, My Casting Calls, or Shared with me to view applicants. Depending on your role permissions, you can shortlist, move to Final List, reject, invite for audition, message talent, and update status. Shortlist Reviewers see Shortlist and Final List, can move shortlisted talent to Final List and reject, and leave ratings/notes — but cannot Short List or Invite unless those permissions were customized.',
    audience: 'director',
  },
  {
    id: 'invite-team-members',
    question: 'How do I invite collaborators to my casting call?',
    answer:
      'Open the casting call → Team tab → Add team member. Choose a role (Casting Manager, Shortlist Reviewer, or Viewer), optionally customize permissions, then invite by email, WhatsApp, or a shareable workspace link. Email invites join immediately when the person signs in with the matching email. WhatsApp/share links for Shortlist Reviewer or Viewer join without approval; Casting Manager WhatsApp/share links need your approval.',
    audience: 'director',
  },
  {
    id: 'team-roles-explained',
    question: 'What do the team roles mean?',
    answer:
      'Casting Manager is near-owner access: edit/publish the call, manage the team, and run casting actions (shortlist, Final List, reject, invite, message). Shortlist Reviewer sees Shortlist and Final List, can move talent to Final List, reject, and rate/note. Viewer sees Shortlist and Final List read-only. The project owner always has full access.',
    audience: 'director',
  },
  {
    id: 'workspace-link-vs-email',
    question: 'What’s the difference between an email invite and a workspace link?',
    answer:
      'An email invite is for a specific person. When they open the link with the matching account email, they join immediately (after Director mode is available). A WhatsApp or workspace share link is role-scoped: Shortlist Reviewer and Viewer can join without further approval; Casting Manager links create an access request that you (or a Casting Manager) must approve. You can revoke a workspace link anytime so new people cannot use it.',
    audience: 'director',
  },
  {
    id: 'approve-team-requests',
    question: 'How do I approve someone who requested team access?',
    answer:
      'You will get an email and in-app notification when someone requests access (for example via a Casting Manager WhatsApp/share link or an email-mismatch request). Open the casting call Team tab, the Action required widget on your Director dashboard, or Director → Team requests to approve or deny. You can change their role before approving. Casting Managers on that project can also approve requests.',
    audience: 'director',
  },
  {
    id: 'find-shared-projects',
    question: 'Where do I find casting calls I’m collaborating on?',
    answer:
      'In Director mode, open Shared with me in the sidebar, or look under My Casting Calls where shared projects are marked Shared. They also appear on your Director dashboard with a shared-project indicator. Your access and destination depend on your role permissions for that call.',
    audience: 'director',
  },
  {
    id: 'shortlist-reviewer-cannot-shortlist',
    question: 'I’m a Shortlist Reviewer — why can’t I shortlist or unlist applicants?',
    answer:
      'By default, Shortlist Reviewers see Shortlist and Final List applicants, can move shortlisted talent to Final List, reject, and leave private ratings and notes — but they cannot Short List, Invite for Audition, or message talent. If you need those actions, ask the project owner or a Casting Manager to customize your role permissions or assign Casting Manager instead.',
    audience: 'director',
  },
  {
    id: 'shortlist-reviewer-view',
    question: 'I’m a Shortlist Reviewer — what can I see?',
    answer:
      'You open the casting call view and see Shortlist and Final List applicants. You can move shortlisted talent to Final List, reject, and rate/note (unless you are a Viewer). All / Under Review / Auditions are hidden. If nothing is shortlisted yet, you will see an empty state until the casting team shortlists candidates.',
    audience: 'director',
  },
  {
    id: 'team-reviews-summary',
    question: 'Where do I see ratings and notes from my collaborators?',
    answer:
      'As the owner or a Casting Manager, open the casting call → Team tab to see Team reviews: one overall average rating per applicant and each collaborator’s notes. These reviews stay private to the team and are not shown to talent.',
    audience: 'director',
  },
  {
    id: 'remove-collaborator',
    question: 'How do I remove someone from my casting team?',
    answer:
      'Open the casting call → Team tab, find the member, and remove them. They lose access immediately and the project disappears from Shared with me and My Casting Calls. Removed members free a seat toward your collaborator limit so you can invite someone else.',
    audience: 'director',
  },
  {
    id: 'collaborator-limit',
    question: 'Why can’t I invite more collaborators?',
    answer:
      'Each subscription tier has a collaborator limit per casting call (active members and pending invites count). Free/Basic plans typically allow fewer seats than Silver or Gold. If you hit the limit, remove a member or upgrade your plan. The error message shows your current limit and upgrade hint.',
    audience: 'director',
  },
  {
    id: 'email-mismatch-invite',
    question: 'I opened a team invite but I’m signed in with a different email — what happens?',
    answer:
      'AuditionQ will not auto-join you to the project. You can request access anyway; the project owner (or a Casting Manager) reviews the request and can approve or deny it. For the fastest join, sign in with the email that received the invite.',
    audience: 'director',
  },
  {
    id: 'update-contact',
    question: 'How do I update my email or phone?',
    answer:
      'Go to Settings and update your account details. Some changes may require verification via OTP for security. Email and phone are shared across Talent and Director modes on the same account.',
    audience: 'all',
  },
  {
    id: 'deactivate-account',
    question: 'How do I deactivate or delete my account?',
    answer:
      'In Settings under Account & Privacy, you can deactivate your account temporarily or request permanent deletion. Deletion may require OTP confirmation. This applies to the whole account (both Talent and Director profiles if you have them).',
    audience: 'all',
  },
  {
    id: 'supported-browsers',
    question: 'Which browsers and devices are supported?',
    answer:
      'AuditionQ works best on the latest versions of Chrome, Firefox, Safari, and Edge on desktop, tablet, and mobile. Use a stable internet connection for uploads and video features.',
    audience: 'all',
  },
  {
    id: 'page-not-loading',
    question: "The page isn't loading or saving — what should I try first?",
    answer:
      'Refresh the page, check your internet connection, clear your browser cache, or try another browser. If the problem persists, use Report a Problem from the Help button and include what you were doing when it failed (for example inviting a teammate, approving a request, or reviewing applicants).',
    audience: 'all',
  },
];

export type FaqTab = 'all' | 'artist' | 'director';

export function filterFaqByTab(items: FaqItem[], tab: FaqTab): FaqItem[] {
  if (tab === 'all') return items;
  return items.filter((item) => item.audience === 'all' || item.audience === tab);
}

export function defaultFaqTab(userType?: string | null): FaqTab {
  if (userType === 'artist') return 'artist';
  if (userType === 'director') return 'director';
  return 'all';
}
