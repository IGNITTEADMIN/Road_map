"use client";

import { useEffect, useState } from "react";

type ConceptMeta = {
  id: number;
  orderIndex: number;
  conceptName: string; // 🆕
};

type ChapterMeta = {
  order: number;
  chapterName: string; // 🆕
  concepts: ConceptMeta[];
};

type MetaType = Record<string, Record<number, ChapterMeta>>;

export function useProgressMeta(track: "JEE" | "BRIDGE" = "JEE") {
  const [meta, setMeta] = useState<MetaType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchMeta() {
      setLoading(true);
      try {
        const res = await fetch(`/api/progress/meta?track=${track}`);
        const data = await res.json();

        if (mounted) {
          setMeta(data);
        }
      } catch (err) {
        console.error("Meta fetch failed", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchMeta();

    return () => {
      mounted = false;
    };
  }, [track]);

  return {
    meta,
    loading,
  };
}