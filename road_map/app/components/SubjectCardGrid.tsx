import Image from "next/image";

const subjects = [
  { name: "PHYSICS", icon: "/physics_icon.png" },
  { name: "CHEMISTRY", icon: "/chemistry_icon.png" },
  { name: "MATHS", icon: "/maths_icon.png" },
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
          flex flex-col items-center text-center
          ${selected === sub.name ? "border-orange-500 bg-white/10" : ""}`}
        >
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-4">
            <Image
              src={sub.icon}
              alt={sub.name}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          <h3 className="text-lg font-semibold">{sub.name}</h3>
        </div>
      ))}
    </div>
  );
}