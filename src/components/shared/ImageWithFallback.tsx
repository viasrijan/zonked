"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface ImageWithFallbackProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallback?: string;
}

const FALLBACK_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect fill='%23f0ebe4' width='800' height='600'/%3E%3Crect fill='%23e8e0d6' x='300' y='220' width='200' height='160' rx='8'/%3E%3Ccircle fill='%23c89b7b' cx='360' cy='280' r='24'/%3E%3Cpolygon fill='%23c89b7b' points='300,380 400,300 500,380'/%3E%3Ctext fill='%23c89b7b' font-family='Inter,sans-serif' font-size='14' font-weight='600' x='400' y='420' text-anchor='middle'%3EZONKED%3C/text%3E%3C/svg%3E";

export function ImageWithFallback({
  src,
  alt,
  className,
  fallback = FALLBACK_SVG,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgSrc = src && !error ? src : fallback;

  return (
    <div className={cn("relative overflow-hidden bg-paper-warm", className)}>
      {!loaded && (
        <div className="absolute inset-0 skeleton" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error) {
            setError(true);
            setLoaded(true);
          }
        }}
        loading="lazy"
      />
    </div>
  );
}
