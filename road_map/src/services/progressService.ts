import {
  getUserProgress,
  markConceptCompletedDB,
  unmarkConceptCompletedDB,
  markConceptAccessedDB,
  upsertUserProgress,
} from "@/src/db/queries";

export async function getFullProgress(userId: number) {
  const data = await getUserProgress(userId);

  return data;
}

export async function markConceptCompleted(
  userId: number,
  conceptId: number
) {
  return await markConceptCompletedDB(userId, conceptId);
}

export async function unmarkConceptCompleted(
  userId: number,
  conceptId: number
) {
  return await unmarkConceptCompletedDB(userId, conceptId);
}

export async function markConceptAccessed(
  userId: number,
  conceptId: number
) {
  return await markConceptAccessedDB(userId, conceptId);
}

export async function markQuizAttempted(
  userId: number,
  conceptId: number,
  score: number
) {
  return await upsertUserProgress({
    userId,
    conceptId,
    score,
  });
}

export function computeStreak(progress: any[]) {
  if (!progress.length) return 0;

  // get only completed entries
  const completed = progress
    .filter((p) => p.completed && p.updatedAt)
    .map((p) => new Date(p.updatedAt))
    .sort((a, b) => b.getTime() - a.getTime());

  if (!completed.length) return 0;

  let streak = 1;

  for (let i = 1; i < completed.length; i++) {
    const diff =
      (completed[i - 1].getTime() - completed[i].getTime()) /
      (1000 * 60 * 60 * 24);

    if (Math.floor(diff) === 1) {
      streak++;
    } else if (Math.floor(diff) > 1) {
      break;
    }
  }

  return streak;
}