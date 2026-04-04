//./app/components/dashboard/ClusterProgress.tsx
"use client";

import { useEffect, useState } from "react";
import { useContentData } from "@/src/hooks/useContentData";
import {
  getClusterProgress,
  getProgressForUser,
  getUserId,
} from "@/src/utils/progress";

export default function ClusterProgress() {
  const [data, setData] = useState<Record<string, number>>({});
  const { chapters, conceptsByChapter } = useContentData();
    useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    const progress = getProgressForUser(userId);

    const clusterData = getClusterProgress(
        chapters,
        conceptsByChapter,
        progress
    );

    setData(clusterData);
    }, [chapters, conceptsByChapter]);

  return (
    <div className="p-4 border border-white/10 rounded-xl space-y-3">
      <p className="text-white/80">Cluster Progress</p>

      {Object.entries(data).map(([cluster, value]) => (
        <div key={cluster}>
          <p className="text-sm">{cluster}</p>
          <div className="bg-white/10 h-2 rounded">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}