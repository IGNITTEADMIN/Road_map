//./app/components/ChapterTab.tsx

"use client";

import AddConceptDialog from "@/app/components/dialogBoxes/AddConceptDialog";
import Button from "@/app/components/ui/Button";
import { useState } from "react";
import { ContentRow } from "@/src/types/content";
import ConceptList from "@/app/components/ConceptList";

interface Props {
  chapterId: number;
  chapterName: string;
  onClick: () => void;
  conceptList: ContentRow[];
  expandedcI: number | null; // index of expanded chapter
  mode?: "admin" | "user";
  progress?: number;
}

export default function ChapterTab({
  chapterId,
  chapterName,
  onClick,
  conceptList,
  mode = "admin",
  progress,
  expandedcI,
}: Props) {
  const [isEditing, changeIsEditing] = useState(false);
  const [name, changeName] = useState(chapterName);

  const isExpanded = expandedcI === chapterId;

  async function handleDelete(id: number) {
    const res = await fetch(`/api/chapters/${id}`, {
      method: "DELETE",
    });

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
      console.log("Renamed successfully");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="group mb-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#ff6b00] hover:bg-white/10 cursor-pointer"
      onClick={onClick}
    >
      {/* PROGRESS BAR - Only shown when expanded */}
      {mode === "user" && progress !== undefined && isExpanded && (
        <div className="mt-4 mb-4 w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Chapter Name / Editing */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          {mode === "admin" && isEditing ? (
            <input
              value={name}
              onChange={(e) => changeName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") changeIsEditing(false);
              }}
              autoFocus
              className="text-lg font-semibold text-white bg-transparent border-none outline-none"
            />
          ) : (
            <span
              className="text-lg font-semibold text-white"
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
    </div>
  );
}