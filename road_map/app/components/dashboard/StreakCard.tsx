"use client";

export default function StreakCard() {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#ff6b00] hover:bg-white/10">
      <p className="text-sm text-white/70">Today's streak</p>
      <h2 className="text-3xl font-bold">1 day 🔥</h2>
    </div>
  );
}