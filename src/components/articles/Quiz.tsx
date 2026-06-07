"use client";

import { useState } from "react";

interface QuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  color?: string;
}

export function Quiz({ question, options, correctIndex, color = "#1aafc9" }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const isAnswered = selected !== null;
  const isCorrect = selected === correctIndex;

  return (
    <div
      className="my-6 sm:my-8 p-4 sm:p-5"
      style={{
        background: "linear-gradient(to bottom, #111111 0%, #000000 100%)",
        border: `2px solid ${color}`,
        opacity: 0.8,
      }}
    >
      <div
        className="text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color }}
      >
        Quick Quiz
      </div>
      <h3
        className="text-base sm:text-lg font-bold leading-snug mb-4"
        style={{ color: "var(--text-primary, #ffffff)" }}
      >
        {question}
      </h3>
      <div className="space-y-2">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const showCorrect = isAnswered && i === correctIndex;
          const showWrong = isAnswered && isSelected && i !== correctIndex;
          return (
            <button
              key={i}
              onClick={() => !isAnswered && setSelected(i)}
              disabled={isAnswered}
              className="w-full text-left px-3 py-2.5 text-sm sm:text-base font-medium transition-all cursor-pointer disabled:cursor-default"
              style={{
                background: showCorrect
                  ? `${color}33`
                  : showWrong
                    ? "rgba(224, 26, 79, 0.15)"
                    : "var(--bg-primary, rgba(255,255,255,0.04))",
                border: `1px solid ${showCorrect ? color : showWrong ? "#E01A4F" : "var(--border-color, rgba(255,255,255,0.08))"}`,
                color: "var(--text-primary, #ffffff)",
              }}
            >
              {opt}
              {showCorrect && <span className="ml-2" style={{ color }}>✓</span>}
              {showWrong && <span className="ml-2" style={{ color: "#E01A4F" }}>✗</span>}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <p
          className="mt-3 text-xs sm:text-sm font-semibold"
          style={{ color: isCorrect ? color : "#E01A4F" }}
        >
          {isCorrect ? "Correct!" : `The answer is: ${options[correctIndex]}`}
        </p>
      )}
    </div>
  );
}
