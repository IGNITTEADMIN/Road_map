//./app/components/dashboard/ContinueLearning.tsx
"use client";

import { useEffect, useState } from "react";
import { getUserId, getProgressForUser } from "@/src/utils/progress";
import { getContinueLearning } from "@/src/utils/progress";
import { useContentData } from "@/src/hooks/useContentData";

export default function ContinueLearning() {
  const [concept, setConcept] = useState<any>(null);
  const { conceptsByChapter } = useContentData();

  useEffect(() => {
  const userId = getUserId();
  if (!userId) return;

  const progress = getProgressForUser(userId);

  const allConcepts = Object.values(conceptsByChapter).flat();

  const next = getContinueLearning(allConcepts, progress);
  setConcept(next);
}, [conceptsByChapter]);

  if (!concept) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-semibold mb-2">Continue Learning</h2>

      <p className="text-white/80">{concept.conceptName}</p>

      <button
        className="mt-4 px-4 py-2 bg-yellow-500 rounded-xl text-black font-semibold"
        onClick={() => {
          alert(`Open concept ${concept.conceptName}`);
        }}
      >
        Resume
      </button>
    </div>
  );
}