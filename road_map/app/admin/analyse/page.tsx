"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

type Track = "JEE" | "BRIDGE";

interface VideoStat {
  concept: string;
  accesses: number;
  pct: number;
}

interface Attempt {
  concept: string;
  n: number;
  score: number;
  time: string;
  date: string;
  trend: "up" | "down" | "flat";
}

interface StudentAnalyse {
  id: number;
  name: string;
  email: string;
  completion: number;
  avgScore: number;
  streak: number;
  lastActive: string | null;
  idleDays: number | null;
  status: "ok" | "idle" | "risk";
  videos: VideoStat[];
  pacing: number[];
  attempts: Attempt[];
  missed: { q: string; rate: string }[];
  activity: number[];
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function flagClass(status: string) {
  if (status === "risk") return "bg-red-500/10 text-red-400";
  if (status === "idle") return "bg-amber-500/10 text-amber-400";
  return "bg-emerald-500/10 text-emerald-400";
}

function relativeLastActive(lastActive: string | null) {
  if (!lastActive) return "Never";
  const diffMs = Date.now() - new Date(lastActive).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function AnalysePage() {
  const [track, setTrack] = useState<Track>("JEE");
  const [students, setStudents] = useState<StudentAnalyse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [exportNote, setExportNote] = useState(false);
  const [range, setRange] = useState<"7d" | "14d" | "30d" | "90d" | "all">("all");

  useEffect(() => {
  let isActive = true;
  setLoading(true);

  fetch(`/api/admin/analyse?track=${track}&range=${range}`)
    .then((res) => res.json())
    .then((data: StudentAnalyse[]) => {
      if (!isActive) return;
      setStudents(data);
      setSelectedId(data[0]?.id ?? null);
    })
    .catch((err) => console.error("Failed to load analyse data", err))
    .finally(() => {
      if (isActive) setLoading(false);
    });

  return () => {
    isActive = false;
  };
}, [track, range]);

  const selected = students.find((s) => s.id === selectedId) ?? null;

  const avgCompletion = students.length
    ? Math.round(students.reduce((s, x) => s + x.completion, 0) / students.length)
    : 0;
  const avgScore = students.length
    ? Math.round(students.reduce((s, x) => s + x.avgScore, 0) / students.length)
    : 0;
  const idleCount = students.filter((s) => (s.idleDays ?? 0) >= 5).length;
  const riskCount = students.filter((s) => s.status === "risk").length;

  function handleExport() {
    const wb = XLSX.utils.book_new();

    const overview = students.map((s) => ({
      Name: s.name,
      Email: s.email,
      Completion_pct: s.completion,
      Avg_Quiz_Score: s.avgScore,
      Streak_Days: s.streak,
      Idle_Days: s.idleDays,
      Status: s.status,
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(overview), "Overview");

    const video = students.flatMap((s) =>
      s.videos.map((v) => ({
        Student: s.name,
        Concept: v.concept,
        Times_Watched: v.accesses,
        Completion_pct: v.pct,
      }))
    );
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(video), "Video Engagement");

    const quiz = students.flatMap((s) =>
      s.attempts.map((a) => ({
        Student: s.name,
        Concept: a.concept,
        Attempt: a.n,
        Score_pct: a.score,
        Time_Taken: a.time,
        Date: a.date,
        Trend: a.trend,
      }))
    );
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(quiz), "Quiz Attempts");

    const pacing = students.map((s) => {
      const row: Record<string, string | number> = { Student: s.name };
      s.pacing.forEach((v, i) => (row[`Week_${i + 1}`] = v));
      return row;
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(pacing), "Pacing");

    XLSX.writeFile(wb, `OB_cohort_analytics_${track}.xlsx`);
    setExportNote(true);
    setTimeout(() => setExportNote(false), 2600);
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
       <div className="flex items-center gap-8 flex-wrap tracking-wide mb-8">
        <div className="flex-1" />
  {/* Track tabs */}
  <div className="flex items-center gap-6">
    {(["JEE", "BRIDGE"] as Track[]).map((t) => (
      <button
        key={t}
        onClick={() => setTrack(t)}
        className={`text-sm font-semibold pb-1.5 border-b-2 transition ${
          track === t
            ? "text-white border-orange-500"
            : "text-gray-500 border-transparent hover:text-gray-300"
        }`}
      >
        {t}
      </button>
    ))}
  </div>

  {/* Divider */}
  <div className="h-5 w-px bg-[#232326]" />

  {/* Range tabs */}
  <div className="flex items-center gap-6">
    {([
      { key: "7d", label: "1W" },
      { key: "14d", label: "2W" },
      { key: "30d", label: "1M" },
      { key: "90d", label: "3M" },
      { key: "all", label: "All" },
    ] as const).map((r) => (
      <button
        key={r.key}
        onClick={() => setRange(r.key)}
        className={`text-sm font-semibold pb-1.5 border-b-2 transition ${
          range === r.key
            ? "text-white border-orange-500"
            : "text-gray-500 border-transparent hover:text-gray-300"
        }`}
      >
        {r.label}
      </button>
    ))}
  </div>

  {/* Export button */}
  <div className="relative ml-auto">
    <button
      onClick={handleExport}
      disabled={!students.length}
      className="bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-sm px-6 py-2.5 rounded-full hover:brightness-110 transition tracking-normal"
    >
      Export report
    </button>
    {exportNote && (
      <span className="absolute right-0 top-full mt-2 text-xs text-gray-500 whitespace-nowrap">
        Downloaded — one sheet per metric group
      </span>
    )}
  </div>
</div>

        {loading ? (
          <p className="text-gray-400 py-20 text-center">Loading analyse data...</p>
        ) : students.length === 0 ? (
          <p className="text-gray-400 py-20 text-center">
            No students tagged as OB yet. Tag a student from the Students page to see data here.
          </p>
        ) : (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-9">
              <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded-2xl p-5">
                <p className="text-[11px] text-gray-500 font-semibold mb-2">STUDENTS TRACKED</p>
                <p className="text-2xl font-bold">{students.length}</p>
                <p className="text-xs text-gray-400 mt-1.5">Tagged OB</p>
              </div>
              <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded-2xl p-5">
                <p className="text-[11px] text-gray-500 font-semibold mb-2">AVG COMPLETION</p>
                <p className="text-2xl font-bold">{avgCompletion}%</p>
                <p className="text-xs text-gray-400 mt-1.5">Across all concepts</p>
              </div>
              <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded-2xl p-5">
                <p className="text-[11px] text-gray-500 font-semibold mb-2">AVG QUIZ SCORE</p>
                <p className="text-2xl font-bold">{avgScore}%</p>
                <p className="text-xs text-emerald-400 mt-1.5">Across all attempts</p>
              </div>
              <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded-2xl p-5">
                <p className="text-[11px] text-gray-500 font-semibold mb-2">IDLE 5+ DAYS</p>
                <p className="text-2xl font-bold">{idleCount}</p>
                <p className={`text-xs mt-1.5 ${riskCount ? "text-amber-400" : "text-gray-400"}`}>
                  {riskCount} at elevated risk
                </p>
              </div>
            </div>

            {/* Roster */}
            <h2 className="text-base font-bold mb-3">OB cohort</h2>
            <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded-2xl overflow-hidden mb-10">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px]">
                  <thead>
                    <tr className="border-b border-[#1c1c1f] text-left text-[11px] text-gray-500 font-semibold">
                      <th className="p-4">Student</th>
                      <th className="p-4">Completion</th>
                      <th className="p-4">Avg quiz score</th>
                      <th className="p-4">Streak</th>
                      <th className="p-4">Last active</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr
                        key={s.id}
                        onClick={() => setSelectedId(s.id)}
                        className={`border-b border-[#1c1c1f] last:border-none cursor-pointer transition hover:bg-[#131316] ${
                          s.id === selectedId ? "bg-orange-500/5" : ""
                        }`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2.5">
                            <div className="h-7.5 w-7.5 rounded-full bg-[#0f0f11] border border-[#232326] flex items-center justify-center text-[11px] font-bold text-gray-400 shrink-0">
                              {initials(s.name)}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{s.name}</p>
                              <p className="text-[11px] text-gray-500">{s.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 min-w-[110px]">
                            <div className="flex-1 h-1 rounded-full bg-[#1c1c1f] overflow-hidden">
                              <div className="h-full bg-orange-500" style={{ width: `${s.completion}%` }} />
                            </div>
                            <span className="text-xs">{s.completion}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{s.avgScore}%</td>
                        <td className="p-4 text-sm">{s.streak}d</td>
                        <td className="p-4 text-sm text-gray-400">{relativeLastActive(s.lastActive)}</td>
                        <td className="p-4">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${flagClass(s.status)}`}>
                            {s.status === "ok" ? "Active" : `${s.idleDays}d idle`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail */}
            {selected && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-[#0f0f11] border border-[#232326] flex items-center justify-center text-sm font-bold text-gray-400">
                    {initials(selected.name)}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{selected.name}</h2>
                    <p className="text-xs text-gray-500">{selected.email}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-4 mb-4">
                  <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded-2xl p-5">
                    <h3 className="text-sm font-bold mb-1">Video engagement</h3>
                    <p className="text-xs text-gray-500 mb-4">Access count and completion per concept</p>
                    {selected.videos.length === 0 ? (
                      <p className="text-xs text-gray-500">No video activity yet.</p>
                    ) : (
                      selected.videos.map((v, i) => (
                        <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#1c1c1f] last:border-none">
                          <span className="flex-1 text-[13px]">{v.concept}</span>
                          <span className="text-[11px] text-gray-400 bg-[#0f0f11] px-2 py-0.5 rounded-full whitespace-nowrap">
                            {v.accesses}× watched
                          </span>
                          <div className="w-[70px] h-1 rounded-full bg-[#1c1c1f] overflow-hidden">
                            <div className="h-full bg-orange-500" style={{ width: `${v.pct}%` }} />
                          </div>
                          <span className="text-xs font-semibold w-10 text-right">{v.pct}%</span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded-2xl p-5">
                    <h3 className="text-sm font-bold mb-1">Pacing</h3>
                    <p className="text-xs text-gray-500 mb-4">Concepts completed, last 8 weeks</p>
                    <div className="flex items-end gap-2 h-[100px]">
                      {selected.pacing.map((v, i) => {
                        const max = Math.max(...selected.pacing, 1);
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                            <div
                              className={`w-full rounded-t ${v > 0 ? "bg-orange-500/30" : "bg-[#1c1c1f]"}`}
                              style={{ height: v === 0 ? "2px" : `${(v / max) * 100}%` }}
                            />
                            <span className="text-[10px] text-gray-500">W{i + 1}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-4 mb-4">
                  <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded-2xl p-5">
                    <h3 className="text-sm font-bold mb-1">Quiz attempts</h3>
                    <p className="text-xs text-gray-500 mb-4">Every attempt, with time taken and score trend</p>
                    {selected.attempts.length === 0 ? (
                      <p className="text-xs text-gray-500">No quiz attempts yet.</p>
                    ) : (
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-left text-gray-500 border-b border-[#1c1c1f]">
                            <th className="py-2">Concept</th>
                            <th className="py-2">#</th>
                            <th className="py-2">Score</th>
                            <th className="py-2">Time</th>
                            <th className="py-2">Date</th>
                            <th className="py-2">Trend</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selected.attempts.map((a, i) => (
                            <tr key={i} className="border-b border-[#1c1c1f] last:border-none">
                              <td className="py-2.5">{a.concept}</td>
                              <td className="py-2.5">{a.n}</td>
                              <td className="py-2.5">{a.score}%</td>
                              <td className="py-2.5">{a.time}</td>
                              <td className="py-2.5">{a.date}</td>
                              <td className="py-2.5">
                                <span className={a.trend === "up" ? "text-emerald-400" : a.trend === "down" ? "text-red-400" : "text-gray-500"}>
                                  {a.trend === "up" ? "↑" : a.trend === "down" ? "↓" : "–"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded-2xl p-5">
                    <h3 className="text-sm font-bold mb-1">Frequently missed questions</h3>
                    <p className="text-xs text-gray-500 mb-4">Across all attempts</p>
                    <p className="text-xs text-gray-500">
                      Not tracked yet — needs per-question answer logging.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded-2xl p-5">
                  <h3 className="text-sm font-bold mb-1">Activity, last 45 days</h3>
                  <p className="text-xs text-gray-500 mb-4">Each cell is one day · darker = more events</p>
                  <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(15, 1fr)" }}>
                    {selected.activity.map((v, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-sm"
                        style={{
                          background:
                            v === 0 ? "#131316" : v === 1 ? "rgba(255,107,26,0.12)" : v === 2 ? "rgba(255,107,26,0.35)" : "#ff6b1a",
                        }}
                      />
                    ))}
                  </div>
                  {selected.idleDays !== null && selected.idleDays >= 5 && (
                    <p className="text-xs text-amber-400 mt-3">
                      ⚠ Longest idle gap: {selected.idleDays} days — no activity in that window.
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}