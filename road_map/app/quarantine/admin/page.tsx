"use client";

import { useEffect, useState, useCallback } from "react";
import SubjectSelector from "@/src/_quarantine/admin/content/SubjectSelector";
import ChapterList from "@/src/_quarantine/admin/content/ChapterList";
import { ContentRow } from "@/src/_quarantine/types/content";

export default function AdminContentPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔁 Central fetch function (single source of truth)
  const fetchContent = useCallback(async () => {
    if (!selectedSubject) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/content/by-subject?subject=${selectedSubject}`
      );
      const data = await res.json();
      setRows(data);
    } finally {
      setLoading(false);
    }
  }, [selectedSubject]);

  // Fetch when subject changes
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <div>
      <SubjectSelector
        selectedSubject={selectedSubject}
        onSelect={setSelectedSubject}
      />

      {!selectedSubject && <p>Select a subject</p>}
      {loading && <p>Loading...</p>}

      {!loading && selectedSubject && (
        <ChapterList
          subject={selectedSubject} 
          rows={rows}
          refresh={fetchContent}     
        />
      )}
    </div>
  );
}
