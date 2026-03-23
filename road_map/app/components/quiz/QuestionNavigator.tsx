//./api/components/quiz/QuestionNavigator.tsx
import { Question } from "./types";
import Button from "@/app/components/ui/Button";

interface Props {
  questions: Question[];
  current: number;
  setCurrent: (i: number) => void;
  addQuestion: () => void;
}

export default function QuestionNavigator({
  questions,
  current,
  setCurrent,
  addQuestion,
}: Props) {
  return (
    <div className="w-64 rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="font-semibold mb-4 text-white">Quiz Questions</h3>

      <div className="space-y-2">
        {questions.map((_, i) => {
          const isCurrent = i === current;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                isCurrent
                  ? "bg-[#ff6b00]/20 border border-[#ff6b00]/50"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`h-9 w-9 flex items-center justify-center rounded-full border text-sm font-semibold ${
                    isCurrent
                      ? "border-[#ff6b00] bg-[#ff6b00] text-black"
                      : "border-white/10 bg-white/5 text-white"
                  }`}
                >
                  {i + 1}
                </span>

                <span className="text-sm font-medium text-white">
                  Question {i + 1}
                </span>
              </span>

              {isCurrent && (
                <span className="text-xs font-semibold text-[#ff6b00]">
                  Current
                </span>
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={addQuestion}
          className="flex items-center justify-center w-full px-3 py-2 rounded-lg cursor-pointer transition-colors bg-white/5 hover:bg-white/10 border border-white/10 border-dashed"
        >
          <span className="flex items-center gap-3">
            <span className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white text-lg font-semibold">
              +
            </span>
            <span className="text-sm font-medium text-white">Add Question</span>
          </span>
        </button>
      </div>
    </div>
  );
}