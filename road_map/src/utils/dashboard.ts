//./src/utils/dashboard.ts
import { getProgressForUser, getUserId, ConceptProgress } from "./progress";

/**
 * GLOBAL STATS
 */
export function getStats(allConcepts: { id: number }[]) {
  const userId = getUserId();
  if (!userId) return { completion: 0, completed: 0, total: 0 };

  const progress = getProgressForUser(userId);

  const total = allConcepts.length;

  const completed = allConcepts.filter(
    (c) => progress[c.id]?.completed
  ).length;

  return {
    completion: total ? Math.round((completed / total) * 100) : 0,
    completed,
    total,
  };
}