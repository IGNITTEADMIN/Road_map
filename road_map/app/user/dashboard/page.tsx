// // app/user/dashboard/page.tsx
// "use client";

// import { useMemo } from "react";
// import { useProgress } from "@/src/hooks/useProgress";
// import ContinueLearning from "@/app/components/dashboard/ContinueLearning";
// import StatsCard from "@/app/components/dashboard/StatsCard";
// import StreakCard from "@/app/components/dashboard/StreakCard";
// import SubjectProgress from "@/app/components/dashboard/SubjectProgress";
// import { ChapterRow, ContentRow } from "@/src/types/content";

// interface Props {
//   chapterRows: ChapterRow[];
//   conceptsByChapter: Record<number, ContentRow[]>;
//   setSelectedSubject: (s: string) => void;
//   setExpandedChapterId: (id: number) => void;
//   setTargetConceptId: (id: number) => void;
// }

// export default function Dashboard({
//   chapterRows,
//   conceptsByChapter,
//   setSelectedSubject,
//   setExpandedChapterId,
//   setTargetConceptId,
// }: Props) {
//   const { progress, streak } = useProgress();

//   // 🔹 Flatten all concepts
//   const allConcepts = useMemo(() => {
//     return Object.values(conceptsByChapter).flat();
//   }, [conceptsByChapter]);

//   return (
//     <div className="space-y-6">

//       {/* 🔹 Continue Learning */}
//       <ContinueLearning
//         allConcepts={allConcepts}
//         chapters={chapterRows} // ✅ IMPORTANT
//         setSelectedSubject={setSelectedSubject}
//         setExpandedChapterId={setExpandedChapterId}
//         setTargetConceptId={setTargetConceptId}
//       />

//       {/* 🔹 Stats */}
//       <StatsCard
//         allConcepts={allConcepts}
//         progress={progress}
//       />

//       {/* 🔹 Subject Progress */}
//       <SubjectProgress
//         chapters={chapterRows}
//         conceptsByChapter={conceptsByChapter}
//         progress={progress}
//       />

//       {/* 🔹 Streak */}
//       <StreakCard streak={streak} />

//     </div>
//   );
// }
"use client";

import { useProgressContext } from "@/src/context/ProgressContext";
import { useProgressMeta } from "@/src/hooks/useProgressMeta";
import { computeStats } from "@/src/utils/progressUtils";
import ContinueLearning from "@/app/components/dashboard/ContinueLearning";

export default function DashboardPage() {
  const { progress, streak, loading: progressLoading } = useProgressContext();
  const { meta, loading: metaLoading } = useProgressMeta();

  if (progressLoading || metaLoading) {
    return <div>Loading...</div>;
  }

  if (!meta) {
    return <div>Error loading data</div>;
  }

  const { totalConcepts, completedConcepts, subjectStats } =
    computeStats(meta, progress);

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Total Concepts: {totalConcepts}</p>
      <p>Completed Concepts: {completedConcepts}</p>

      <p>Physics: {subjectStats.PHYSICS.completed} / {subjectStats.PHYSICS.total}</p>
      <p>Chemistry: {subjectStats.CHEMISTRY.completed} / {subjectStats.CHEMISTRY.total}</p>
      <p>Maths: {subjectStats.MATHS.completed} / {subjectStats.MATHS.total}</p>

      <p>Streak: {streak}</p>
      <ContinueLearning progress={progress} />
    </div>
  );
}