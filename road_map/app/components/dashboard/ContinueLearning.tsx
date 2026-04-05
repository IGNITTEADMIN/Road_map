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
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        Loading...
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        Error loading data
      </div>
    );
  }

  // 🔹 Get next concept using proper logic
  const next = getNextConcept(meta, progress);

  if (!next) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        🎉 You've completed everything!
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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">Continue Learning</p>
        <h3 className="text-lg font-semibold text-white">
          Concept #{next.conceptId}
        </h3>
        <p className="text-sm text-gray-500">
          Chapter #{next.chapterId} • {next.subject}
        </p>
      </div>

      <button
        onClick={handleContinue}
        className="px-4 py-2 rounded-xl bg-white text-black font-semibold"
      >
        Continue
      </button>
    </div>
  );
}