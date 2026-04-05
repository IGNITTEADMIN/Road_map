"use client";

import { useEffect, useState } from "react";
import { useContentData } from "@/src/hooks/useContentData";
import { useProgressContext } from "@/src/context/ProgressContext";
import { computeDashboard } from "@/src/utils/dashboard";

export default function SubjectProgress() {
  const [dataMap, setDataMap] = useState<Record<string, number>>({});

  const { chapters, conceptsByChapter } = useContentData();

  const { progress, streak } = useProgressContext();

        useEffect(() => {
        const allConcepts = Object.values(conceptsByChapter).flat();

        const result = computeDashboard({
            allConcepts,
            chapters,
            conceptsByChapter,
            progress,
            meta: { streak },
        });

        setDataMap(result.subjectProgress);
        }, [progress, chapters, conceptsByChapter]);

  return (
    <div className="space-y-3">
      {Object.entries(dataMap).map(([subject, value]) => (
        <div key={subject}>
          <p className="text-sm">{subject}</p>
          <div className="bg-white/10 h-2 rounded">
            <div
              className="bg-yellow-500 h-2 rounded"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}