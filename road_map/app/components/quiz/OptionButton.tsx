"use client";

interface Props {
  index: number;
  text: React.ReactNode;
  selected?: number | null;
  onClick: () => void;
}

export default function OptionButton({
  index,
  text,
  selected,
  onClick,
}: Props) {
  const isSelected = selected === index;

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-xl border transition-all duration-150

        ${
          isSelected
            ? "border-[#ff6b00] bg-[#ff6b00]/10"
            : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6b00]/40"
        }
      `}
    >
      {/* Option Circle */}
      <div
        className={`
          w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition

          ${
            isSelected
              ? "bg-[#ff6b00] text-black"
              : "bg-white/10 text-white/80 border border-white/20"
          }
        `}
      >
        {String.fromCharCode(65 + index)}
      </div>

      {/* Option Text */}
      <div className="text-left text-sm text-white/90 leading-tight">
        {text}
      </div>
    </button>
  );
}