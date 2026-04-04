//./src/hooks/useContentData.ts
"use client";

import { useEffect, useState } from "react";
import type { ChapterRow, ContentRow } from "@/src/types/content";

export function useContentData() {
  const [chapters, setChapters] = useState<ChapterRow[]>([]);
  const [conceptsByChapter, setConceptsByChapter] = useState<Record<number, ContentRow[]>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true; // Prevent state updates after unmount

    async function load() {
      try {
        setLoading(true);

        const subjects = ["PHYSICS", "CHEMISTRY", "MATHS"];

        const allChapters: ChapterRow[] = [];
        const conceptsMap: Record<number, ContentRow[]> = {};

        // Fetch chapters for all subjects in parallel
        const chapterResults = await Promise.all(
          subjects.map((subject) =>
            fetch(`/api/chapters/get?subject=${subject}`)
              .then((res) => res.json())
              .catch((err) => {
                console.error(`Failed to fetch chapters for ${subject}:`, err);
                return [];
              })
          )
        );

        // Flatten and validate chapter arrays
        chapterResults.forEach((subjectChapters) => {
          if (!Array.isArray(subjectChapters)) {
            console.warn("Expected chapters array but got:", subjectChapters);
            return;
          }
          allChapters.push(...subjectChapters);
        });

        // Fetch concepts for each chapter in parallel
        await Promise.all(
          allChapters.map(async (chapter) => {
            try {
              const res = await fetch(`/api/chapters/concepts/get?chapterId=${chapter.chapterId}`);
              const data = await res.json();
              conceptsMap[chapter.chapterId] = Array.isArray(data) ? data : [];
            } catch (err) {
              console.error(`Failed to fetch concepts for chapter ${chapter.chapterId}:`, err);
              conceptsMap[chapter.chapterId] = [];
            }
          })
        );

        // Only update state if component is still mounted
        if (mounted) {
          setChapters(allChapters);
          setConceptsByChapter(conceptsMap);
        }
      } catch (err) {
        console.error("Error loading content:", err);
        if (mounted) {
          setChapters([]);
          setConceptsByChapter({});
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { chapters, conceptsByChapter, loading };
}