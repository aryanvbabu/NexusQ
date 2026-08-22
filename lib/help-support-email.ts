import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const recentByIp = new Map<string, number[]>();

export function isVisitorEmail(value: string) {
  return EMAIL_RE.test(value.trim().toLowerCase());
}

export function allowSupportEmail(ip: string) {
  const now = Date.now();
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recentByIp.set(ip, hits);
    return false;
  }
  hits.push(now);
  recentByIp.set(ip, hits);
  return true;
}

export type SupportEmailResult =
  | { ok: true }
  | { ok: false; error: string; sandbox?: boolean };

export async function sendSupportHandoffEmail(opts: {
  visitorEmail: string;
  question: string;
}): Promise<SupportEmailResult> {
  const visitorEmail = opts.visitorEmail.trim().toLowerCase();
  if (!isVisitorEmail(visitorEmail)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error:
        "Email delivery is not configured yet. Please email admin@auditionq.com directly.",
    };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || "NexusQ <onboarding@resend.dev>";
  const supportTo = process.env.PARTNER_INQUIRY_TO || "admin@auditionq.com";
  const question = opts.question.trim().slice(0, 500) || "(no question captured)";

  const visitor = await resend.emails.send({
    from,
    to: [visitorEmail],
    replyTo: supportTo,
    subject: "Want to reach NexusQ / AuditionQ customer support?",
    text: [
      "Hi,",
      "",
      "You asked our website assistant something it could not answer from the NexusQ / AuditionQ guide:",
      "",
      `"${question}"`,
      "",
      "Would you like to reach our customer support? Reply to this email and the team will help.",
      "You can also write to admin@auditionq.com.",
      "",
      "— NexusQ Assistant",
    ].join("\n"),
  });

  const team = await resend.emails.send({
    from,
    to: [supportTo],
    replyTo: visitorEmail,
    subject: `Help chat — visitor may want support (${visitorEmail})`,
    text: [
      "A visitor asked something outside the help-chat guide and shared their email for a support handoff.",
      "",
      `Visitor email: ${visitorEmail}`,
      "",
      "Unanswered question:",
      question,
      "",
      "They were emailed asking if they want to reach customer support. Reply to this message to continue with them.",
    ].join("\n"),
  });

  if (visitor.error) {
    console.error("Support handoff (visitor) Resend error:", visitor.error);
    const message =
      typeof visitor.error === "object" &&
      visitor.error &&
      "message" in visitor.error
        ? String((visitor.error as { message?: string }).message)
        : "";
    const sandboxBlocked =
      message.includes("only send testing emails") ||
      message.includes("verify a domain");

    if (!team.error) {
      return {
        ok: false,
        sandbox: sandboxBlocked,
        error: sandboxBlocked
          ? "I could not email that address from this test inbox. Please write to admin@auditionq.com — our team still received a copy of your question."
          : "I could not email you directly. Please write to admin@auditionq.com.",
      };
    }

    return {
      ok: false,
      sandbox: sandboxBlocked,
      error: sandboxBlocked
        ? "Email provider is in test mode. Please write to admin@auditionq.com."
        : "Could not send the support email. Please write to admin@auditionq.com.",
    };
  }

  if (team.error) {
    console.error("Support handoff (team) Resend error:", team.error);
  }

  return { ok: true };
}
