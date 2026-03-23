export type ProgressMap = {
  [conceptId: number]: {
    completed: boolean;
    score?: number;
  };
};

const STORAGE_KEY = "quiz_progress";

export function getProgress(): ProgressMap {
  if (typeof window === "undefined") return {};

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

export function saveProgress(progress: ProgressMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markConceptCompleted(conceptId: number, score: number) {
  const progress = getProgress();

  progress[conceptId] = {
    completed: true,
    score,
  };

  saveProgress(progress);
}