import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="text-xl font-bold text-red-600">
              Zonked
            </Link>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Your daily dose of Indian entertainment news, gossip, and celebrity updates.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Categories</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/bollywood" className="hover:text-zinc-900 dark:hover:text-white">Bollywood</Link></li>
              <li><Link href="/television" className="hover:text-zinc-900 dark:hover:text-white">Television</Link></li>
              <li><Link href="/south-cinema" className="hover:text-zinc-900 dark:hover:text-white">South Cinema</Link></li>
              <li><Link href="/hollywood" className="hover:text-zinc-900 dark:hover:text-white">Hollywood</Link></li>
              <li><Link href="/korean" className="hover:text-zinc-900 dark:hover:text-white">Korean</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">More</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/fashion" className="hover:text-zinc-900 dark:hover:text-white">Fashion</Link></li>
              <li><Link href="/lifestyle" className="hover:text-zinc-900 dark:hover:text-white">Lifestyle</Link></li>
              <li><Link href="/search" className="hover:text-zinc-900 dark:hover:text-white">Search</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-8 text-center text-xs text-zinc-500 dark:border-zinc-800">
          &copy; {new Date().getFullYear()} Zonked. All rights reserved. Content is AI-curated from various sources.
        </div>
      </div>
    </footer>
  );
}
