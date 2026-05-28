interface ColoredLogoProps {
  className?: string;
}

// ZONKED letters colored to match page names, skipping orange
const LETTER_COLORS = [
  "#E01A4F", // Z = Film
  "#F9C22E", // O = TV
  "#53B3CB", // N = Celebs
  "#06D6A0", // K = Fashion
  "#C0C0C0", // E = Lifestyle
  "#8B5CF6", // D = Internet
];

const LETTERS = "ZONKED";

export function ColoredLogo({ className = "" }: ColoredLogoProps) {
  return (
    <span className={className}>
      {LETTERS.split("").map((letter, i) => (
        <span key={i} style={{ color: LETTER_COLORS[i] }}>
          {letter}
        </span>
      ))}
    </span>
  );
}
