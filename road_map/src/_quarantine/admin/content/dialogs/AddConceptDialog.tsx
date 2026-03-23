"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  subject: string;
  chapter: string;
  onClose: () => void;
  onAdded: (data: {
    concept: string;
    video_title: string;
    video_url: string;
  }) => void;
}

export default function AddConceptDialog({
  open,
  subject,
  chapter,
  onClose,
  onAdded,
}: Props) {
  const [concept, setConcept] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  if (!open) return null;

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
        <h3>Add Concept</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <input
            autoFocus
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
              onAdded({
                concept: concept.trim(),
                video_title: videoTitle.trim(),
                video_url: videoUrl.trim(),
              });
              setConcept("");
              setVideoTitle("");
              setVideoUrl("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
