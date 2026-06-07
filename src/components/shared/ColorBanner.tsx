"use client";

export function ColorBanner() {
  return (
    <div className="relative w-full h-16 overflow-hidden mb-6">
      <svg
        viewBox="0 0 1200 64"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E01A4F" />
            <stop offset="14%" stopColor="#F9C22E" />
            <stop offset="28%" stopColor="#1aafc9" />
            <stop offset="42%" stopColor="#14b57a" />
            <stop offset="57%" stopColor="#ad6e47" />
            <stop offset="71%" stopColor="#F15946" />
            <stop offset="85%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#E01A4F" />
          </linearGradient>
        </defs>
        
        {/* Background */}
        <rect width="1200" height="64" fill="var(--bg-primary)" />
        
        {/* All different shapes with bold complementary colors */}
        {/* 1. Large red circle */}
        <circle cx="80" cy="32" r="30" fill="#E01A4F" opacity="0.9" />
        
        {/* 2. Yellow square rotated 45deg */}
        <rect x="180" y="12" width="40" height="40" fill="#F9C22E" opacity="0.85" transform="rotate(45 200 32)" />
        
        {/* 3. Teal triangle pointing right */}
        <polygon points="300,8 350,32 300,56" fill="#1aafc9" opacity="0.9" />
        
        {/* 4. Green diamond */}
        <polygon points="420,8 450,32 420,56 390,32" fill="#14b57a" opacity="0.85" />
        
        {/* 5. Orange hexagon */}
        <polygon points="540,10 560,18 560,46 540,54 520,46 520,18" fill="#F15946" opacity="0.9" />
        
        {/* 6. Brown pentagon */}
        <polygon points="660,8 700,20 690,50 630,50 620,20" fill="#ad6e47" opacity="0.85" />
        
        {/* 7. Purple star */}
        <polygon points="780,8 790,28 810,28 795,40 800,60 780,48 760,60 765,40 750,28 770,28" fill="#8B5CF6" opacity="0.9" />
        
        {/* 8. Red oval */}
        <ellipse cx="900" cy="32" rx="35" ry="20" fill="#E01A4F" opacity="0.8" />
        
        {/* 9. Yellow crescent */}
        <path d="M1000,12 A20,20 0 1,1 1000,52 A14,14 0 1,0 1000,12" fill="#F9C22E" opacity="0.85" />
        
        {/* 10. Teal cross */}
        <rect x="1090" y="18" width="30" height="28" fill="#1aafc9" opacity="0.9" />
        <rect x="1080" y="24" width="50" height="16" fill="#1aafc9" opacity="0.9" />
        
        {/* Connecting gradient line */}
        <line x1="0" y1="32" x2="1200" y2="32" stroke="url(#grad1)" strokeWidth="2" opacity="0.5" />
      </svg>
    </div>
  );
}
