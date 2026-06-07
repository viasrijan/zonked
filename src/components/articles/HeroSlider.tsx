"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { timeAgo } from "@/lib/utils/date";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const BLUE_GRAD = "linear-gradient(to bottom, #1aafc9 0%, #0d5a64 100%)";
const RED_GRAD = "linear-gradient(to bottom, #E01A4F 0%, #8a0f33 100%)";

function formatTitle(title: string): { lines: string[]; truncated: boolean } {
  const words = title.split(/\s+/).filter(Boolean);
  const cap = words.slice(0, 12);
  const lines: string[] = [];
  for (let i = 0; i < cap.length; i += 5) {
    lines.push(cap.slice(i, i + 5).join(" "));
  }
  return { lines, truncated: cap.length < words.length };
}

interface HeroSliderProps {
  articles: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    imageUrl: string | null;
    category: string;
    publishedAt: Date | string | null;
  }>;
}

export function HeroSlider({ articles }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => setCurrent(index), []);
  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % articles.length);
  }, [articles.length]);
  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + articles.length) % articles.length);
  }, [articles.length]);

  useEffect(() => {
    if (isPaused || articles.length <= 1) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext, articles.length]);

  const formattedTitles = useMemo(
    () => articles.map((a) => formatTitle(a.title)),
    [articles]
  );

  if (articles.length === 0) return null;

  const getSlideStyle = (index: number) => {
    if (index === current) return { transform: "translateX(0)", opacity: 1, zIndex: 20 };
    if (index > current) return { transform: "translateX(100%)", opacity: 0, zIndex: 10 };
    return { transform: "translateX(-100%)", opacity: 0, zIndex: 10 };
  };

  const article = articles[current];
  const catColor = CAT_COLORS[article.category] || "#E01A4F";

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-[2.5/1] md:aspect-[2.8/1]" />

        {articles.map((a, i) => {
          const style = getSlideStyle(i);
          const isCenter = i === current;
          const aColor = CAT_COLORS[a.category] || "#E01A4F";
          const aDark = CAT_DARKER[a.category] || "#8a0f33";
          const aTextColor = LIGHT_CATS.has(a.category) ? "#0a0a0a" : "#ffffff";
          const { lines, truncated } = formattedTitles[i];
          return (
            <Link
              key={a.slug}
              href={`/article/${a.slug}`}
              className="group block absolute inset-0 transition-all duration-700 ease-in-out"
              style={{ ...style, pointerEvents: isCenter ? "auto" : "none" }}
            >
              <article className="relative overflow-hidden white-card">
                <div className="relative w-full h-full aspect-[2.5/1] md:aspect-[2.8/1] overflow-hidden">
                  <ImageWithFallback
                    src={a.imageUrl}
                    alt={a.title}
                    className="h-full w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {isCenter && (
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/30 pointer-events-none" />
                  )}
                </div>
                {isCenter && (
                  <div className="absolute inset-0 flex items-center px-5 sm:px-8 md:px-12 z-20">
                    <div className="w-full max-w-4xl">
                      <h1
                        className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black leading-[1.3] tracking-[-0.02em]"
                      >
                        {lines.map((line, idx) => (
                          <span key={idx} className="block">
                            <span
                              style={{
                                background: `linear-gradient(135deg, ${aColor} 0%, ${aDark} 100%)`,
                                color: aTextColor,
                                padding: "0.12em 0.32em",
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
                                  padding: "0.12em 0.18em",
                                }}
                              >
                                …
                              </span>
                            ) : null}
                          </span>
                        ))}
                      </h1>
                      {a.publishedAt && (
                        <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-white/80">
                          {timeAgo(a.publishedAt)}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </article>
            </Link>
          );
        })}
      </div>

      {articles.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-50 text-white rounded-full w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-all shadow-lg overflow-hidden cursor-pointer"
            style={{ background: BLUE_GRAD, touchAction: "manipulation" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = RED_GRAD)}
            onMouseLeave={(e) => (e.currentTarget.style.background = BLUE_GRAD)}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 pointer-events-none" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-50 text-white rounded-full w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-all shadow-lg overflow-hidden cursor-pointer"
            style={{ background: BLUE_GRAD, touchAction: "manipulation" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = RED_GRAD)}
            onMouseLeave={(e) => (e.currentTarget.style.background = BLUE_GRAD)}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 pointer-events-none" />
          </button>
        </>
      )}

      {articles.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
          {articles.map((a, i) => (
            <button
              key={a.slug}
              onClick={(e) => { e.preventDefault(); goTo(i); }}
              className="rounded-full transition-all duration-500"
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: 8,
                height: 8,
                backgroundColor: "#ffffff",
                opacity: i === current ? 1 : 0.35,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
