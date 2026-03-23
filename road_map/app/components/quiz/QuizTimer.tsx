//./app/components/quiz/QuizTimer.tsx
interface Props {
  timeLeft: number;
}

export default function QuizTimer({ timeLeft }: Props) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="w-full max-w-xs rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-4 border-[#ff6b00] bg-[#ff6b00]/10">
            <span className="text-xl font-semibold text-white">
            {minutes}:{seconds}
          </span>
        </div>
        <p className="text-sm font-medium text-white/70">Timer Remaining</p>
      </div>
    </div>
  );
}
