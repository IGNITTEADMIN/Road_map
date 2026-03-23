"use client";

import { useState, useEffect } from "react";
import SubjectTab, { Subject } from "../../components/SubjectTab";
import ChapterList from "../../components/ChapterList";
import { ChapterRow } from "@/src/types/content";

export default function UserPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chapterRows, setChapterRows] = useState<ChapterRow[]>([]);

  useEffect(() => {
    if (!selectedSubject) return;

    async function fetchChapters() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/chapters/get?subject=${selectedSubject}`);
        if (!res.ok) {
          throw new Error("Failed to fetch chapters");
        }

        const data: ChapterRow[] = await res.json();
        setChapterRows(data);
      } catch {
        setError("Unable to load chapters");
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, [selectedSubject]);

  return (
    <div>
      <h2>Select a Subject</h2>
      
      <SubjectTab
        subject={selectedSubject}
        onSubjectChange={setSelectedSubject}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {selectedSubject && (
        <ChapterList
          subject={selectedSubject}
          rows={chapterRows}
          mode="user"
        />
      )}
    </div>
  );
}