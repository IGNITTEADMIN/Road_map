//./app/components/ChapterTab.tsx
"use client";

import AddConceptDialog from "@/app/components/dialogBoxes/AddConceptDialog";
import Button from "@/app/components/ui/Button";
import { useState } from "react";
import { ContentRow } from "@/src/types/content";

interface Props {
  chapterId: number;
  chapterName: string;
  onClick: () => void;
  expandedcI: number | null;
  mode?: "admin" | "user";
}

export default function ChapterTab({
  chapterId,
  chapterName,
  onClick,
  mode = "admin",
  expandedcI,
}: Props) {
  const [isEditing, changeIsEditing] = useState(false);
  const [name, changeName] = useState(chapterName);

  const isExpanded = expandedcI === chapterId;

  async function handleDelete(id: number) {
    const res = await fetch(`/api/chapters/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete chapter");
  }

  async function handleSave() {
    try {
      const res = await fetch(`/api/chapters/${chapterId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapterName: name }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Rename error");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 cursor-pointer
      border transition-colors duration-200
      ${
        isExpanded
          ? "bg-white/[0.06] border-orange-500/50"
          : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Chevron */}
        <svg
          className={`w-4 h-4 shrink-0 text-white/50 transition-transform duration-200 ${
            isExpanded ? "rotate-90 text-orange-400" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>

        {mode === "admin" && isEditing ? (
          <input
            value={name}
            onChange={(e) => changeName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") changeIsEditing(false);
            }}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            className="text-base font-semibold text-white bg-transparent border-none outline-none min-w-0"
          />
        ) : (
          <span
            className="text-base font-semibold text-white truncate"
            onClick={(e) => {
              if (mode === "admin") {
                e.stopPropagation();
                changeIsEditing(true);
              }
            }}
          >
            {name}
          </span>
        )}
      </div>

      {mode === "admin" && (
        <Button
          variant="action"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(chapterId);
          }}
        >
          Delete
        </Button>
      )}
    </div>
  );
}