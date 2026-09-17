//./app/components/ClusterList.tsx
"use client";

import { useState } from "react";
import { ChapterRow } from "@/src/types/content";
import ClusterTab from "@/app/components/ClusterTab";
import { Subject } from "@/app/components/SubjectTab";

interface Props {
  groupedChapters: Record<string, ChapterRow[]>;
  subject: Subject;
  targetConceptId?: number | null;
  targetChapterId?: number | null;
}

export default function ClusterList({ groupedChapters, subject,targetChapterId,targetConceptId }: Props) {
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null);
  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {Object.keys(groupedChapters).length === 0 && (
        <p className="text-gray-400">No clusters available</p>
      )}

      {Object.entries(groupedChapters).map(([clusterName, chapters]) => (
        <ClusterTab
            key={clusterName}
            clusterName={clusterName}
            chapters={chapters}
            subject={subject}
            expanded={expandedCluster === clusterName}
            onToggle={() =>
              setExpandedCluster(
                expandedCluster === clusterName ? null : clusterName
              )
            }
            targetConceptId={targetConceptId}
            targetChapterId={targetChapterId}
            expandedChapterId={expandedChapterId}
            setExpandedChapterId={setExpandedChapterId}
          />
      ))}
    </div>
  );
}