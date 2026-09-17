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

export function useProgressMeta(track: "JEE" | "BRIDGE" = "JEE") { // 🆕 accept track, default JEE
  const [meta, setMeta] = useState<MetaType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchMeta() {
      setLoading(true); // 🆕 reset loading when track changes
      try {
        const res = await fetch(`/api/progress/meta?track=${track}`); // 🆕 pass track through
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