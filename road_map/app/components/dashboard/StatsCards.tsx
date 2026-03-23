"use client";

import { useEffect, useState } from "react";
import { getStats } from "@/src/utils/dashboard";

export default function StatsCards() {
  const [stats, setStats] = useState({ completion: 0 });

  useEffect(() => {
    const dummyConcepts = Array.from({ length: 50 }, (_, i) => ({ id: i + 1 }));
    setStats(getStats(dummyConcepts));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Roadmap Completion" value={`${stats.completion}%`} />
      <Card title="Quizzes Passed" value="--" />
      <Card title="Watch Time" value="--" />
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#ff6b00] hover:bg-white/10">
      <p className="text-sm text-white/70">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}