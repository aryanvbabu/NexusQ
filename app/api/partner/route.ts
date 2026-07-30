import { NextResponse } from "next/server";
import { Resend } from "resend";

const INTERESTS = new Set([
  "Partnership",
  "Client project",
  "Collaboration",
  "Investment / business",
  "Other",
]);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const interest = String(body.interest ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (interest && !INTERESTS.has(interest)) {
      return NextResponse.json({ error: "Invalid interest category." }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured yet. Please email admin@auditionq.com directly.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL || "NexusQ <onboarding@resend.dev>";
    const to = process.env.PARTNER_INQUIRY_TO || "admin@auditionq.com";

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `NexusQ partner inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Interest: ${interest || "—"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : "";
      const sandboxBlocked =
        message.includes("only send testing emails") ||
        message.includes("verify a domain");

      return NextResponse.json(
        {
          error: sandboxBlocked
            ? "Email provider is in test mode. Verify a Resend domain to deliver to admin@auditionq.com, or set PARTNER_INQUIRY_TO to your Resend account email for testing."
            : "Could not send your inquiry. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Inquiry received." }, { status: 200 });
  } catch (error) {
    console.error("Partner inquiry error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
