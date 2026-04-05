//./src/hooks/useProgress.ts
"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface ProgressItem {
  conceptId: number;
  completed: boolean;
  score?: number;
  lastAccessedAt?: string;
}

export function useProgress() {
  const [progress, setProgress] = useState<Record<number, ProgressItem>>({});
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔒 Prevent multiple calls
  const isUpdatingRef = useRef(false);

  // 🔹 Fetch once
  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/progress");
      const data = await res.json();

      const mapped: Record<number, ProgressItem> = {};

      data.progress.forEach((p: any) => {
        mapped[p.conceptId] = p;
      });

      setProgress(mapped);
      setStreak(data.streak);
    } catch (err) {
      console.error("Failed to fetch progress", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // 🔹 Complete / Uncomplete
  const toggleComplete = async (conceptId: number, completed: boolean) => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    try {
      await fetch("/api/progress/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conceptId, completed }),
      });

      // ✅ Optimistic update
      setProgress((prev) => ({
        ...prev,
        [conceptId]: {
          ...prev[conceptId],
          conceptId,
          completed,
        },
      }));
    } catch (err) {
      console.error(err);
    } finally {
      isUpdatingRef.current = false;
    }
  };

  // 🔹 Access (video click)
  const markAccessed = async (conceptId: number) => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    try {
      await fetch("/api/progress/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conceptId }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      isUpdatingRef.current = false;
    }
  };

  // 🔹 Quiz attempt
  const attemptQuiz = async (conceptId: number, score: number) => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    try {
      await fetch("/api/progress/quiz-attempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conceptId, score }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      isUpdatingRef.current = false;
    }
  };

  return {
    progress,
    streak,
    loading,
    toggleComplete,
    markAccessed,
    attemptQuiz,
    refetch: fetchProgress,
  };
}