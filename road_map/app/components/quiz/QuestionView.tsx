import { Question } from "./types";
import OptionButton from "./OptionButton";

interface Props {
  question: Question;
  current: number;
  total: number;
  selected?: number | null;
  onSelect: (index: number) => void;
}

export default function QuestionView({
  question,
  current,
  total,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Question {current + 1} / {total}
          </h3>
          <p className="text-sm text-white/70">Select the best answer below.</p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center rounded-full bg-[#ff6b00] px-3 py-1 text-xs font-semibold text-black">
            {current + 1} of {total}
          </span>
        </div>
      </div>

      <p className="mb-6 text-lg font-medium text-white">{question.text}</p>

      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <OptionButton
              key={i}
              index={i}
              text={opt.text}
              selected={selected}
              onClick={() => onSelect(i)}
            />
        ))}
      </div>
    </div>
  );
}
