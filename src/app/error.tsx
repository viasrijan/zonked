"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
        Oops!
      </h1>
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        Something went wrong. Please try again later.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
