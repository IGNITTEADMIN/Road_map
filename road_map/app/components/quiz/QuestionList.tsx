"use client";

import { Question } from "./types";

interface Props {
  questions: Question[];
  current: number;
  answers: Record<number, number | null>;
  onJump: (index: number) => void;
}

export default function QuestionList({
  questions,
  current,
  answers,
  onJump,
}: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 w-full">
  <h3 className="font-medium mb-4 text-white text-sm">
    Quiz Questions
  </h3>

  <div className="space-y-2">
    {questions.map((_, i) => {
      const answered = answers[i] !== undefined;
      const isCurrent = i === current;

      const baseStyles =
        "flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer transition w-full";

      const bgStyles = isCurrent
        ? "bg-[#ff6b00]/20 border border-[#ff6b00]/50"
        : "bg-white/5 hover:bg-white/10 border border-white/10";

      return (
        <button
          key={i}
          type="button"
          onClick={() => onJump(i)}
          className={`${baseStyles} ${bgStyles}`}
        >
          <span className="flex items-center gap-2">
            <span
              className={`h-6 w-6 flex items-center justify-center rounded-full border text-xs font-medium ${
                isCurrent
                  ? "border-white/50 bg-[#ff6b00] text-black"
                  : "border-white/10 bg-white/5 text-white"
              }`}
            >
              {i + 1}
            </span>

            <span className="text-xs text-white/90">
              Q{i + 1}
            </span>
          </span>

          <span className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                answered ? "bg-green-400" : "bg-white/30"
              }`}
            />
            {isCurrent && (
              <span className="text-[10px] font-medium text-[#ff6b00]">
                Current
              </span>
            )}
          </span>
        </button>
      );
    })}
  </div>
</div>
  );
}