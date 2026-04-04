//./app/components/dashboard/SubjectProgress.tsx
"use client";

import { useContentData } from "@/src/hooks/useContentData";
import { useEffect, useState } from "react";
import {
  getSubjectProgress,
  getProgressForUser,
  getUserId,
} from "@/src/utils/progress";

export default function SubjectProgress() {
  const [data, setData] = useState<Record<string, number>>({});
  const { chapters, conceptsByChapter } = useContentData();

  useEffect(() => {
  const userId = getUserId();
  if (!userId) return;

  if (!chapters.length) return;

  const progress = getProgressForUser(userId);

  const subjects = ["PHYSICS", "CHEMISTRY", "MATHS"];
  const result: Record<string, number> = {};

  subjects.forEach((subject) => {
    const subjectChapters = chapters.filter(
      (c: any) => c.subject === subject
    );

    result[subject] = getSubjectProgress(
      subjectChapters,
      conceptsByChapter,
      progress
    );
  });

  setData(result);
}, [chapters, conceptsByChapter]);

  return (
    <div className="p-4 border rounded-xl space-y-2">
      <p className="text-white/80">Subject Progress</p>

      {Object.entries(data).map(([subject, value]) => (
        <div key={subject}>
          <p className="text-sm">{subject}</p>
          <div className="bg-white/10 h-2 rounded">
            <div
              className="bg-yellow-500 h-2 rounded"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}