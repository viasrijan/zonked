"use client";

import { Link2, Share2 } from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = `https://zonked.vercel.app${url}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-lg border border-zinc-200 p-2 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        <Share2 className="h-4 w-4" />
      </a>
      <button
        onClick={copyLink}
        className="inline-flex items-center justify-center rounded-lg border border-zinc-200 p-2 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        <Link2 className="h-4 w-4" />
      </button>
      {copied && <span className="text-xs text-green-600">Copied!</span>}
    </div>
  );
}
