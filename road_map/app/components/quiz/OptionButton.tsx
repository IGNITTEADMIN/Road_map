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
        w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200

        ${isSelected
          ? "border-[#ff6b00] bg-[#ff6b00]/10 shadow-[0_0_10px_rgba(255,107,0,0.25)]"
          : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6b00]/40"
        }
      `}
    >
      {/* Option Circle */}
      <div
        className={`
          w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition

          ${isSelected
            ? "bg-[#ff6b00] text-black"
            : "bg-white/10 text-white/80 border border-white/20"
          }
        `}
      >
        {String.fromCharCode(65 + index)}
      </div>

      <div className="text-left text-white/90">
        {text}
      </div>
    </button>
  );
}