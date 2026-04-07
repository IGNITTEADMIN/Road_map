"use client";

import { useProgressContext } from "@/src/context/ProgressContext";
import { useProgressMeta } from "@/src/hooks/useProgressMeta";
import { computeStats } from "@/src/utils/progressUtils";
import ContinueLearning from "@/app/components/dashboard/ContinueLearning";

type SubjectStat = {
  completed: number;
  total: number;
};

export default function DashboardPage() {
  const { progress, streak, loading: progressLoading } = useProgressContext();
  const { meta, loading: metaLoading } = useProgressMeta();

  if (progressLoading || metaLoading) {
    return <div>Loading...</div>;
  }

  if (!meta) {
    return <div>Error loading data</div>;
  }

  const { totalConcepts, completedConcepts, subjectStats } =
    computeStats(meta, progress);

  // ✅ Typed properly
  const getProgressColor = (percentage: number): string => {
    if (percentage <= 25) return "stroke-blue-500";
    if (percentage <= 50) return "stroke-cyan-400";
    if (percentage <= 75) return "stroke-teal-400";
    return "stroke-green-400";
  };

  // ✅ Proper React component typing
 const ArcProgress = ({
  value,
  total,
}: {
  value: number;
  total: number;
}) => {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  const radius = 70;
  const centerX = 100;
  const centerY = 100;

  // Dot sizing
  const dotSize = 8; // diameter
  const spacing = 4;

  // ✅ Calculate dots dynamically based on arc length
  const arcLength = Math.PI * radius;
  const totalDots = Math.floor(arcLength / (dotSize + spacing));

  const filledDots = Math.round((percentage / 100) * totalDots);

  // ✅ Smooth color transition across arc
  const getDotColor = (index: number): string => {
    const ratio = index / totalDots;
    if (ratio <= 0.33) return "#3b82f6"; // blue-500
    if (ratio <= 0.66) return "#22d3ee"; // cyan-400
    return "#14b8a6"; // teal-500
  };

  return (
    <svg width={200} height={140} viewBox="0 0 200 140">
      {Array.from({ length: totalDots }, (_, i: number) => {
  const angle =
    Math.PI * ((i + 0.5) / totalDots); // ✅ perfectly centered

  const x = centerX + radius * Math.sin(angle);
  const y = centerY - radius * Math.cos(angle);

  return (
    <circle
      key={i}
      cx={x}
      cy={y}
      r={dotSize / 2}
      fill={i < filledDots ? getDotColor(i) : "#374151"}
    />
  );
})}

      {/* Center text */}
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        className="fill-white font-bold text-xl font-mono"
      >
        {percentage}%
      </text>
    </svg>
  );
};
  const CircularProgress = ({
    value,
    total,
    size = 80,
    strokeWidth = 8,
    color,
  }: {
    value: number;
    total: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }) => {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (percentage / 100) * circumference;

    const colorClass = color || getProgressColor(percentage);

    return (
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={colorClass}
          strokeLinecap="round"
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-current text-white font-semibold font-mono"
          transform={`rotate(90 ${size / 2} ${size / 2})`}
        >
          {percentage}%
        </text>
      </svg>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-6">
        Dashboard
      </h1>

      <div className="rounded-2xl bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CircularProgress
            value={completedConcepts}
            total={totalConcepts}
            size={100}
            strokeWidth={10}
          />
          <div>
            <p className="text-white font-semibold">Overall Progress</p>
            <p className="text-white">
              {completedConcepts} / {totalConcepts}
            </p>
          </div>
        </div>

        {/* 🔥 Enlarged streak */}
        <div className="flex items-center gap-3 text-white ml-8">
          <span className="text-4xl">🔥</span>
          <span className="text-3xl font-bold">{streak}</span>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-10 flex-wrap">
        {Object.entries(subjectStats as Record<string, SubjectStat>).map(
          ([subject, stats]) => {
            const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            const getBorderColor = (perc: number) => {
              if (perc <= 25) return 'border-blue-500/30';
              if (perc <= 50) return 'border-cyan-400/30';
              if (perc <= 75) return 'border-teal-400/30';
              return 'border-green-400/30';
            };
            const borderClass = getBorderColor(percentage);
            const bgClass = subject === 'PHYSICS' ? 'bg-[#1a1a2e]' : subject === 'CHEMISTRY' ? 'bg-[#16213e]' : 'bg-[#0f3460]';
            const subjectColor = subject === 'PHYSICS' ? 'text-blue-500' : subject === 'CHEMISTRY' ? 'text-purple-500' : 'text-emerald-500';
            return (
              <div
                key={subject}
                className={`rounded-2xl p-6 w-[160px] flex flex-col items-center justify-center shadow-md ${bgClass} hover:scale-105 transition-transform duration-200 border ${borderClass}`}
              >
                <CircularProgress
                  value={stats.completed}
                  total={stats.total}
                  size={90}
                  strokeWidth={10}
                  color={subjectColor}
                />
                <p className="text-white font-semibold mt-3 text-sm tracking-wide">
                  {subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()}
                </p>
                <p className="text-gray-300 text-sm">
                  {stats.completed} / {stats.total}
                </p>
              </div>
            );
          }
        )}
      </div>

      <div className="mt-8">
        <ContinueLearning progress={progress} />
      </div>
    </div>
  );
}