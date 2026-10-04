//@app/user/dashboard/page.tsx
"use client";

import { useProgressContext } from "@/src/context/ProgressContext";
import { useProgressMeta } from "@/src/hooks/useProgressMeta";
import { computeStats } from "@/src/utils/progressUtils";
import ContinueLearning from "@/app/components/dashboard/ContinueLearning";
import Loader from "@/app/components/ui/Loader";

type SubjectStat = {
  completed: number;
  total: number;
};

const SUBJECT_COLORS: Record<string, string> = {
  PHYSICS: "#3b82f6",
  CHEMISTRY: "#a855f7",
  MATHS: "#10b981",
};

function DotBar({
  value,
  total,
  color,
  segments = 28,
}: {
  value: number;
  total: number;
  color: string;
  segments?: number;
}) {
  const pct = total > 0 ? value / total : 0;
  const filled = value > 0 ? Math.max(1, Math.round(pct * segments)) : 0;

  return (
    <div
      className="grid gap-[3px] w-full min-w-0"
      style={{ gridTemplateColumns: `repeat(${segments}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: segments }, (_, i) => (
        <div
          key={i}
          className="h-3.5 rounded-[3px]"
          style={{ background: i < filled ? color : "#201c44" }}
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { progress, streak, loading: progressLoading } = useProgressContext();
  const { meta, loading: metaLoading } = useProgressMeta();

  if (progressLoading || metaLoading) {
    return <Loader show={true} />;
  }

  if (!meta) {
    return <div className="text-white text-center py-20">Error loading data</div>;
  }

  const { totalConcepts, completedConcepts, subjectStats } = computeStats(meta, progress);

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-2 md:px-6 py-10">

        {/* Main panel */}
        <div className="rounded-2xl border border-indigo-500/40 bg-[#10102a] p-7">

          {/* Overall progress header */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-lg font-extrabold text-white tracking-wide">
              OVERALL PROGRESS{" "}
              <span className="text-cyan-400">
                {completedConcepts} / {totalConcepts}
              </span>
            </h2>

            <div className="flex items-center gap-2 border border-yellow-500/60 rounded-full px-4 py-1.5 bg-yellow-500/5">
              <span className="text-lg">🔥</span>
              <span className="text-yellow-300 font-bold text-sm">{streak}-day streak</span>
            </div>
          </div>

          <DotBar value={completedConcepts} total={totalConcepts} color="#22d3ee" segments={28} />

          {/* Per-subject rows */}
          <div className="mt-9 space-y-7">
            {Object.entries(subjectStats as Record<string, SubjectStat>).map(([subject, stats]) => (
              <div key={subject} className="flex items-center gap-5">
                <p className="w-24 text-sm font-extrabold text-white tracking-wide shrink-0">
                  {subject}
                </p>
                <DotBar
  value={stats.completed}
  total={stats.total}
  color={SUBJECT_COLORS[subject] ?? "#22d3ee"}
  segments={22}
/>
                <p className="w-20 text-right text-sm text-indigo-300 shrink-0">
                  {stats.completed}/{stats.total}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Continue learning */}
        <div className="mt-6">
          <ContinueLearning progress={progress} />
        </div>

      </div>
    </div>
  );
}