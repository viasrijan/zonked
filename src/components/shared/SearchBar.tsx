"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-gray-400" />
        <input
          type="search"
          placeholder="Search ZONKED..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white border border-gray-200 py-3 pl-12 pr-28 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#E01A4F] focus:ring-2 focus:ring-[#E01A4F]/20"
        />
        <button
          type="submit"
          className="absolute right-2 bg-[#E01A4F] px-6 py-2 text-sm font-bold text-white hover:bg-[#c0153f] transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
