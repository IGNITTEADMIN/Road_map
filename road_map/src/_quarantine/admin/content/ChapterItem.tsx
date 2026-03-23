"use client";

import ConceptPanel from "./ConceptPanel";
import { ContentRow } from "@/src/_quarantine/types/content";
import { useState } from "react";

interface Props {
  subject: string;
  chapter: string;
  rows: ContentRow[];
  refresh: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ChapterItem({
  subject,
  chapter,
  rows,
  refresh,
  isExpanded,
  onToggle,
}: Props) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState(chapter);

  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          padding: "10px",
          border: "1px solid #bbb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => {
          if (!isRenaming) onToggle();
        }}
      >
        {/* CHAPTER NAME */}
        {isRenaming ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                if (!name || name === chapter) {
                  setIsRenaming(false);
                  return;
                }

                await fetch("/api/content/chapter/rename", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    subject,
                    oldChapter: chapter,
                    newChapter: name,
                  }),
                });

                setIsRenaming(false);
                refresh();
              }
            }}
          />
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsRenaming(true);
            }}
            style={{ cursor: "text" }}
          >
            {chapter}
          </span>
        )}

        <button
          onClick={async (e) => {
            e.stopPropagation();
            const ok = confirm(
              "This will delete all concepts under this chapter"
            );
            if (!ok) return;

            await fetch("/api/content/chapter/delete", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ subject, chapter }),
            });

            refresh();
          }}
        >
          Delete
        </button>
      </div>

      {isExpanded && (
        <div style={{ marginLeft: "20px", marginTop: "10px" }}>
          <ConceptPanel
            subject={subject}
            chapter={chapter}
            rows={rows.filter((r) => r.concept !== "__EMPTY__")}
            refresh={refresh}
          />
        </div>
      )}
    </div>
  );
}
