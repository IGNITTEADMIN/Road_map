///app/components/ConceptTab.tsx
"use client";

import AddConceptDialog from "@/app/components/dialogBoxes/AddConceptDialog";
import Button from "@/app/components/ui/Button";
import { useEffect, useState, useRef } from "react";
import ConceptDisplay from "@/app/components/dialogBoxes/ConceptDisplay";
import QuizPanel from "@/app/components/quiz/QuizPanel";   
import QuizAttemptPanel from "@/app/components/quiz/QuizAttemptPanel";
import { useProgressContext } from "@/src/context/ProgressContext";

interface Props {
  chapterId: number;
  conceptId: number;
  conceptName: string;
  order_index: number;
  video_title: string;
  video_url: string;
  mode?: "admin" | "user";
  targetConceptId?: number | null;
}

export default function ConceptTab({
  conceptId,
  chapterId,
  conceptName,
  order_index,
  video_title,
  video_url,
  targetConceptId = null,
  mode = "admin",
}: Props) {


  const [showConcept, toggleShowConcept] = useState(false);
  const [showQuiz, toggleShowQuiz] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const { progress, toggleComplete, markAccessed } = useProgressContext();

const isCompleted = progress[conceptId]?.completed??false;
const ref = useRef<HTMLDivElement>(null);

function handleToggle() {
  toggleComplete(conceptId, !isCompleted);
}

  function getYoutubeId(url: string) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.searchParams.get("v")) return u.searchParams.get("v") || "";
      return "";
    } catch {
      return "";
    }
  }

  useEffect(() => {
  if (targetConceptId === conceptId) {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}, [targetConceptId, conceptId]);

  const videoId = getYoutubeId(video_url);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <>
        <input
      type="checkbox"
      checked={isCompleted}
      disabled={!progress[conceptId]}
      onChange={(e) => {
        e.stopPropagation();
        handleToggle();
      }}
    />
      {showVideo && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowVideo(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {showConcept && (
        <ConceptDisplay
          conceptId={conceptId}
          conceptName={conceptName}
          chapterId={chapterId}
          orderIndex={order_index}
          videoTitle={video_title}
          videoURL={video_url}
          onClose={() => toggleShowConcept(false)}
        />
      )}

      {showQuiz && mode === "admin" && (
        <QuizPanel conceptId={conceptId} conceptName={conceptName} onClose={() => toggleShowQuiz(false)} />
      )}

      {showQuiz && mode === "user" && (
        <QuizAttemptPanel conceptId={conceptId} conceptName={conceptName} onClose={() => toggleShowQuiz(false)} />
      )}

      <div ref={ref}
        className="group mb-4 rounded-3xl border border-white/10 bg-white/5 p-3 shadow-sm transition hover:-translate-y-1 hover:border-[#ff6b00] hover:bg-white/10"
        onClick={() => {
          if (mode === "admin") toggleShowConcept(true);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.5px', lineHeight: '1.3' }}>
                {conceptName}
              </p>
              <p className="text-sm text-white/60">
                {mode === "admin" ? "Manage concept details" : "View concept details and take quiz"}
              </p>
            </div>
          </div>
          {mode === "user" && (
            <div className="flex items-center gap-2">
              {videoId && (
                <img
                  src={thumbnail}
                  alt="video thumbnail"
                  width={100}
                  className="h-16 w-24 rounded-xl object-cover shadow-sm transition group-hover:scale-105"
                  onClick={(e) => {
                      e.stopPropagation();
                      markAccessed(conceptId);
                      setShowVideo(true);
                  }}
                />
              )}
              <Button
                variant="action"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleShowQuiz(true);
                }}
              >
                Take Quiz
              </Button>
            </div>
          )}
        </div>

        {mode === "admin" && (
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant="action"
              onClick={(e) => {
                e.stopPropagation();
                toggleShowQuiz(true);
              }}
            >
              Add Quiz
            </Button>
          </div>
        )}
      </div>
    </>
  );
}