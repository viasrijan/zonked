"use client";

interface SocialPromptProps {
  text: string;
  hashtag: string;
  color?: string;
}

export function SocialPrompt({ text, hashtag, color = "#8B5CF6" }: SocialPromptProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(hashtag.replace("#", ""))}`;

  return (
    <div
      className="my-6 sm:my-8 p-4 sm:p-5"
      style={{
        background: "linear-gradient(to bottom, #111111 0%, #000000 100%)",
        border: `2px solid ${color}`,
        opacity: 0.8,
      }}
    >
      <div
        className="text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color }}
      >
        Join the Conversation
      </div>
      <p
        className="text-sm sm:text-base font-semibold leading-snug mb-4"
        style={{ color: "var(--text-primary, #ffffff)" }}
      >
        {text}
      </p>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors"
        style={{
          background: color,
          color: "#ffffff",
        }}
      >
        Share on X
        <span style={{ color }}>{hashtag}</span>
      </a>
    </div>
  );
}
