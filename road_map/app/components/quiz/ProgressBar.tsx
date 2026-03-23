interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="w-full mb-6">
      
      {/* Track */}
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        
        {/* Fill */}
        <div
          className="h-full rounded-full bg-[#ff6b00] transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      
      </div>

    </div>
  );
}