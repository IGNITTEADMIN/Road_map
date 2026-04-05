export function computeDashboard({
  allConcepts,
  chapters,
  conceptsByChapter,
  progress,
  meta,
}: any) {
  const progressMap = progress || {};

  // 🔹 TOTAL COMPLETION
  const total = allConcepts.length;

  const completed = allConcepts.filter(
    (c: any) => progressMap[c.id]?.completed
  ).length;

  const completion = total
    ? Math.round((completed / total) * 100)
    : 0;

  // 🔹 SUBJECT PROGRESS (chapter-based)
  const subjects = ["PHYSICS", "CHEMISTRY", "MATHS"];
  const subjectProgress: Record<string, number> = {};

  subjects.forEach((subject) => {
    const subjectChapters = chapters.filter(
      (c: any) => c.subject === subject
    );

    let completedChapters = 0;

    subjectChapters.forEach((chapter: any) => {
      const concepts = conceptsByChapter[chapter.chapterId] || [];

      const done =
        concepts.length &&
        concepts.every((c: any) => progressMap[c.id]?.completed);

      if (done) completedChapters++;
    });

    subjectProgress[subject] = subjectChapters.length
      ? Math.round((completedChapters / subjectChapters.length) * 100)
      : 0;
  });

  return {
    completion,
    completed,
    total,
    subjectProgress,
    streak: meta?.streak || 0,
  };
}