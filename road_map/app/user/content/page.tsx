//./app/user/content/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SubjectCardGrid from "@/app/components/SubjectCardGrid";
import ChapterList from "@/app/components/ChapterList";
import ClusterList from "@/app/components/ClusterList";
import { ChapterRow, ContentRow } from "@/src/types/content";
import { useSearchParams } from "next/navigation";


import Loader from "@/app/components/ui/Loader";

export default function UserPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [chapterRows, setChapterRows] = useState<ChapterRow[]>([]);
  const [conceptsByChapter, setConceptsByChapter] = useState<Record<number, ContentRow[]>>({});
  const [viewMode, setViewMode] = useState<"chapter" | "cluster">("chapter");
  const searchParams = useSearchParams();
  const [targetConceptId, setTargetConceptId] = useState<number | null>(null);
const [targetChapterId, setTargetChapterId] = useState<number | null>(null);
const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);

    const subjectParam = searchParams.get("subject");
    const chapterParam = searchParams.get("chapterId");
    const conceptParam = searchParams.get("conceptId");
    useEffect(() => {
  if (!subjectParam) return;

  setSelectedSubject(subjectParam);

  setTimeout(() => {
    if (chapterParam) {
      setExpandedChapterId(Number(chapterParam));
    }

    if (conceptParam) {
      setTargetConceptId(Number(conceptParam));
    }
  }, 100);
}, [subjectParam, chapterParam, conceptParam]);

  const { data: session, status } = useSession();


  

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

      {/* CONTENT */}
      {selectedSubject && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">

            {/* TOGGLE */}
            <div className="flex gap-2 mb-8 justify-center">
              <button
                onClick={() => setViewMode("chapter")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  viewMode === "chapter"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-200"
                }`}
              >
                📚 Chapters
              </button>

              <button
                onClick={() => setViewMode("cluster")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  viewMode === "cluster"
                    ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg transform scale-105"
                    : "text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-200"
                }`}
              >
                🔗 Clusters
              </button>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              {viewMode === "chapter" ? "Explore Chapters" : "Discover Clusters"}
            </h2>

            {loading ? (
              <div className="py-20 flex justify-center">
                <Loader show={loading} />
              </div>
            ) : (
              <div className="rounded-3xl border border-gray-700 bg-gradient-to-br from-black to-gray-900 p-8 shadow-2xl backdrop-blur-sm">
                {viewMode === "chapter" ? (
                  <ChapterList
                      subject={selectedSubject}
                      rows={chapterRows}
                      mode="user"
                      initialChapterId={chapterParam ? Number(chapterParam) : null}
                      targetConceptId={conceptParam ? Number(conceptParam) : null}
                      targetChapterId={chapterParam ? Number(chapterParam) : null}
                      expandedChapterId={expandedChapterId}
                      setExpandedChapterId={setExpandedChapterId}
                    />
                ) : (
                  <ClusterList
                    groupedChapters={groupedChapters}
                    subject={selectedSubject}
                    targetConceptId={targetConceptId}
                    targetChapterId={targetChapterId}
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