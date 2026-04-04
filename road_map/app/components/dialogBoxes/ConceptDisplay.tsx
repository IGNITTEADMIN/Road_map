//./app/components/dialogBoxes/ConceptDisplay.tsx
"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

interface Props {
  conceptId: number;
  chapterId: number;
  conceptName: string;
  orderIndex: number;
  videoTitle: string;
  videoURL: string;
  onClose: () => void;
}

export default function ConceptDisplay({
  conceptId,
  chapterId,
  conceptName,
  orderIndex,
  videoTitle,
  videoURL,
  onClose,
}: Props) {
  const [conceptNameValue, setConceptName] = useState(conceptName);
  const [videoTitleValue, setVideoTitle] = useState(videoTitle);
  const [videoURLValue, setVideoURL] = useState(videoURL);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch(`/api/chapters/concepts/${conceptId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conceptName: conceptNameValue,
          orderIndex,
          videoTitle: videoTitleValue,
          videoUrl: videoURLValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update concept");
      }

      onClose();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white">Edit Concept</h3>
          <p className="mt-2 text-sm text-gray-300">
            Update the concept details and save your changes.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-200">
            Concept name
            <input
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#ff6b00]"
              value={conceptNameValue}
              onChange={(e) => setConceptName(e.target.value)}
            />
          </label>

          <label className="block text-sm font-medium text-gray-200">
            Video title
            <input
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#ff6b00]"
              value={videoTitleValue}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </label>

          <label className="block text-sm font-medium text-gray-200">
            Video URL
            <input
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#ff6b00]"
              value={videoURLValue}
              onChange={(e) => setVideoURL(e.target.value)}
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="action" onClick={handleSave} disabled={loading}>
            {loading ? "Saving" : "Save"}
          </Button>
          <Button variant="action" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
