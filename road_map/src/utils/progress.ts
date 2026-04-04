// ./src/utils/progress.ts

export type ConceptProgress = {
  completed: boolean;
  score?: number;
  lastAccessedAt?: number;
  updatedAt?: number;
};

export type UserMeta = {
  lastLoginAt?: number;
  streak?: number;
};

export type UserProgressData = {
  progress: {
    [conceptId: number]: ConceptProgress;
  };
  meta: UserMeta;
};

export type GlobalProgressStore = {
  [userId: string]: UserProgressData;
};

export const STORAGE_KEY_V2 = "quiz_progress_v2";

export function markConceptAccessed(userId: string, conceptId: number) {
  const store = getGlobalProgressStore();

  if (!store[userId]) {
    store[userId] = { progress: {}, meta: {} };
  }

  const existing = store[userId].progress[conceptId];

  store[userId].progress[conceptId] = {
    completed: existing?.completed || false,
    score: existing?.score,
    lastAccessedAt: Date.now(),
    updatedAt: Date.now(),
  };

  saveGlobalProgressStore(store);
}

export function getStreak(userId: string): number {
  const store = getGlobalProgressStore();
  return store[userId]?.meta?.streak || 0;
}


export function updateLastLogin(userId: string) {
  const store = getGlobalProgressStore();

  if (!store[userId]) {
    store[userId] = { progress: {}, meta: {} };
  }

  const meta = store[userId].meta;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (!meta.lastLoginAt) {
    meta.streak = 1;
  } else {
    const last = new Date(meta.lastLoginAt);
    const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());

    const diffDays = Math.floor(
      (today.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
    } else if (diffDays === 1) {
      meta.streak = (meta.streak || 0) + 1;
    } else {
      meta.streak = 1;
    }
  }

  meta.lastLoginAt = Date.now();

  saveGlobalProgressStore(store);
}


export function getChapterProgress(
  concepts: { id: number }[],
  progress: Record<number, ConceptProgress>
) {
  if (!concepts.length) return 0;

  const completed = concepts.filter(
    (c) => progress[c.id]?.completed
  ).length;

  return Math.round((completed / concepts.length) * 100);
}

export function getSubjectProgress(
  chapters: { chapterId: number }[],
  conceptsByChapter: Record<number, { id: number }[]>,
  progress: Record<number, ConceptProgress>
) {
  let totalConcepts = 0;
  let completedConcepts = 0;

  chapters.forEach((chapter) => {
    const concepts = conceptsByChapter[chapter.chapterId] || [];

    totalConcepts += concepts.length;

    completedConcepts += concepts.filter(
      (c) => progress[c.id]?.completed
    ).length;
  });

  return totalConcepts
    ? Math.round((completedConcepts / totalConcepts) * 100)
    : 0;
}
export function getClusterProgress(
  chapters: { chapterId: number; clusterTag?: string }[],
  conceptsByChapter: Record<number, { id: number }[]>,
  progress: Record<number, ConceptProgress>
) {
  const clusterMap: Record<
    string,
    { total: number; completed: number }
  > = {};

  chapters.forEach((chapter) => {
    const cluster = chapter.clusterTag || "General";
    const concepts = conceptsByChapter[chapter.chapterId] || [];

    if (!clusterMap[cluster]) {
      clusterMap[cluster] = { total: 0, completed: 0 };
    }

    clusterMap[cluster].total += concepts.length;
    clusterMap[cluster].completed += concepts.filter(
      (c) => progress[c.id]?.completed
    ).length;
  });

  // convert to % format
  const result: Record<string, number> = {};

  Object.keys(clusterMap).forEach((key) => {
    const { total, completed } = clusterMap[key];
    result[key] = total
      ? Math.round((completed / total) * 100)
      : 0;
  });

  return result;
}

export function getContinueLearning(
  allConcepts: { id: number }[],
  progress: Record<number, ConceptProgress>
) {
  if (!allConcepts.length) return null;

  // 1. Find last accessed
  const last = Object.entries(progress)
    .map(([id, data]) => ({
      id: Number(id),
      time: data.lastAccessedAt || 0,
    }))
    .sort((a, b) => b.time - a.time)[0];

  if (last) {
    return allConcepts.find((c) => c.id === last.id) || null;
  }

  // 2. Else first incomplete
  return allConcepts.find((c) => !progress[c.id]?.completed) || allConcepts[0];
}














// Global store helpers
export function getGlobalProgressStore(): GlobalProgressStore {
  if (typeof window === "undefined") return {};

  try {
    const data = localStorage.getItem(STORAGE_KEY_V2);
    return data ? (JSON.parse(data) as GlobalProgressStore) : {};
  } catch (err) {
    console.error("Failed to parse progress store", err);
    return {};
  }
}

export function saveGlobalProgressStore(store: GlobalProgressStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(store));
}

// User-specific functions
export function getProgressForUser(userId: string): Record<number, ConceptProgress> {
  const store = getGlobalProgressStore();
  return store[userId]?.progress || {};
}

export function markConceptCompleted(userId: string, conceptId: number, score: number = 0) {
  const store = getGlobalProgressStore();
  if (!store[userId]) store[userId] = { progress: {}, meta: {} };

  store[userId].progress[conceptId] = {
    completed: true,
    score,
    lastAccessedAt: Date.now(),
    updatedAt: Date.now(),
  };

  saveGlobalProgressStore(store);
}

export function unmarkConceptCompleted(userId: string, conceptId: number) {
  const store = getGlobalProgressStore();
  if (!store[userId]?.progress) return;

  delete store[userId].progress[conceptId];
  saveGlobalProgressStore(store);
}

// Helper to get current userId from localStorage (NextAuth fallback)
export function getUserId(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.email || null;
  } catch {
    return null;
  }
}