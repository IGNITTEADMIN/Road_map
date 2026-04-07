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
      <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-6 shadow-lg animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-6 shadow-lg">
        <p className="text-white text-center text-lg font-semibold">Error loading data</p>
      </div>
    );
  }

  // 🔹 Get next concept using proper logic
  const next = getNextConcept(meta, progress);

  if (!next) {
    return (
      <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-6 shadow-lg">
        <p className="text-white text-center text-lg font-semibold">🎉 You've completed everything!</p>
      </div>
    );
  }

  function handleContinue() {
    if(!next) return;
    router.push(
      `/learn?subject=${next.subject}&chapterId=${next.chapterId}&conceptId=${next.conceptId}`
    );
  }

  return (
    <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer" onClick={handleContinue}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-400 font-medium mb-1">Continue from where left</p>
          <h3 className="text-xl font-bold text-white mb-1">
            Concept {next.conceptId}
          </h3>
          <p className="text-sm text-gray-300">
            {next.subject}
          </p>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); handleContinue(); }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
        >
          Continue
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}