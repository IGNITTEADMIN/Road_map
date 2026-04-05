"use client";

import { useEffect, useState } from "react";
import { useContentData } from "@/src/hooks/useContentData";
import { useProgressContext } from "@/src/context/ProgressContext";
import { computeDashboard } from "@/src/utils/dashboard";

export default function StatsCards() {
  const [stats, setStats] = useState({
    completion: 0,
    total: 0,
    completed: 0,
  });

  const { chapters, conceptsByChapter } = useContentData();

  const { progress, streak } = useProgressContext();

useEffect(() => {
  if (!Object.keys(conceptsByChapter).length) return;

  const allConcepts = Object.values(conceptsByChapter).flat();

  const result = computeDashboard({
    allConcepts,
    chapters,
    conceptsByChapter,
    progress,
    meta: { streak },
  });

  setStats({
    completion: result.completion,
    total: result.total,
    completed: result.completed,
  });
}, [progress, conceptsByChapter]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Completion" value={`${stats.completion}%`} />
      <Card title="Concepts Done" value={`${stats.completed}/${stats.total}`} />
      <Card title="Quizzes Attempted" value="--" />
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-white/70">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}