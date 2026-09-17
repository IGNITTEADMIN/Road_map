//@app/components/SubjectCardGrid.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useProgressContext } from "@/src/context/ProgressContext";
import { Subject } from "@/app/components/SubjectTab";

type Track = "JEE" | "BRIDGE";

interface SubjectCard {
  name: Subject;
  icon: string;
}

interface ChapterMetaEntry {
  order: number;
  concepts: { id: number; orderIndex: number }[];
}

type MetaMap = Record<string, Record<number, ChapterMetaEntry>>;

const subjects: SubjectCard[] = [
  { name: "PHYSICS", icon: "/physics_icon.png" },
  { name: "CHEMISTRY", icon: "/chemistry_icon.png" },
  { name: "MATHS", icon: "/maths_icon.png" },
];

interface Props {
  selected: string | null;
  onSelect: (subject: Subject) => void;
  track: Track;
}

export default function SubjectCardGrid({ selected, onSelect, track }: Props) {
  const [meta, setMeta] = useState<MetaMap>({});
  const [metaLoading, setMetaLoading] = useState(true);
  const ctx = useProgressContext();
  const progress = ctx?.progress ?? {};

  // Fetch chapter/concept structure whenever track changes
  useEffect(() => {
    let isActive = true;
    setMetaLoading(true);

    fetch(`/api/progress/meta?track=${track}`)
      .then((res) => res.json())
      .then((data) => {
        if (isActive) setMeta(data);
      })
      .catch((err) => console.error("Failed to fetch progress meta", err))
      .finally(() => {
        if (isActive) setMetaLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [track]);

  function getSubjectStats(subjectName: string) {
    const chapters = meta[subjectName] ?? {};
    const gradedChapters = Object.values(chapters).filter(
      (ch) => ch.concepts.length > 0
    );

    const totalChapters = gradedChapters.length;
    const completedChapters = gradedChapters.filter((ch) =>
      ch.concepts.every((c) => progress[c.id]?.completed)
    ).length;

    const progressPercent =
      totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

    const progressLabel =
      totalChapters === 0
        ? "No chapters yet"
        : completedChapters === 0
        ? "Not started"
        : `${completedChapters} of ${totalChapters} chapters completed`;

    return { totalChapters, completedChapters, progressPercent, progressLabel };
  }

  const hasSelection = Boolean(selected);

  const ordered = hasSelection
    ? [
        subjects.find((s) => s.name === selected)!,
        ...subjects.filter((s) => s.name !== selected),
      ]
    : subjects;

  return (
    <div
      className={`grid gap-4 transition-all duration-500 ease-in-out ${
        hasSelection ? "grid-cols-1 md:grid-cols-[1.6fr_1fr]" : "grid-cols-1 md:grid-cols-3"
      }`}
    >
      {ordered.map((sub) => {
        const isFeatured = hasSelection && sub.name === selected;
        const isCompact = hasSelection && sub.name !== selected;
        const stats = getSubjectStats(sub.name);

        if (isFeatured) {
          return (
            <button
              key={sub.name}
              onClick={() => onSelect(sub.name)}
              className="relative overflow-hidden row-span-2 rounded-3xl py-7 pr-7 pl-9 text-left
              transition-all duration-500 ease-in-out flex flex-col justify-center min-h-[220px]
              border border-orange-500/50 bg-[#0b0b0d]
              animate-[fadeInScale_0.35s_ease-out]"
            >
              {/* Left accent spine */}
              <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-orange-500 to-orange-300" />

              {/* Oversized ghost icon watermark */}
              <Image
                src={sub.icon}
                alt=""
                aria-hidden
                width={220}
                height={220}
                className="pointer-events-none select-none absolute -right-4 top-1/2 -translate-y-1/2
                opacity-[0.15] object-contain invert
                w-[130px] h-[130px] md:w-[220px] md:h-[220px]"
              />

              <div className="relative">
                <p className="text-[13px] font-bold tracking-widest text-orange-500 mb-2">
                  CONTINUE LEARNING
                </p>
                <h3 className="text-3xl font-bold text-white mb-2">{sub.name}</h3>
                <p className="text-xs text-[#77777f]">
                  {metaLoading ? "Loading progress..." : stats.progressLabel}
                </p>
                <div className="h-[3px] w-40 rounded-full bg-[#1c1c1f] mt-3 overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-700 ease-out"
                    style={{ width: `${stats.progressPercent}%` }}
                  />
                </div>
              </div>
            </button>
          );
        }

        if (isCompact) {
          return (
            <button
              key={sub.name}
              onClick={() => onSelect(sub.name)}
              className="rounded-2xl p-4 flex items-center gap-3 text-left transition-all duration-500 ease-in-out
              border border-[#232326] bg-[#131316] hover:border-white/20
              animate-[fadeInScale_0.35s_ease-out]"
            >
              <div className="h-11 w-11 rounded-xl bg-white/15 border border-white/10 flex items-center justify-center shrink-0">
                <Image src={sub.icon} alt={sub.name} width={22} height={22} className="object-contain" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{sub.name}</h4>
                <span className="text-xs text-[#71717a]">
                  {metaLoading ? "Loading..." : stats.progressLabel}
                </span>
              </div>
            </button>
          );
        }

        return (
          <button
            key={sub.name}
            onClick={() => onSelect(sub.name)}
            className="rounded-2xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-200
            border border-[#232326] bg-[#131316] hover:border-orange-500/40 hover:-translate-y-0.5"
          >
            <div className="h-14 w-14 rounded-2xl bg-white/15 border border-white/10 flex items-center justify-center">
              <Image src={sub.icon} alt={sub.name} width={28} height={28} className="object-contain" />
            </div>
            <h3 className="text-sm font-semibold tracking-wide text-white">{sub.name}</h3>
          </button>
        );
      })}
    </div>
  );
}