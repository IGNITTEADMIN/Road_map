"use client";

import { useState, useEffect } from "react";
import SubjectSelector from "@/src/_quarantine/admin/content/SubjectSelector";
import ChapterList from "@/src/_quarantine/admin/content/ChapterList";

interface ContentRow {
  id: number;
  subject: string;
  chapter: string;
  concept: string;
  order_index: number;
  video_title: string;
  video_url: string;
  quiz_id: number;
}

export default function AdminContentPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [contentRows, setContentRows] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedSubject) return;

    setLoading(true);
    setError(null);

    fetch(`/api/content/list?subject=${selectedSubject}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch content");
        return res.json();
      })
      .then((data) => {
        setContentRows(data);
      })
      .catch(() => {
        setError("Unable to load content");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedSubject]);

  return (
    <div>
      <SubjectSelector
        selectedSubject={selectedSubject}
        onSelect={setSelectedSubject}
      />

      {!selectedSubject && <p>Select a subject to view content.</p>}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && selectedSubject && (
        <ChapterList
          subject={selectedSubject}
          contentRows={contentRows}
        />
      )}
    </div>
  );
}
