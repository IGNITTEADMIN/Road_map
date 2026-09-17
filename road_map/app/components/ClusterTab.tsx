//./app/components/ClusterTab.tsx
"use client";

import { ChapterRow } from "@/src/types/content";
import ChapterList from "@/app/components/ChapterList";
import { useState } from "react";
import { Subject } from "@/app/components/SubjectTab";

interface Props {
  clusterName: string;
  chapters: ChapterRow[];
  subject: Subject;
  expanded: boolean;
  onToggle: () => void;
  targetConceptId?: number | null;
  targetChapterId?: number | null;
  expandedChapterId: number | null;
  setExpandedChapterId: (id: number | null) => void;
}

export default function ClusterTab({
  clusterName,
  chapters,
  subject,
  expanded,
  onToggle,
  targetChapterId,
  targetConceptId,
  expandedChapterId,
  setExpandedChapterId,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      
      {/* Header */}
      <div
        className="cursor-pointer text-lg font-semibold text-white"
        onClick={onToggle}
      >
        {clusterName}
      </div>

      {/* Content */}
      {expanded && (
        <div className="mt-4">
          <ChapterList
            subject={subject}
            rows={chapters}
            mode="user"
            targetConceptId={targetConceptId}
            targetChapterId={targetChapterId}
            expandedChapterId={expandedChapterId}
            setExpandedChapterId={setExpandedChapterId}
          />
        </div>
      )}
    </div>
  );
}