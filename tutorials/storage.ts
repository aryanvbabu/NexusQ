import {
  COMPLETION_KEYS,
  EMPTY_COMPLETION,
  type CompletionState,
} from "./types";

const STORAGE_PREFIX = "nq_onboarding_v1";

function storageKey(userKey?: string | null) {
  return userKey ? `${STORAGE_PREFIX}:${userKey}` : STORAGE_PREFIX;
}

export function readCompletion(userKey?: string | null): CompletionState {
  if (typeof window === "undefined") return { ...EMPTY_COMPLETION };
  try {
    const raw = window.localStorage.getItem(storageKey(userKey));
    if (!raw) return { ...EMPTY_COMPLETION };
    const parsed = JSON.parse(raw) as Partial<CompletionState>;
    const next = { ...EMPTY_COMPLETION };
    for (const key of COMPLETION_KEYS) {
      next[key] = Boolean(parsed[key]);
    }
    return next;
  } catch {
    return { ...EMPTY_COMPLETION };
  }
}

export function writeCompletion(
  state: CompletionState,
  userKey?: string | null
) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(userKey), JSON.stringify(state));
}

export function markCompleted(
  key: keyof CompletionState,
  userKey?: string | null
): CompletionState {
  const next = { ...readCompletion(userKey), [key]: true };
  writeCompletion(next, userKey);
  return next;
}

export function resetCompletion(userKey?: string | null): CompletionState {
  const empty = { ...EMPTY_COMPLETION };
  writeCompletion(empty, userKey);
  return empty;
}
