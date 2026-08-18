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
};

const STARTER: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi — I can help with this NexusQ Global website only: who we are, which products are live or still vision, AuditionQ, partnering, and sign-in. What would you like to know?",
  suggestions: [
    "What is NexusQ Global?",
    "Is AuditionQ live?",
    "How do I partner with you?",
    "How do I sign in?",
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

  return (
    <div className="fixed bottom-5 right-4 z-[80] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open ? (
          <motion.section
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            aria-label="NexusQ site help chat"
            className="mb-3 flex h-[min(32rem,calc(100dvh-5.5rem))] w-[min(22.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-nq-border bg-nq-surface shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
          >
            <header className="flex items-center justify-between gap-3 border-b border-nq-border bg-nq-surface-elevated px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-400">
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-nq-text">NexusQ Assistant</p>
                  <p className="text-[11px] text-nq-muted">Website help only</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-nq-muted hover:bg-nq-accent-soft hover:text-nq-text"
                aria-label="Close help chat"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div
              ref={listRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.role === "user" ? "flex justify-end" : "flex justify-start"
                  }
                >
                  <div
                    className={
                      msg.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-cyan-500 px-3.5 py-2 text-sm leading-relaxed text-slate-950"
                        : "max-w-[90%] rounded-2xl rounded-bl-md border border-nq-border bg-nq-surface-elevated px-3.5 py-2 text-sm leading-relaxed text-nq-text"
                    }
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.role === "assistant" && msg.link ? (
                      msg.link.external ? (
                        <a
                          href={msg.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex text-xs font-medium text-cyan-400 hover:underline"
                        >
                          {msg.link.label} →
                        </a>
                      ) : (
                        <Link
                          href={msg.link.href}
                          className="mt-2 inline-flex text-xs font-medium text-cyan-400 hover:underline"
                          onClick={() => setOpen(false)}
                        >
                          {msg.link.label} →
                        </Link>
                      )
                    ) : null}
                  </div>
                </div>
              ))}

              {loading ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-nq-border bg-nq-surface-elevated px-3.5 py-2 text-xs text-nq-muted">
                    Thinking…
                  </div>
                </div>
              ) : null}
            </div>

            {!loading && lastAssistant?.suggestions?.length ? (
              <div className="flex flex-wrap gap-1.5 border-t border-nq-border px-3 py-2">
                {lastAssistant.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void send(suggestion)}
                    className="rounded-full border border-nq-border bg-nq-surface-elevated px-2.5 py-1 text-[11px] text-nq-muted hover:border-cyan-400/40 hover:text-nq-text"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-nq-border px-3 py-2.5"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Ask about this website…"
                aria-label="Ask about this website"
                className="min-w-0 flex-1 rounded-xl border border-nq-border bg-nq-bg px-3 py-2 text-sm text-nq-text outline-none placeholder:text-nq-muted focus:border-cyan-400/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-slate-950 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          aria-label="Open NexusQ help chat"
          className="ml-auto flex items-center gap-2 rounded-full bg-cyan-500 px-3 py-2.5 text-xs font-semibold text-slate-950 shadow-lg transition hover:bg-cyan-400 active:scale-95 sm:px-4 sm:py-3 sm:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <MessageCircle className="h-4 w-4" aria-hidden />
          Help
        </button>
      ) : null}
    </div>
  );
}
