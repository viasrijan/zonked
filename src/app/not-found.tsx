import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-6xl font-bold text-zinc-900 dark:text-white">
        404
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Page not found
      </p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
