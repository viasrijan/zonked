"use client";

export function MobileFooter() {
  return (
    <footer style={{ background: "linear-gradient(to bottom, var(--bg-footer-start) 0%, var(--bg-footer-end) 100%)" }}>
      <div className="h-12 flex items-center justify-center px-3">
        <p className="text-[10px] text-center" style={{ color: "var(--text-footer)" }}>
          &copy; 2026 <span className="font-bold" style={{ color: "#F9C22E" }}>ZONKED</span>: AI Curated Entertainment Updates.
        </p>
      </div>
    </footer>
  );
}
