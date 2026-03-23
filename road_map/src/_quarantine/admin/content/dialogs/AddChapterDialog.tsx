"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  subject: string;
  onClose: () => void;
  onAdded: (chapterName: string) => void;
}

export default function AddChapterDialog({
  open,
  subject,
  onClose,
  onAdded,
}: Props) {
  const [name, setName] = useState("");

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
          minWidth: "300px",
          border: "1px solid #ccc",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Add Chapter</h3>

        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Chapter name"
          onKeyDown={(e) => {
            if (e.key === "Enter" && name.trim()) {
              onAdded(name.trim());
              setName("");
            }
          }}
        />

        <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
          <button onClick={onClose}>Cancel</button>
          <button
            disabled={!name.trim()}
            onClick={() => {
              onAdded(name.trim());
              setName("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
