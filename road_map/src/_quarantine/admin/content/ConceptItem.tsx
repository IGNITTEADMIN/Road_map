"use client";

import { useState } from "react";
import { ContentRow } from "@/src/_quarantine/types/content";
import EditConceptDialog from "./dialogs/EditConceptDialog";
import YoutubePreview from "./YoutubePreview";
//import QuizPanel from "../quiz/QuizPanel";

function getThumbnail(url?: string) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const id =
      u.searchParams.get("v") ||
      u.pathname.split("/").pop();
    if (!id) return null;
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  } catch {
    return null;
  }
}

interface Props {
  row: ContentRow;
  refresh: () => void;
  draggableIndex: number;
  onMove: (from: number, to: number) => void;
}

export default function ConceptItem({
  row,
  refresh,
  draggableIndex,
  onMove,
}: Props) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState(row.concept);
  const [showEdit, setShowEdit] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const thumbnail = getThumbnail(row.video_url);

  return (
    <>
      <div
        draggable
        onDragStart={(e) =>
          e.dataTransfer.setData(
            "text/plain",
            draggableIndex.toString()
          )
        }
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) =>
          onMove(
            Number(e.dataTransfer.getData("text/plain")),
            draggableIndex
          )
        }
        style={{
          padding: "10px",
          border: "1px solid #ddd",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
        onClick={() => {
          if (!isRenaming) setShowEdit(true);
        }}
      >
        <div style={{ flex: 1 }}>
          {isRenaming ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  if (!name || name === row.concept) {
                    setIsRenaming(false);
                    return;
                  }
                  await fetch("/api/content/update", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: row.id,
                      concept: name,
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
            >
              {row.concept}
            </span>
          )}
        </div>

        {thumbnail && (
          <img
            src={thumbnail}
            width={90}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setShowVideo(true);
            }}
          />
        )}

        <button
          onClick={async (e) => {
            e.stopPropagation();
            if (!confirm("Delete this concept?")) return;
            await fetch(`/api/content/delete?id=${row.id}`, {
              method: "DELETE",
            });
            refresh();
          }}
        >
          Delete
        </button>
        <button onClick={()=>{setShowQuiz(true)}}>Quiz</button>
      </div>

      <EditConceptDialog
        open={showEdit}
        row={row}
        onClose={() => setShowEdit(false)}
        onSaved={async ({
          id,
          concept,
          video_title,
          video_url,
        }: {
          id: number;
          concept: string;
          video_title: string;
          video_url: string;
        }) => {
          await fetch("/api/content/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id,
              concept,
              video_title,
              video_url,
            }),
          });
          setShowEdit(false);
          refresh();
        }}
      />

      {showVideo && row.video_url && (
        <YoutubePreview
          videoUrl={row.video_url}
          onClose={() => setShowVideo(false)}
        />
      )}
      
      
      </>
  );
}
