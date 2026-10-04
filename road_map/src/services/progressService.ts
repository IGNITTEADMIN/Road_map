//@src/services/progressService.ts
import {
  getUserProgress,
  markConceptCompletedDB,
  unmarkConceptCompletedDB,
  markConceptAccessedDB,
  upsertUserProgress,
  logLearningEvent,
  getLearningEventsByUserAndTrack,
  getUserProgressByTrack,
  getTotalConceptsByTrack,
  Track,
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
export async function logQuizAttemptEvent(
  userId: number,
  conceptId: number,
  score: number,
  timeTakenSeconds: number
) {
  return await logLearningEvent({
    userId,
    conceptId,
    eventType: "quiz_attempt",
    score,
    metadata: { timeTakenSeconds },
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

export async function logVideoProgress(
  userId: number,
  conceptId: number,
  metadata: { percentWatched: number; watchedSeconds: number; durationSeconds: number }
) {
  return await logLearningEvent({
    userId,
    conceptId,
    eventType: "video_progress",
    metadata,
  });
}

export async function computeStudentAnalyse(
  userId: number,
  track: Track,
  name: string,
  email: string,
  rangeDays: number | null
) {
  const events = await getLearningEventsByUserAndTrack(userId, track);
  const progressRows = await getUserProgressByTrack(userId, track);
  const totalConcepts = await getTotalConceptsByTrack(track);
  const now = new Date();

  const cutoff = rangeDays ? new Date(now.getTime() - rangeDays * 86400000) : null;
  const scopedEvents = cutoff ? events.filter((e) => new Date(e.createdAt) >= cutoff) : events;

  // video engagement (scoped to range)
  const videoMap: Record<number, { concept: string; accesses: number; maxPct: number }> = {};
  scopedEvents.forEach((e) => {
    if (e.eventType === "video_access" || e.eventType === "video_progress") {
      if (!videoMap[e.conceptId]) {
        videoMap[e.conceptId] = { concept: e.conceptName, accesses: 0, maxPct: 0 };
      }
    }
    if (e.eventType === "video_access") videoMap[e.conceptId].accesses++;
    if (e.eventType === "video_progress") {
      const pct = (e.metadata as any)?.percentWatched ?? 0;
      videoMap[e.conceptId].maxPct = Math.max(videoMap[e.conceptId].maxPct, pct);
    }
  });
  const videos = Object.values(videoMap).map((v) => ({
    concept: v.concept,
    accesses: v.accesses,
    pct: v.maxPct,
  }));

  // quiz attempts (scoped to range)
  const quizEvents = scopedEvents.filter((e) => e.eventType === "quiz_attempt");
  const attemptCountByConcept: Record<number, number> = {};
  const lastScoreByConcept: Record<number, number> = {};
  const attempts = quizEvents.map((e) => {
    attemptCountByConcept[e.conceptId] = (attemptCountByConcept[e.conceptId] ?? 0) + 1;
    const n = attemptCountByConcept[e.conceptId];
    const prevScore = lastScoreByConcept[e.conceptId];
    const score = e.score ?? 0;
    const trend = prevScore === undefined ? "flat" : score > prevScore ? "up" : score < prevScore ? "down" : "flat";
    lastScoreByConcept[e.conceptId] = score;
    const t = (e.metadata as any)?.timeTakenSeconds ?? 0;
    return {
      concept: e.conceptName,
      n,
      score,
      time: `${Math.floor(t / 60)}m ${t % 60}s`,
      date: e.createdAt.toISOString().slice(0, 10),
      trend,
    };
  });
  const avgScore = quizEvents.length
    ? Math.round(quizEvents.reduce((s, e) => s + (e.score ?? 0), 0) / quizEvents.length)
    : 0;

  // pacing: weeks sized to the selected range (8 weeks when "all")
  const weeksCount = rangeDays ? Math.max(1, Math.ceil(rangeDays / 7)) : 8;
  const pacing: number[] = new Array(weeksCount).fill(0);
  progressRows
    .filter((p) => p.completed && p.updatedAt)
    .forEach((p) => {
      const diffDays = Math.floor((now.getTime() - new Date(p.updatedAt!).getTime()) / 86400000);
      if (rangeDays && diffDays >= rangeDays) return;
      const weekIndex = weeksCount - 1 - Math.floor(diffDays / 7);
      if (weekIndex >= 0 && weekIndex < weeksCount) pacing[weekIndex]++;
    });

  // activity heatmap: days sized to the selected range (45 days when "all")
  const activityDays = rangeDays ? Math.min(rangeDays, 90) : 45;
  const activity: number[] = new Array(activityDays).fill(0);
  events.forEach((e) => {
    const diffDays = Math.floor((now.getTime() - new Date(e.createdAt).getTime()) / 86400000);
    const idx = activityDays - 1 - diffDays;
    if (idx >= 0 && idx < activityDays) activity[idx]++;
  });

  // completion, streak, idle — always all-time, not range-scoped
  const completedCount = progressRows.filter((p) => p.completed).length;
  const completion = totalConcepts > 0 ? Math.round((completedCount / totalConcepts) * 100) : 0;
  const streak = computeStreak(progressRows as any);

  const lastEvent = events[events.length - 1];
  const lastActiveDate = lastEvent ? new Date(lastEvent.createdAt) : null;
  const idleDays = lastActiveDate
    ? Math.floor((now.getTime() - lastActiveDate.getTime()) / 86400000)
    : null;
  const status = idleDays === null ? "risk" : idleDays >= 14 ? "risk" : idleDays >= 5 ? "idle" : "ok";

  return {
    id: userId,
    name,
    email,
    completion,
    avgScore,
    streak,
    lastActive: lastActiveDate ? lastActiveDate.toISOString() : null,
    idleDays,
    status,
    videos,
    pacing,
    attempts,
    missed: [],
    activity,
  };
}