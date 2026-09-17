//./app/user/content/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SubjectCardGrid from "@/app/components/SubjectCardGrid";
import ChapterList from "@/app/components/ChapterList";
import ClusterList from "@/app/components/ClusterList";
import { ChapterRow, ContentRow } from "@/src/types/content";
import { useSearchParams } from "next/navigation";
import { Subject } from "@/app/components/SubjectTab";

import Loader from "@/app/components/ui/Loader";
type Track = "JEE" | "BRIDGE";

export default function UserPage() {
  const [track, setTrack] = useState<Track>("JEE");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(false);
  const [chapterRows, setChapterRows] = useState<ChapterRow[]>([]);
  const [viewMode, setViewMode] = useState<"chapter" | "cluster">("chapter");
  const searchParams = useSearchParams();
  const [targetConceptId, setTargetConceptId] = useState<number | null>(null);
const [targetChapterId, setTargetChapterId] = useState<number | null>(null);
const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);

    const subjectParam = searchParams.get("subject");
    const chapterParam = searchParams.get("chapterId");
    const conceptParam = searchParams.get("conceptId");
    const trackParam = searchParams.get("track");
    useEffect(() => {
        if (!subjectParam) return;

        setSelectedSubject(subjectParam as Subject);
        if (trackParam === "BRIDGE") setTrack("BRIDGE");

        setTimeout(() => {
          if (chapterParam) {
            setExpandedChapterId(Number(chapterParam));
          }

          if (conceptParam) {
            setTargetConceptId(Number(conceptParam));
          }
        }, 100);
    }, [subjectParam, chapterParam, conceptParam, trackParam]);

  const { data: session, status } = useSession();


  

useEffect(() => {
      if (!selectedSubject) return;

      let isActive = true;

      async function fetchData() {
        setLoading(true);
        try {
          const res = await fetch(`/api/chapters/get?subject=${selectedSubject}&track=${track}`);
          const chapters = await res.json();

          if (!isActive) return;
          setChapterRows(chapters);
         
        } catch (err) {
          console.error(err);
        } finally {
          if (isActive) setLoading(false);
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, [selectedSubject, track]);
  
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
  function handleTrackChange(next: Track) { // 🆕
      setTrack(next);
      setSelectedSubject(null);
      setChapterRows([]);
      setViewMode("chapter"); // Bridge has no cluster view, so reset to chapter view
  }

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

      <section className="py-10">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleTrackChange("JEE")}
              className={`rounded-3xl p-6 text-left border transition-all duration-200
              ${
                track === "JEE"
                  ? "border-orange-500/70 bg-orange-500/[0.08]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <p className="text-xs font-bold tracking-widest text-orange-400 mb-1">
                MAIN TRACK
              </p>
              <h3 className="text-xl font-bold text-white mb-1">JEE Prep</h3>
              <p className="text-sm text-gray-400">
                Full syllabus across Physics, Chemistry, and Maths.
              </p>
            </button>

            <button
              onClick={() => handleTrackChange("BRIDGE")}
              className={`rounded-3xl p-6 text-left border transition-all duration-200
              ${
                track === "BRIDGE"
                  ? "border-orange-500/70 bg-orange-500/[0.08]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <p className="text-xs font-bold tracking-widest text-orange-400 mb-1">
                FOUNDATION
              </p>
              <h3 className="text-xl font-bold text-white mb-1">Bridge Course</h3>
              <p className="text-sm text-gray-400">
                Catch up on the basics before diving into JEE prep.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold mb-3">Subjects</h2>

          <SubjectCardGrid
            selected={selectedSubject}
            track={track}
            onSelect={(subject: Subject) => {
              setChapterRows([]);
              setSelectedSubject(subject);
            }}
          />
        </div>
      </section>

      {/* CONTENT */}
      {selectedSubject && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">

            {/* TOGGLE */}
            {track === "JEE" && (
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-1 rounded-full border border-[#232326] bg-[#0f0f11] p-1.5">
                  <button
                    onClick={() => setViewMode("chapter")}
                    className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-200 ${
                      viewMode === "chapter"
                        ? "bg-orange-500 text-black"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Chapters
                  </button>

                  <button
                    onClick={() => setViewMode("cluster")}
                    className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-200 ${
                      viewMode === "cluster"
                        ? "bg-orange-500 text-black"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Clusters
                  </button>
                </div>
              </div>
            )}

            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              {track === "BRIDGE" // 🆕
                ? "Bridge Course Chapters"
                : viewMode === "chapter"
                ? "Explore Chapters"
                : "Discover Clusters"}
            </h2>

            {loading ? (
              <div className="py-20 flex justify-center">
                <Loader show={loading} />
              </div>
            ) : (
              <div className="rounded-3xl border border-gray-700 bg-gradient-to-br from-black to-gray-900 p-8 shadow-2xl backdrop-blur-sm">
                {track === "BRIDGE" || viewMode === "chapter" ? (
                  <ChapterList
                      subject={selectedSubject}
                      rows={chapterRows}
                      mode="user"
                      track={track}
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