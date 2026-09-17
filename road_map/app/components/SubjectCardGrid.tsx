import Image from "next/image";

interface Subject {
  name: string;
  icon: string;
  tag?: string;
  progressLabel?: string;
  progressPercent?: number;
}

const subjects: Subject[] = [
  {
    name: "PHYSICS",
    icon: "/physics_icon.png",
    tag: "Continue learning",
    progressLabel: "12 of 34 chapters completed",
    progressPercent: 35,
  },
  {
    name: "CHEMISTRY",
    icon: "/chemistry_icon.png",
    tag: "Continue learning",
    progressLabel: "3 of 28 chapters",
    progressPercent: 11,
  },
  {
    name: "MATHS",
    icon: "/maths_icon.png",
    tag: "Continue learning",
    progressLabel: "Not started",
    progressPercent: 0,
  },
];

export default function SubjectCardGrid({ selected, onSelect }: any) {
  const hasSelection = Boolean(selected);

  // Put the selected subject first so CSS grid auto-placement puts it
  // in the tall left slot, and the rest fill the compact right column
  // in their original relative order.
  const ordered = hasSelection
    ? [
        subjects.find((s) => s.name === selected)!,
        ...subjects.filter((s) => s.name !== selected),
      ]
    : subjects;

  return (
    <div
      className={`grid gap-4 transition-all duration-300 ${
        hasSelection ? "grid-cols-1 md:grid-cols-[1.6fr_1fr]" : "grid-cols-1 md:grid-cols-3"
      }`}
    >
      {ordered.map((sub) => {
        const isFeatured = hasSelection && sub.name === selected;
        const isCompact = hasSelection && sub.name !== selected;

        // ----- FEATURED (expanded) card -----
        if (isFeatured) {
          return (
            <button
              key={sub.name}
              onClick={() => onSelect(sub.name)}
              className="row-span-2 rounded-3xl p-7 text-left transition-all duration-200
              flex flex-col justify-between min-h-[220px] border border-orange-500/70
              bg-gradient-to-br from-[#1a1424] to-[#241b3a]
              shadow-[0_0_0_1px_rgba(249,115,22,0.15)]"
            >
              <div>
                {sub.tag && (
                  <p className="text-[11px] font-bold tracking-widest text-orange-400 mb-2">
                    {sub.tag.toUpperCase()}
                  </p>
                )}
                <h3 className="text-3xl font-bold text-white mb-2">{sub.name}</h3>
                {sub.progressLabel && (
                  <p className="text-xs text-[#a8a2c0]">{sub.progressLabel}</p>
                )}
                {typeof sub.progressPercent === "number" && (
                  <div className="h-1 w-40 rounded-full bg-white/10 mt-3 overflow-hidden">
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: `${sub.progressPercent}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="self-end h-14 w-14 rounded-2xl bg-white/15 border border-white/10 flex items-center justify-center">
  <Image src={sub.icon} alt={sub.name} width={30} height={30} className="object-contain" />
</div>
            </button>
          );
        }

        // ----- COMPACT (side) card, shown only once something is selected -----
        if (isCompact) {
          return (
            <button
              key={sub.name}
              onClick={() => onSelect(sub.name)}
              className="rounded-2xl p-4 flex items-center gap-3 text-left transition-all duration-200
              border border-[#232326] bg-[#131316] hover:border-white/20"
            >
              <div className="h-11 w-11 rounded-xl bg-white/15 border border-white/10 flex items-center justify-center shrink-0">
  <Image src={sub.icon} alt={sub.name} width={22} height={22} className="object-contain" />
</div>
              <div>
                <h4 className="text-sm font-semibold text-white">{sub.name}</h4>
                {sub.progressLabel && (
                  <span className="text-xs text-[#71717a]">{sub.progressLabel}</span>
                )}
              </div>
            </button>
          );
        }

        // ----- EQUAL (default) card, shown before anything is selected -----
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