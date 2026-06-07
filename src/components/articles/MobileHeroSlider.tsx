"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { timeAgo } from "@/lib/utils/date";

const CAT_COLORS: Record<string, string> = {
  film: "#E01A4F",
  tv: "#F9C22E",
  celebs: "#1aafc9",
  fashion: "#14b57a",
  lifestyle: "#ad6e47",
  dating: "#F15946",
  internet: "#8B5CF6",
};

const CAT_DARKER: Record<string, string> = {
  film: "#8a0f33",
  tv: "#9d7a0f",
  celebs: "#0d5a64",
  fashion: "#085840",
  lifestyle: "#6b432b",
  dating: "#7e2c22",
  internet: "#5a3aad",
};

const LIGHT_CATS = new Set(["tv"]);

function formatTitle(title: string): { lines: string[]; truncated: boolean } {
  const words = title.split(/\s+/).filter(Boolean);
  const cap = words.slice(0, 15);
  const lines: string[] = [];
  for (let i = 0; i < cap.length; i += 5) {
    lines.push(cap.slice(i, i + 5).join(" "));
  }
  return { lines, truncated: cap.length < words.length };
}

interface MobileHeroSliderProps {
  articles: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    imageUrl: string | null;
    category: string;
    publishedAt: Date | string | null;
  }>;
}

export function MobileHeroSlider({ articles }: MobileHeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const goNext = useCallback(() => {
    goTo((current + 1) % articles.length);
  }, [current, articles.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + articles.length) % articles.length);
  }, [current, articles.length, goTo]);

  useEffect(() => {
    if (isPaused || articles.length <= 1 || isTransitioning) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext, articles.length, isTransitioning]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (distance > threshold) goNext();
    else if (distance < -threshold) goPrev();
  };

  const formattedTitles = useMemo(
    () => articles.map((a) => formatTitle(a.title)),
    [articles]
  );

  if (articles.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {articles.map((article, i) => {
          const aColor = CAT_COLORS[article.category] || "#E01A4F";
          const aDark = CAT_DARKER[article.category] || "#8a0f33";
          const aTextColor = LIGHT_CATS.has(article.category) ? "#0a0a0a" : "#ffffff";
          const { lines, truncated } = formattedTitles[i];
          return (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group block shrink-0 grow-0 w-full"
              style={{ minWidth: "100%" }}
            >
              <article className="relative overflow-hidden">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <ImageWithFallback
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                  <div className="absolute inset-0 flex items-end pb-6 px-4">
                    <div className="w-full">
                      <h1 className="text-base font-black leading-[1.25] tracking-[-0.02em]">
                        {lines.map((line, idx) => (
                          <span key={idx} className="block">
                            <span
                              style={{
                                background: `linear-gradient(135deg, ${aColor} 0%, ${aDark} 100%)`,
                                color: aTextColor,
                                padding: "0.1em 0.28em",
                                display: "inline",
                              }}
                            >
                              {line}
                            </span>
                            {truncated && idx === lines.length - 1 ? (
                              <span
                                style={{
                                  background: `linear-gradient(135deg, ${aColor} 0%, ${aDark} 100%)`,
                                  color: aTextColor,
                                  padding: "0.1em 0.18em",
                                }}
                              >
                                …
                              </span>
                            ) : null}
                          </span>
                        ))}
                      </h1>
                      {article.publishedAt && (
                        <p className="mt-2 text-[11px] font-medium text-white/80">
                          {timeAgo(article.publishedAt)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
