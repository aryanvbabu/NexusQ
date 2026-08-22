import { NextResponse } from "next/server";
import {
  composeSiteHelp,
  retrieveSiteHelp,
  type ChatTurn,
} from "@/lib/site-help";
import { paraphraseSiteHelp } from "@/lib/site-help-paraphrase";
import {
  allowSupportEmail,
  sendSupportHandoffEmail,
} from "@/lib/help-support-email";

const MAX_MESSAGE = 500;
const MAX_HISTORY = 8;

function asHistory(value: unknown): ChatTurn[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(-MAX_HISTORY)
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const role = "role" in item ? String(item.role) : "";
      const content = "content" in item ? String(item.content) : "";
      if ((role !== "user" && role !== "assistant") || !content.trim()) return [];
      return [
        {
          role,
          content: content.trim().slice(0, MAX_MESSAGE),
        } satisfies ChatTurn,
      ];
    });
}

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body.message ?? "").trim();

    if (!message) {
      return NextResponse.json(
        { error: "Please type a question about this website." },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE) {
      return NextResponse.json(
        { error: "Please keep questions under 500 characters." },
        { status: 400 }
      );
    }

    const history = asHistory(body.history);
    const retrieved = retrieveSiteHelp(message, history);
    let reply = composeSiteHelp(retrieved, message, history);

    if (retrieved.kind === "support_send" && retrieved.visitorEmail) {
      const ip = clientIp(req);
      if (!allowSupportEmail(ip)) {
        reply = {
          answer:
            "I can only send a few support notes per hour from here. Please email admin@auditionq.com and our team will help.",
          link: { label: "Email support", href: "mailto:admin@auditionq.com" },
          suggestions: reply.suggestions,
        };
      } else {
        const sent = await sendSupportHandoffEmail({
          visitorEmail: retrieved.visitorEmail,
          question: retrieved.unansweredQuestion || message,
        });
        if (!sent.ok) {
          reply = {
            answer: sent.error,
            link: { label: "Email support", href: "mailto:admin@auditionq.com" },
            suggestions: reply.suggestions,
          };
        }
      }
    } else if (retrieved.kind === "answer") {
      reply = await paraphraseSiteHelp(message, history, retrieved, reply);
    }

    return NextResponse.json(reply);
  } catch {
    return NextResponse.json(
      { error: "Could not answer right now. Please try again." },
      { status: 500 }
    );
  }
}
