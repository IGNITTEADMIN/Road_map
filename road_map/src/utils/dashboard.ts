import { getProgress } from "./progress";

export function getStats(allConcepts: any[]) {
  const progress = getProgress();

  const total = allConcepts.length;
  const completed = allConcepts.filter(c => progress[c.id]?.completed).length;

  return {
    completion: Math.round((completed / total) * 100),
    completed,
    total,
  };
}