"use client";

import { useState } from "react";
import ChapterItem from "./ChapterItem";
import AddChapterDialog from "./dialogs/AddChapterDialog";
import { ContentRow } from "@/src/_quarantine/types/content";


interface Props {
  subject: Subject | null;
  rows: ContentRow[];
  refresh: () => void;
}

export default function ChapterList({ subject, rows, refresh }: Props) {
  const chapters = Array.from(new Set(rows.map((r) => r.chapter)));
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div style={{ padding: "16px", border: "1px solid #ddd" }}>
      {chapters.map((chapter) => (
        <ChapterItem
          key={chapter}
          subject={subject}
          chapter={chapter}
          rows={rows.filter((r) => r.chapter === chapter)}
          refresh={refresh}
          isExpanded={expandedChapter === chapter}
          onToggle={() =>
            setExpandedChapter(
              expandedChapter === chapter ? null : chapter
            )
          }
        />
      ))}

      <div style={{ marginTop: "16px" }}>
        <button onClick={() => setShowAddDialog(true)}>
          Add Chapter
        </button>
      </div>

      <AddChapterDialog
        open={showAddDialog}
        subject={subject}
        onClose={() => setShowAddDialog(false)}
        onAdded={async (chapterName: string) => {
          await fetch("/api/content/chapter/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subject,
              chapter: chapterName,
            }),
          });

          setExpandedChapter(chapterName);
          setShowAddDialog(false);
          refresh();
        }}
      />
    </div>
  );
}
