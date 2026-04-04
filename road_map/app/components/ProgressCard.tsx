export default function ProgressCard({ progress }: { progress: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold mb-4">Your Progress</h3>

      <div className="w-full bg-black/40 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-[#ff6b00] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-gray-400 text-sm">
        {progress}% completed — keep going!
      </p>
    </div>
  );
}