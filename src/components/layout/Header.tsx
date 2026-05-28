"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Film", href: "/film", color: "#E01A4F" },
  { label: "TV", href: "/tv", color: "#F9C22E" },
  { label: "Celebs", href: "/celebs", color: "#53B3CB" },
  { label: "Fashion", href: "/fashion", color: "#06D6A0" },
  { label: "Lifestyle", href: "/lifestyle", color: "#C0C0C0" },
  { label: "Dating", href: "/dating", color: "#F15946" },
  { label: "Internet", href: "/internet", color: "#8B5CF6" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (searchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchVisible]);

  const handleSearchEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setSearchVisible(true);
  };

  const handleSearchLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setSearchVisible(false);
      setSearchQuery("");
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black shadow-lg">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-4xl font-black tracking-[-0.04em] text-white">
              ZONKED
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 text-sm font-bold uppercase tracking-wide transition-colors duration-200"
                  style={{ color: isActive ? "#ffffff" : item.color }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#ffffff" : item.color)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search + Mobile Menu */}
          <div className="flex items-center gap-3">
            <div
              className="relative"
              onMouseEnter={handleSearchEnter}
              onMouseLeave={handleSearchLeave}
            >
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
                <form onSubmit={handleSearch}>
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none"
                    style={{
                      width: searchVisible ? "260px" : "40px",
                      height: "40px",
                      opacity: 1,
                      transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </form>
              </div>
            </div>
            <button
              className="p-2 text-white hover:text-gray-300 transition-colors md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="bg-black border-t border-white/10 md:hidden">
          <nav className="flex flex-col p-4 gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-base font-bold uppercase tracking-wide transition-colors"
                  style={{ color: isActive ? "#ffffff" : item.color }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#ffffff" : item.color)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
