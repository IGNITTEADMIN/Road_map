//./app/components/dashboard/ContinueLearning.tsx
"use client";

import { useRouter } from "next/navigation";
import { useProgressMeta } from "@/src/hooks/useProgressMeta";
import { getNextConcept } from "@/src/utils/progressUtils";

interface Props {
  progress: Record<number, any>;
}

export default function ContinueLearning({ progress }: Props) {
  const router = useRouter();
  const { meta, loading } = useProgressMeta();

  if (loading) {
    return (
      <div className="rounded-2xl border border-cyan-500/30 bg-[#0d1b2e] p-6 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-white/10 rounded w-1/2"></div>
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="rounded-2xl border border-cyan-500/30 bg-[#0d1b2e] p-6">
        <p className="text-white text-center font-semibold">Error loading data</p>
      </div>
    );
  }

  const next = getNextConcept(meta, progress);

  if (!next) {
    return (
      <div className="rounded-2xl border border-cyan-500/30 bg-[#0d1b2e] p-6">
        <p className="text-white text-center font-semibold">🎉 You've completed everything!</p>
      </div>
    );
  }

  function handleContinue() {
    if (!next) return;
    router.push(
      `/user/content?subject=${next.subject}&chapterId=${next.chapterId}&conceptId=${next.conceptId}`
    );
  }

  return (
    <div
      className="rounded-2xl border border-cyan-500/40 bg-[#0d1b2e] p-6 cursor-pointer hover:border-cyan-400/60 transition"
      onClick={handleContinue}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-cyan-400 font-medium mb-1.5">Continue where you left off</p>
          <h3 className="text-xl font-bold text-white">
            {next.chapterName} · {next.conceptName}
          </h3>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleContinue();
          }}
          className="px-7 py-3 rounded-xl bg-cyan-400 text-black font-bold tracking-wide hover:bg-cyan-300 transition"
        >
          RESUME
        </button>
      </div>
    </div>
  );
}