//./app/components/SubjectTab.tsx
"use client";

import Image from "next/image";

const SUBJECTS = [
  { name: "PHYSICS", icon: "/physics_icon.png" },
  { name: "CHEMISTRY", icon: "/chemistry_icon.png" },
  { name: "MATHS", icon: "/maths_icon.png" },
] as const;

export type Subject = (typeof SUBJECTS)[number]["name"];

interface Props {
  subject: Subject | null;
  onSubjectChange: (subject: Subject) => void;
}

export default function SubjectTab({ subject, onSubjectChange }: Props) {
  return (
    <div className="mb-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUBJECTS.map((s) => {
          const isSelected = subject === s.name;

          return (
            <button
              key={s.name}
              onClick={() => onSubjectChange(s.name)}
              className={`rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-200 border
              ${
                isSelected
                  ? "border-orange-500/70 bg-orange-500/[0.08]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-200
                ${isSelected ? "bg-orange-500/20" : "bg-white/[0.06]"}`}
              >
                <Image src={s.icon} alt={s.name} width={24} height={24} className="object-contain" />
              </div>
              <h3
                className={`text-sm font-semibold tracking-wide transition-colors duration-200
                ${isSelected ? "text-orange-400" : "text-white"}`}
              >
                {s.name}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}