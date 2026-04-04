//./app/components/dashboard/StatsCards.tsx
"use client";

import { useEffect, useState } from "react";
import { useContentData } from "@/src/hooks/useContentData";
import {
  getUserId,
  getProgressForUser,
} from "@/src/utils/progress";

export default function StatsCards() {
  const [stats, setStats] = useState({
    completion: 0,
    total: 0,
    completed: 0,
  });

  const { conceptsByChapter } = useContentData();

      useEffect(() => {
      const userId = getUserId();
      if (!userId) return;

      if (!Object.keys(conceptsByChapter).length) return;

      const progress = getProgressForUser(userId);

      const allConcepts = Object.values(conceptsByChapter).flat();

      const totalConcepts = allConcepts.length;

      const completed = Object.values(progress).filter(
        (p) => p.completed
      ).length;

      const completion = totalConcepts
        ? Math.round((completed / totalConcepts) * 100)
        : 0;

      setStats({
        completion,
        total: totalConcepts,
        completed,
      });
    }, [conceptsByChapter]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Roadmap Completion" value={`${stats.completion}%`} />
      <Card title="Concepts Done" value={`${stats.completed}/${stats.total}`} />
      <Card title="Quizzes Passed" value="--" />
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