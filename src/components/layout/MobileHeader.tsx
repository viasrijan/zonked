"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Film", href: "/film", color: "#E01A4F" },
  { label: "TV", href: "/tv", color: "#F9C22E" },
  { label: "Celebs", href: "/celebs", color: "#1aafc9" },
  { label: "Fashion", href: "/fashion", color: "#14b57a" },
  { label: "Lifestyle", href: "/lifestyle", color: "#ad6e47" },
  { label: "Dating", href: "/dating", color: "#F15946" },
  { label: "Internet", href: "/internet", color: "#8B5CF6" },
];

export function MobileHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleMenu = () => {
    setSearchOpen(false);
    setMenuOpen((v) => !v);
  };

  const toggleSearch = () => {
    setMenuOpen(false);
    setSearchOpen((v) => !v);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "linear-gradient(to bottom, var(--bg-header-start) 0%, var(--bg-header-end) 100%)" }}
      >
        <div className="flex h-14 items-center px-3 relative">
          {/* Left: Hamburger */}
          <button
            type="button"
            onClick={toggleMenu}
            onTouchStart={(e) => e.stopPropagation()}
            className="w-11 h-11 flex items-center justify-center select-none cursor-pointer"
            style={{ color: "var(--text-header)", touchAction: "manipulation" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5 pointer-events-none" /> : <Menu className="h-5 w-5 pointer-events-none" />}
          </button>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <span className="zonked-logo text-xl font-black tracking-[-0.04em] pointer-events-none">
              ZONKED
            </span>
          </Link>

          {/* Right: Search */}
          <button
            type="button"
            onClick={toggleSearch}
            onTouchStart={(e) => e.stopPropagation()}
            className="ml-auto w-11 h-11 flex items-center justify-center select-none cursor-pointer"
            style={{ color: "var(--text-header)", touchAction: "manipulation" }}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
          >
            {searchOpen ? <X className="h-5 w-5 pointer-events-none" /> : <Search className="h-5 w-5 pointer-events-none" />}
          </button>
        </div>

        {/* Search dropdown */}
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{
            maxHeight: searchOpen ? "72px" : "0px",
            background: "linear-gradient(to bottom, var(--bg-header-end) 0%, var(--bg-header-start) 100%)",
          }}
        >
          <form onSubmit={handleSearch} className="px-3 pb-3 pt-1">
            <div
              className="flex items-center rounded-full h-10 px-3"
              style={{ backgroundColor: "var(--bg-search, #ffffff)" }}
            >
              <Search className="h-4 w-4 pointer-events-none shrink-0" style={{ color: "var(--text-search-icon, #1a1a2e)" }} />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search ZONKED..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 pl-2.5 pr-2 bg-transparent text-sm focus:outline-none h-full"
                style={{ color: "var(--text-search-input, #000000)" }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="w-6 h-6 flex items-center justify-center"
                  style={{ color: "var(--text-search-icon, #1a1a2e)" }}
                  aria-label="Clear"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </header>

      {/* Dropdown menu panel (slides down from header, doesn't cover full screen) */}
      <div
        className="fixed left-0 right-0 z-40 transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden"
        style={{
          top: "56px",
          maxHeight: menuOpen ? "500px" : "0px",
          opacity: menuOpen ? 1 : 0,
          background: "var(--bg-header-end, #0a0a0a)",
          borderBottom: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          boxShadow: menuOpen ? "0 12px 24px -8px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <nav className="py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="nav-item flex items-center gap-3 px-4 py-3.5 text-base font-bold uppercase tracking-wide transition-colors"
                style={{
                  color: isActive ? item.color : "var(--text-primary, #ffffff)",
                  borderLeft: isActive ? `3px solid ${item.color}` : "3px solid transparent",
                }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Backdrop when menu or search is open */}
      {(menuOpen || searchOpen) && (
        <div
          className="fixed inset-0 z-30"
          style={{ top: "56px", background: "rgba(0,0,0,0.4)" }}
          onClick={() => { setMenuOpen(false); setSearchOpen(false); }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
