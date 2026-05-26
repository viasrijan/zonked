import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ArticleNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
        Article Not Found
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        The article you are looking for does not exist.
      </p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
