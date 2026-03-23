//./app/components/quiz/QuestionList.tsx
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
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="font-semibold mb-4 text-white">Quiz Questions</h3>

      <div className="space-y-2">
        {questions.map((_, i) => {
          const answered = answers[i] !== undefined;
          const isCurrent = i === current;

          const baseStyles =
            "flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer transition";

          const bgStyles = isCurrent
            ? "bg-[#ff6b00]/20 border border-[#ff6b00]/50"
            : answered
            ? "bg-white/5 hover:bg-white/10 border border-white/10"
            : "bg-white/5 hover:bg-white/10 border border-white/10";

          return (
            <button
              key={i}
              type="button"
              onClick={() => onJump(i)}
              className={`${baseStyles} ${bgStyles}`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`h-7 w-7 flex items-center justify-center rounded-full border text-sm font-semibold ${
                    isCurrent
                      ? "border-white/50 bg-[#ff6b00] text-black"
                      : "border-white/10 bg-white/5 text-white"
                  }`}
                >
                  {i + 1}
                </span>

                <span className="text-sm font-medium text-white">
                  Question
                </span>
              </span>

              <span className="flex items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    answered ? "bg-emerald-400" : "bg-white/30"
                  }`}
                />
                {isCurrent && (
                  <span className="text-xs font-semibold text-[#ff6b00]">
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
