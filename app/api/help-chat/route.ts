import { NextResponse } from "next/server";
import { answerSiteHelp, type ChatTurn } from "@/lib/site-help";

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

    const reply = answerSiteHelp(message, asHistory(body.history));
    return NextResponse.json(reply);
  } catch {
    return NextResponse.json(
      { error: "Could not answer right now. Please try again." },
      { status: 500 }
    );
  }
}
