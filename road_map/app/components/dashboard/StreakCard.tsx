"use client";

import { useProgressContext } from "@/src/context/ProgressContext";

export default function StreakCard() {
  const {streak} = useProgressContext();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-semibold">🔥 Streak</h2>
      <p className="text-lg mt-2">{streak} days</p>
    </div>
  );
}