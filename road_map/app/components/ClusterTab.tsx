//./app/components/ClusterTab.tsx
"use client";

import { ChapterRow } from "@/src/types/content";
import ChapterList from "@/app/components/ChapterList";

interface Props {
  clusterName: string;
  chapters: ChapterRow[];
  subject: string;
  expanded: boolean;
  onToggle: () => void;
}

export default function ClusterTab({
  clusterName,
  chapters,
  subject,
  expanded,
  onToggle,
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
          />
        </div>
      )}
    </div>
  );
}