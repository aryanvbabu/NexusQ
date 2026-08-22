"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

type HelpLink = {
  label: string;
  href: string;
  external?: boolean;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  link?: HelpLink;
  suggestions?: string[];
  collectEmail?: boolean;
};

const STARTER: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi — I can help with NexusQ and AuditionQ: accounts, Talent vs Director, casting & teams, partnering, and this website. What would you like to know?",
  suggestions: [
    "What is AuditionQ?",
    "How do I create an account as an Actor or Casting Director?",
    "How do I switch from Talent to Director (or Director to Talent)?",
    "How do I partner with you?",
  ],
};

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function SiteHelpChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([STARTER]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || loading) return;

    const userMessage: ChatMessage = {
      id: nextId(),
      role: "user",
      content: message,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const history = nextMessages
        .filter((m) => m.id !== "welcome")
        .slice(0, -1)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/help-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            content: data.error || "Something went wrong. Please try again.",
            suggestions: STARTER.suggestions,
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          content: data.answer,
          link: data.link,
          suggestions: data.suggestions,
          collectEmail: Boolean(data.collectEmail),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          content: "Network error. Please try again.",
          suggestions: STARTER.suggestions,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const collectingEmail = Boolean(lastAssistant?.collectEmail);

  return (
    <div className="fixed bottom-5 right-4 z-[80] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open ? (
          <motion.section
            key="panel"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-label="NexusQ site help chat"
            className="mb-3 flex h-[min(34rem,calc(100dvh-5.5rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.35rem] border border-cyan-400/20 bg-nq-surface shadow-[0_24px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(34,211,238,0.08)]"
          >
            <header className="relative overflow-hidden border-b border-cyan-400/15 px-4 py-3.5">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.16) 0%, rgba(15,23,42,0.2) 45%, transparent 100%)",
                }}
              />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                    <Sparkles className="h-4.5 w-4.5 h-4 w-4" aria-hidden />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-nq-surface bg-emerald-400" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold tracking-tight text-nq-text">
                      NexusQ Assistant
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-nq-muted">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      Online · NexusQ & AuditionQ
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-nq-muted transition hover:bg-white/5 hover:text-nq-text"
                  aria-label="Close help chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div
              ref={listRef}
              className="min-h-0 flex-1 space-y-3.5 overflow-y-auto px-3.5 py-4"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(34,211,238,0.06), transparent 60%)",
              }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    msg.role === "user" ? "flex justify-end" : "flex justify-start"
                  }
                >
                  <div
                    className={
                      msg.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-cyan-400 to-cyan-500 px-3.5 py-2.5 text-sm leading-relaxed text-slate-950 shadow-[0_8px_24px_rgba(34,211,238,0.28)]"
                        : "max-w-[90%] rounded-2xl rounded-bl-md border border-nq-border/80 bg-nq-surface-elevated/95 px-3.5 py-2.5 text-sm leading-relaxed text-nq-text shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-sm"
                    }
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.role === "assistant" && msg.link ? (
                      msg.link.external || msg.link.href.startsWith("mailto:") ? (
                        <a
                          href={msg.link.href}
                          target={msg.link.external ? "_blank" : undefined}
                          rel={msg.link.external ? "noopener noreferrer" : undefined}
                          className="mt-2.5 inline-flex items-center rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/25 transition hover:bg-cyan-500/20"
                        >
                          {msg.link.label} →
                        </a>
                      ) : (
                        <Link
                          href={msg.link.href}
                          className="mt-2.5 inline-flex items-center rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/25 transition hover:bg-cyan-500/20"
                          onClick={() => setOpen(false)}
                        >
                          {msg.link.label} →
                        </Link>
                      )
                    ) : null}
                  </div>
                </motion.div>
              ))}

              {loading ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-nq-border/80 bg-nq-surface-elevated px-3.5 py-3 shadow-sm">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]" />
                  </div>
                </div>
              ) : null}
            </div>

            {!loading && lastAssistant?.suggestions?.length ? (
              <div className="flex flex-wrap gap-1.5 border-t border-nq-border/70 bg-nq-surface-elevated/40 px-3.5 py-2.5">
                {lastAssistant.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void send(suggestion)}
                    className="rounded-full border border-nq-border bg-nq-bg/80 px-2.5 py-1 text-[11px] text-nq-muted transition hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-nq-border/80 bg-nq-surface-elevated/60 px-3.5 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder={collectingEmail ? "Your email address…" : "Ask about NexusQ or AuditionQ…"}
                aria-label={collectingEmail ? "Your email address" : "Ask your question"}
                inputMode={collectingEmail ? "email" : "text"}
                autoComplete={collectingEmail ? "email" : "off"}
                className="min-w-0 flex-1 rounded-xl border border-nq-border bg-nq-bg px-3.5 py-2.5 text-sm text-nq-text outline-none placeholder:text-nq-muted transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 text-slate-950 shadow-[0_8px_20px_rgba(34,211,238,0.35)] transition hover:from-cyan-300 hover:to-cyan-400 disabled:opacity-40 disabled:shadow-none"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {!open ? (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          aria-label="Open NexusQ help chat"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="ml-auto flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_36px_rgba(34,211,238,0.4)] ring-1 ring-white/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <MessageCircle className="h-4 w-4" aria-hidden />
          Help
        </motion.button>
      ) : null}
    </div>
  );
}
