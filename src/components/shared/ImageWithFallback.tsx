"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface ImageWithFallbackProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallback?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallback = "/og-default.png",
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const imgSrc = src && !error ? src : fallback;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      className={cn("object-cover", className)}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
