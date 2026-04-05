type MetaType = Record<
  string,
  Record<number, { order: number; concepts: { id: number; orderIndex: number }[] }>
>;

type ProgressType = Record<
  number,
  { completed?: boolean }
>;

export function computeStats(meta: MetaType, progress: ProgressType) {
  let totalConcepts = 0;
  let completedConcepts = 0;

  const subjectStats: Record<
    string,
    { total: number; completed: number }
  > = {};

  for (const subject in meta) {
    let subjectTotal = 0;
    let subjectCompleted = 0;

    const chapters = meta[subject];

    for (const chapterId in chapters) {
      const chapter = chapters[chapterId];

      chapter.concepts.forEach((c) => {
        subjectTotal++;
        totalConcepts++;

        if (progress[c.id]?.completed) {
          subjectCompleted++;
          completedConcepts++;
        }
      });
    }

    subjectStats[subject] = {
      total: subjectTotal,
      completed: subjectCompleted,
    };
  }

  return {
    totalConcepts,
    completedConcepts,
    subjectStats,
  };
}

export function getNextConcept(meta: any, progress: any) {
  let latestConceptId: number | null = null;
  let latestTime = 0;

  // 1. Find most recently interacted concept
  for (const conceptId in progress) {
    const p = progress[conceptId];
    const time = new Date(p.lastAccessedAt || p.updatedAt || 0).getTime();

    if (time > latestTime) {
      latestTime = time;
      latestConceptId = Number(conceptId);
    }
  }

  // 2. Traverse meta in order
  for (const subject of Object.keys(meta)) {
    const chapters = meta[subject];

    const sortedChapters = Object.entries(chapters).sort(
      ([, a]: any, [, b]: any) => a.order - b.order
    );

    for (const [chapterId, chapter] of sortedChapters as any){
      const sortedConcepts = chapter.concepts.sort(
        (a: any, b: any) => a.orderIndex - b.orderIndex
      );

      for (let i = 0; i < sortedConcepts.length; i++) {
        const concept = sortedConcepts[i];

        // 3. If this is last interacted → return next
        if (concept.id === latestConceptId) {
          if (sortedConcepts[i + 1]) {
            return {
              conceptId: sortedConcepts[i + 1].id,
              chapterId: Number(chapterId),
              subject,
            };
          }

          // move to next chapter
          const nextChapter = sortedChapters.find(
            ([id]: any) => Number(id) > Number(chapterId)
          );
            
          if (nextChapter) {
            const nextCh = nextChapter[1] as any;
            return {
              conceptId: nextCh.concepts[0]?.id,
              chapterId: Number(nextChapter[0]),
              subject,
            };
          }
        }
      }
    }
  }

  // 4. Fallback → first uncompleted
  for (const subject of Object.keys(meta)) {
    const chapters = meta[subject];

    const sortedChapters = Object.entries(chapters).sort(
      ([, a]: any, [, b]: any) => a.order - b.order
    );

    for (const [chapterId, chapter] of sortedChapters as any){
      const sortedConcepts = chapter.concepts.sort(
        (a: any, b: any) => a.orderIndex - b.orderIndex
      );

      for (const concept of sortedConcepts) {
        if (!progress[concept.id]?.completed) {
          return {
            conceptId: concept.id,
            chapterId: Number(chapterId),
            subject,
          };
        }
      }
    }
  }

  return null; // all done
}