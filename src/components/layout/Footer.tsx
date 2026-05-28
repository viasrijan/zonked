import Link from "next/link";

function getCurrentDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Footer() {
  return (
    <footer className="mt-12 bg-black shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.3)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <Link href="/" className="text-3xl font-black tracking-[-0.03em] text-white">
              ZONKED
            </Link>
            <p className="mt-1 text-sm text-gray-400">
              {getCurrentDate()}
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Content is AI-curated from various sources.
          </p>
        </div>
        <div className="mt-6 border-t border-white/10 pt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} ZONKED
        </div>
      </div>
    </footer>
  );
}
