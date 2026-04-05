//./src/hooks/useProgressMeta.ts
"use client";

import { useEffect, useState } from "react";

type ConceptMeta = {
  id: number;
  orderIndex: number;
};

type ChapterMeta = {
  order: number;
  concepts: ConceptMeta[];
};

type MetaType = Record<string, Record<number, ChapterMeta>>;

export function useProgressMeta() {
  const [meta, setMeta] = useState<MetaType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchMeta() {
      try {
        const res = await fetch("/api/progress/meta");
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
  }, []);

  return {
    meta,
    loading,
  };
}