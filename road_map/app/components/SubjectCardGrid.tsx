const subjects = [
  { name: "PHYSICS", icon: "⚛️" },
  { name: "CHEMISTRY", icon: "🧪" },
  { name: "MATHS", icon: "📘" },
];

export default function SubjectCardGrid({ selected, onSelect }: any) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {subjects.map((sub) => (
        <div
          key={sub.name}
          onClick={() => onSelect(sub.name)}
          className={`cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 transition
          hover:-translate-y-1 hover:border-orange-500/60 hover:bg-white/10
          ${selected === sub.name ? "border-orange-500 bg-white/10" : ""}`}
        >
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center text-2xl mb-4">
            {sub.icon}
          </div>

          <h3 className="text-lg font-semibold">{sub.name}</h3>
          <p className="text-gray-400 text-sm mt-1">
            Explore chapters & concepts
          </p>
        </div>
      ))}
    </div>
  );
}