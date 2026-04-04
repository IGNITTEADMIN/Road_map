//./app/components/dashboard/StreakCard.tsx
"use client";

import { getUserId, getStreak } from "@/src/utils/progress";

export default function StreakCard() {
  const userId = getUserId();
  const streak = userId ? getStreak(userId) : 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-semibold">🔥 Streak</h2>
      <p className="text-lg mt-2">{streak} days</p>
    </div>
  );
}