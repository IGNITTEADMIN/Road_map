interface Props {
  completed: boolean;
}

export default function ProgressBadge({ completed }: Props) {
  return (
    <span
      className={`
        text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200

        ${completed
          ? "border-[#ff6b00]/40 text-[#ff6b00] bg-[#ff6b00]/10"
          : "border-white/10 text-gray-300 bg-white/5 hover:border-[#ff6b00] hover:text-[#ff6b00]"
        }
      `}
    >
      {completed ? "Completed" : "In Progress"}
    </span>
  );
}