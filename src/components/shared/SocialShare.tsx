"use client";

import { Link2, Share2 } from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
  url: string;
  title: string;
  variant?: "default" | "floating";
}

export function SocialShare({ url, title, variant = "default" }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = `https://zonked.vercel.app${url}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "floating") {
    return (
      <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-2 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center border border-border bg-surface transition-colors hover:bg-zinc-100 dark:border-dark-border dark:bg-dark-surface dark:hover:bg-dark-border"
        >
          <Share2 className="h-4 w-4" />
        </a>
        <button
          onClick={copyLink}
          className="relative flex h-10 w-10 items-center justify-center border border-border bg-surface transition-colors hover:bg-zinc-100 dark:border-dark-border dark:bg-dark-surface dark:hover:bg-dark-border"
        >
          <Link2 className="h-4 w-4" />
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-brand px-2 py-1 text-xs text-white">
              Copied!
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center border border-border p-2 transition-colors hover:bg-zinc-100 dark:border-dark-border dark:hover:bg-dark-border"
      >
        <Share2 className="h-4 w-4" />
      </a>
      <button
        onClick={copyLink}
        className="flex items-center justify-center border border-border p-2 transition-colors hover:bg-zinc-100 dark:border-dark-border dark:hover:bg-dark-border"
      >
        <Link2 className="h-4 w-4" />
      </button>
      {copied && <span className="text-xs text-brand">Copied!</span>}
    </div>
  );
}
