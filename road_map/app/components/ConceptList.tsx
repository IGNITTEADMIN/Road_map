///app/components/ConceptList.tsx
"use client";

import { useState } from "react";
import { ContentRow, ChapterRow } from "@/src/types/content";
import { Subject } from "@/app/components/SubjectTab";
import AddConceptDialog from "@/app/components/dialogBoxes/AddConceptDialog";
import ConceptTab from "@/app/components/ConceptTab";
import Button from "@/app/components/ui/Button";

interface Props {
  chapterId: number;
  rows: ContentRow[];
  mode?: "admin" | "user";
  targetConceptId?: number | null;
}

export default function ConceptList({
  chapterId,
  rows,
  mode = "admin",
  targetConceptId = null,
}: Props) {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="relative ml-5 mt-2 pl-6 border-l border-white/10 space-y-2">
      {mode === "admin" && showAddDialog && (
        <AddConceptDialog
          chapterId={chapterId}
          orderIndex={rows.length}
          onClose={() => setShowAddDialog(false)}
        />
      )}

      {rows.map((row) => (
        <div key={row.id} className="relative">
          {/* horizontal branch connecting the trunk line to this row */}
          <span className="absolute -left-6 top-6 w-6 h-px bg-white/10" />
          <ConceptTab
            conceptId={row.id}
            chapterId={chapterId}
            conceptName={row.conceptName}
            order_index={row.orderIndex}
            video_title={row.videoTitle}
            video_url={row.videoUrl}
            mode={mode}
            targetConceptId={targetConceptId}
          />
        </div>
      ))}

      {mode === "admin" && (
        <div className="flex justify-start pt-1">
          <Button onClick={() => setShowAddDialog(true)}>Add Concept</Button>
        </div>
      )}
    </div>
  );
}