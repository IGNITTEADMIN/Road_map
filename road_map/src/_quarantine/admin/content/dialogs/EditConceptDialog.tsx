"use client";

import { useState, useEffect } from "react";
import { ContentRow } from "@/src/_quarantine/types/content";

interface Props {
  open: boolean;
  row: ContentRow | null;
  onClose: () => void;
  onSaved: (data: {
    id: number;
    concept: string;
    video_title: string;
    video_url: string;
  }) => void;
}

export default function EditConceptDialog({
  open,
  row,
  onClose,
  onSaved,
}: Props) {
  const [concept, setConcept] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Populate when dialog opens
  useEffect(() => {
    if (row) {
      setConcept(row.concept);
      setVideoTitle(row.video_title ?? "");
      setVideoUrl(row.video_url ?? "");
    }
  }, [row]);

  if (!open || !row) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          padding: "16px",
          minWidth: "360px",
          border: "1px solid #ccc",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Edit Concept</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <input
            placeholder="Concept name"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />
          <input
            placeholder="Video title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
          <input
            placeholder="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>

        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <button onClick={onClose}>Cancel</button>
          <button
            disabled={!concept.trim()}
            onClick={() => {
              onSaved({
                id: row.id,
                concept: concept.trim(),
                video_title: videoTitle.trim(),
                video_url: videoUrl.trim(),
              });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
