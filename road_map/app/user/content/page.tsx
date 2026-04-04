//./app/user/content/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SubjectCardGrid from "@/app/components/SubjectCardGrid";
import ProgressCard from "@/app/components/ProgressCard";
import ChapterList from "@/app/components/ChapterList";
import ClusterList from "@/app/components/ClusterList";
import { ChapterRow, ContentRow } from "@/src/types/content";
import {
  getSubjectProgress,
  getProgressForUser,
  getUserId,
} from "@/src/utils/progress";
import Loader from "@/app/components/ui/Loader";

export default function UserPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [chapterRows, setChapterRows] = useState<ChapterRow[]>([]);
  const [conceptsByChapter, setConceptsByChapter] = useState<Record<number, ContentRow[]>>({});
  const [progress, setProgress] = useState<Record<number, any>>({});
  const [viewMode, setViewMode] = useState<"chapter" | "cluster">("chapter");
  

  const { data: session, status } = useSession();


  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    const load = () => {
      setProgress(getProgressForUser(userId));
    };

    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  // Fetch
  useEffect(() => {
    if (!selectedSubject) return;

    async function fetchData() {
      setLoading(true);

      const res = await fetch(`/api/chapters/get?subject=${selectedSubject}`);
      const chapters = await res.json();
      setChapterRows(chapters);

      const promises = chapters.map((c: ChapterRow) =>
        fetch(`/api/chapters/concepts/get?chapterId=${c.chapterId}`).then((r) =>
          r.json()
        )
      );

      const results = await Promise.all(promises);
      const map: Record<number, ContentRow[]> = {};

      chapters.forEach((c: ChapterRow, i: number) => {
        map[c.chapterId] = results[i];
      });

      setConceptsByChapter(map);
      setLoading(false);
    }

    fetchData();
  }, [selectedSubject]);
  

  const subjectProgress = selectedSubject
    ? getSubjectProgress(chapterRows, conceptsByChapter, progress)
    : 0;

  // ✅ Grouping
  function groupByCluster(chapters: ChapterRow[]) {
    const map: Record<string, ChapterRow[]> = {};

    chapters.forEach((ch) => {
      const key = ch.clusterTag?.trim() || "Others";
      if (!map[key]) map[key] = [];
      map[key].push(ch);
    });

    return map;
  }

  const groupedChapters = groupByCluster(chapterRows);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="bg-[#111111] py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold mb-3">
            Learn Smarter, Track Better 🚀
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore subjects, master concepts, and monitor your progress.
          </p>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold mb-3">Subjects</h2>

          <SubjectCardGrid
            selected={selectedSubject}
            onSelect={setSelectedSubject}
          />
        </div>
      </section>

      {/* PROGRESS */}
      {selectedSubject && (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <ProgressCard progress={subjectProgress} />
          </div>
        </section>
      )}

      {/* CONTENT */}
      {selectedSubject && (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">

            {/* TOGGLE */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setViewMode("chapter")}
                className={`px-4 py-2 rounded-xl border ${
                  viewMode === "chapter"
                    ? "bg-white text-black"
                    : "text-white border-white/20"
                }`}
              >
                Chapters
              </button>

              <button
                onClick={() => setViewMode("cluster")}
                className={`px-4 py-2 rounded-xl border ${
                  viewMode === "cluster"
                    ? "bg-white text-black"
                    : "text-white border-white/20"
                }`}
              >
                Clusters
              </button>
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              {viewMode === "chapter" ? "Chapters" : "Clusters"}
            </h2>

            {loading ? (
              <div className="py-10 flex justify-center">
                <Loader show={loading} />
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                {viewMode === "chapter" ? (
                  <ChapterList
                    subject={selectedSubject}
                    rows={chapterRows}
                    mode="user"
                  />
                ) : (
                  <ClusterList
                    groupedChapters={groupedChapters}
                    subject={selectedSubject}
                  />
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}