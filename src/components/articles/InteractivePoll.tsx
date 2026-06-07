"use client";

import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";

interface InteractivePollProps {
  question: string;
  options: string[];
  pollId: string;
}

export function InteractivePoll({ question, options, pollId }: InteractivePollProps) {
  const storageKey = `poll-${pollId}`;
  const [voted, setVoted] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const v = localStorage.getItem(storageKey);
      return v ? parseInt(v, 10) : null;
    } catch {
      return null;
    }
  });

  const [counts, setCounts] = useState<Record<number, number>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const v = localStorage.getItem(`${storageKey}-counts`);
      return v ? JSON.parse(v) : {};
    } catch {
      return {};
    }
  });

  const [hovered, setHovered] = useState<number | null>(null);

  const handleVote = (idx: number) => {
    if (voted === idx) {
      // Clicking the already-voted option clears the vote
      const next = { ...counts };
      delete next[idx];
      setCounts(next);
      setVoted(null);
      try {
        localStorage.removeItem(storageKey);
        localStorage.setItem(`${storageKey}-counts`, JSON.stringify(next));
      } catch {}
      return;
    }

    if (voted !== null) {
      // Change vote: remove old, add new
      const next = { ...counts };
      if (next[voted]) {
        next[voted] = Math.max(0, next[voted] - 1);
        if (next[voted] === 0) delete next[voted];
      }
      next[idx] = (next[idx] || 0) + 1;
      setCounts(next);
      setVoted(idx);
      try {
        localStorage.setItem(storageKey, String(idx));
        localStorage.setItem(`${storageKey}-counts`, JSON.stringify(next));
      } catch {}
      return;
    }

    // First vote
    const next = { ...counts, [idx]: (counts[idx] || 0) + 1 };
    setCounts(next);
    setVoted(idx);
    try {
      localStorage.setItem(storageKey, String(idx));
      localStorage.setItem(`${storageKey}-counts`, JSON.stringify(next));
    } catch {}
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;

  return (
    <div
      className="my-8 sm:my-10 p-5 sm:p-7"
      style={{
        backgroundColor: "var(--bg-section, #151515)",
        border: "2px solid #E01A4F",
      }}
    >
      <div
        className="text-sm sm:text-base font-black uppercase tracking-widest mb-3"
        style={{ color: "#E01A4F" }}
      >
        Quick Poll
      </div>
      <h3
        className="text-lg sm:text-xl font-bold leading-tight mb-5 sm:mb-6"
        style={{ color: "var(--text-primary, #ffffff)" }}
      >
        {question}
      </h3>
      <div className="space-y-2.5">
        {options.map((opt, i) => {
          const count = counts[i] || 0;
          const pct = Math.round((count / total) * 100);
          const isVoted = voted === i;
          const isShown = voted !== null;
          const isHovered = hovered === i;
          return (
            <button
              key={i}
              onClick={() => handleVote(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => setHovered(i)}
              onTouchEnd={() => setHovered(null)}
              className="relative w-full text-left overflow-hidden transition-all cursor-pointer"
              style={{
                backgroundColor: isHovered && !isVoted
                  ? "rgba(224,26,79,0.08)"
                  : isShown
                    ? "var(--bg-primary, rgba(255,255,255,0.03))"
                    : "var(--bg-primary, rgba(255,255,255,0.04))",
                border: `1px solid ${isVoted ? "#E01A4F" : isHovered ? "rgba(224,26,79,0.4)" : "var(--border-color, rgba(255,255,255,0.08))"}`,
                transform: isHovered && !isVoted ? "translateX(2px)" : "translateX(0)",
              }}
            >
              {isShown && (
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: isVoted
                      ? "linear-gradient(90deg, rgba(224,26,79,0.25) 0%, rgba(224,26,79,0.1) 100%)"
                      : "rgba(255,255,255,0.04)",
                  }}
                />
              )}
              <div className="relative flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5">
                <span
                  className="text-sm sm:text-base font-semibold pr-3"
                  style={{ color: "var(--text-primary, #ffffff)" }}
                >
                  {opt}
                </span>
                {isShown ? (
                  <span className="flex items-center gap-1.5 flex-shrink-0">
                    {isVoted && (
                      <CheckCircle2
                        className="h-4 w-4"
                        style={{ color: "#E01A4F" }}
                      />
                    )}
                    <span
                      className="text-xs sm:text-sm font-black tabular-nums"
                      style={{
                        color: isVoted ? "#E01A4F" : "var(--text-muted, #999)",
                      }}
                    >
                      {pct}%
                    </span>
                  </span>
                ) : (
                  <span
                    className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex-shrink-0"
                    style={{ color: isHovered ? "#E01A4F" : "var(--text-muted, #999)" }}
                  >
                    Vote
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {voted !== null && (
        <div className="mt-4 flex items-center justify-between">
          <p
            className="text-[10px] sm:text-xs"
            style={{ color: "var(--text-muted, #999)" }}
          >
            {total} {total === 1 ? "vote" : "votes"} · Click your choice to change, click again to clear
          </p>
          <button
            onClick={() => {
              setVoted(null);
              setCounts({});
              try {
                localStorage.removeItem(storageKey);
                localStorage.removeItem(`${storageKey}-counts`);
              } catch {}
            }}
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:opacity-80"
            style={{ color: "var(--text-muted, #999)" }}
          >
            <X className="h-3 w-3" />
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
