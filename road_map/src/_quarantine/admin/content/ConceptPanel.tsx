"use client";

import { useEffect, useState } from "react";
import ConceptItem from "./ConceptItem";
import AddConceptDialog from "./dialogs/AddConceptDialog";
import { ContentRow } from "@/src/_quarantine/types/content";

interface Props {
  subject: string;
  chapter: string;
  rows: ContentRow[];
  refresh: () => void;
}

export default function ConceptPanel({
  subject,
  chapter,
  rows,
  refresh,
}: Props) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [items, setItems] = useState<ContentRow[]>([]);
  const [dirty, setDirty] = useState(false);

  // Initialize local order state
  useEffect(() => {
    const sorted = [...rows].sort(
      (a, b) => a.order_index - b.order_index
    );
    setItems(sorted);
    setDirty(false);
  }, [rows]);

  const moveItem = (from: number, to: number) => {
    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setItems(updated);
    setDirty(true);
  };

  return (
    <div style={{ padding: "12px", border: "1px dashed #ccc" }}>
      <div style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
        <button onClick={() => setShowAddDialog(true)}>
          Add Concept
        </button>

        {dirty && (
          <button
            onClick={async () => {
              const payload = items.map((item, idx) => ({
                id: item.id,
                order_index: idx + 1,
              }));

              await fetch("/api/content/reorder", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: payload }),
              });

              refresh();
            }}
          >
            Save Order
          </button>
        )}
      </div>

      {items.length === 0 && <p>No concepts in this chapter.</p>}

      {items.map((row, index) => (
        <ConceptItem
          key={row.id}
          row={row}
          refresh={refresh}
          draggableIndex={index}
          onMove={moveItem}
        />
      ))}

      <AddConceptDialog
        open={showAddDialog}
        subject={subject}
        chapter={chapter}
        onClose={() => setShowAddDialog(false)}
        onAdded={async ({ concept, video_title, video_url }) => {
          await fetch("/api/content/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subject,
              chapter,
              concept,
              video_title,
              video_url,
            }),
          });

          setShowAddDialog(false);
          refresh();
        }}
      />
    </div>
  );
}
