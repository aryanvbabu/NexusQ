/** Mirrors AuditionQ Help feedback categories (problem / suggestion / feedback). */
export type HelpFeedbackCategory = "problem" | "suggestion" | "feedback";

/** Quick prompts shown in Help bubble forms (problem / suggestion / feedback). */
export interface HelpTopicPrompt {
  id: string;
  label: string;
  /** Seed text inserted into the message box when selected. */
  prompt: string;
}

const SHARED_TEAM_PROMPTS: HelpTopicPrompt[] = [
  {
    id: 'team-invite',
    label: 'Team invite / join',
    prompt:
      'I’m having trouble with a team invite or joining a casting project. What I tried: … What I expected: …',
  },
  {
    id: 'team-access-request',
    label: 'Access request / approval',
    prompt:
      'I’m having trouble with a team access request or approval. Project name (if known): … What happened: …',
  },
  {
    id: 'team-permissions',
    label: 'Role permissions',
    prompt:
      'My collaborator role permissions don’t match what I expected (e.g. shortlist, Team tab, review-only). My role: … What I can/can’t do: …',
  },
  {
    id: 'collaborations',
    label: 'Shared with me',
    prompt:
      'I can’t find or open a shared casting call under Shared with me or My Casting Calls. Details: …',
  },
];

export const HELP_TOPIC_PROMPTS: Record<HelpFeedbackCategory, HelpTopicPrompt[]> = {
  problem: [
    {
      id: 'login-role',
      label: 'Sign-in / role',
      prompt:
        'I had a problem signing in or choosing Talent vs Director. What I selected: … What happened: …',
    },
    ...SHARED_TEAM_PROMPTS,
    {
      id: 'shortlist-actions',
      label: 'Shortlist / unlist',
      prompt:
        'Shortlist or unlist didn’t work as expected on a casting call. My role: … Applicant/role: … What I saw: …',
    },
    {
      id: 'other-problem',
      label: 'Something else',
      prompt: 'Describe the problem you encountered: …',
    },
  ],
  suggestion: [
    {
      id: 'team-roles',
      label: 'Team roles',
      prompt:
        'Suggestion about team roles or permissions (Casting Manager, Shortlist Reviewer, Viewer, etc.): …',
    },
    {
      id: 'invite-flow',
      label: 'Invites / links',
      prompt:
        'Suggestion to improve email, WhatsApp, or workspace-link invites: …',
    },
    {
      id: 'collaborator-reviews',
      label: 'Team reviews',
      prompt:
        'Suggestion about collaborator ratings, notes, favourites, or Team reviews: …',
    },
    {
      id: 'other-suggestion',
      label: 'Other idea',
      prompt: 'What would make AuditionQ better for you? …',
    },
  ],
  feedback: [
    {
      id: 'team-collab-experience',
      label: 'Team collaboration',
      prompt:
        'My experience inviting or working with collaborators on a casting call: …',
    },
    {
      id: 'review-workflow',
      label: 'Reviewing applicants',
      prompt:
        'My experience reviewing applicants as owner or collaborator: …',
    },
    {
      id: 'dual-role',
      label: 'Talent + Director',
      prompt:
        'My experience switching between Talent and Director on one account: …',
    },
    {
      id: 'general-feedback',
      label: 'General',
      prompt: 'Share your experience with AuditionQ: …',
    },
  ],
};
