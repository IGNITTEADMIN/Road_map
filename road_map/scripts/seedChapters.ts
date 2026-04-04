import "dotenv/config";
import { db } from "@/src/db/client";
import { insertChapter } from "@/src/db/queries";
import { chapter } from "@/src/db/schema";
import type { Subject } from "@/src/db/queries";

const chapters: {
  subject: Subject;
  chapterName: string;
  clusterTag: string;
}[] = [
  { subject: "PHYSICS", chapterName: "UNITS AND DIMENSIONS", clusterTag: "Units & Basics" },
  { subject: "PHYSICS", chapterName: "KINEMATICS", clusterTag: "Kinematics" },
  { subject: "PHYSICS", chapterName: "NEWTONS LAWS OF MOTION", clusterTag: "Laws of Motion" },
  { subject: "PHYSICS", chapterName: "WORK, POWER, ENERGY", clusterTag: "Work, Energy & Momentum" },
  { subject: "PHYSICS", chapterName: "COM, COLLISIONS, LINEAR MOMENTUM", clusterTag: "Work, Energy & Momentum" },
  { subject: "PHYSICS", chapterName: "ROTATION", clusterTag: "Rotation" },
  { subject: "PHYSICS", chapterName: "GRAVITATION", clusterTag: "Gravitation" },
  { subject: "PHYSICS", chapterName: "PROPERTIES OF SOLIDS", clusterTag: "Properties of Matter" },
  { subject: "PHYSICS", chapterName: "FLUID MECHANICS", clusterTag: "Properties of Matter" },
  { subject: "PHYSICS", chapterName: "THERMAL PROPERTIES, CALORIOMETRY AND HEAT TRANSFER", clusterTag: "Thermal Physics" },
  { subject: "PHYSICS", chapterName: "THERMODYNAMICS", clusterTag: "Thermal Physics" },
  { subject: "PHYSICS", chapterName: "KTG", clusterTag: "Thermal Physics" },
  { subject: "PHYSICS", chapterName: "SHM", clusterTag: "Oscillations & Waves" },
  { subject: "PHYSICS", chapterName: "WAVES", clusterTag: "Oscillations & Waves" },
  { subject: "PHYSICS", chapterName: "ELECTROSTATICS", clusterTag: "Electrostatics" },
  { subject: "PHYSICS", chapterName: "CAPACITANCE", clusterTag: "Electrostatics" },
  { subject: "PHYSICS", chapterName: "CURRENT ELECTRICITY", clusterTag: "Current Electricity" },
  { subject: "PHYSICS", chapterName: "MOVING CHARGES AND MAGNETISM", clusterTag: "Magnetism" },
  { subject: "PHYSICS", chapterName: "EMI", clusterTag: "EMI & AC" },
  { subject: "PHYSICS", chapterName: "AC", clusterTag: "EMI & AC" },
  { subject: "PHYSICS", chapterName: "EMW", clusterTag: "Electromagnetic Waves" },
  { subject: "PHYSICS", chapterName: "RAY OPTICS", clusterTag: "Optics" },
  { subject: "PHYSICS", chapterName: "WAVE OPTICS", clusterTag: "Optics" },
  { subject: "PHYSICS", chapterName: "DUAL NATURE", clusterTag: "Modern Physics" },
//   { subject: "PHYSICS", chapterName: "ATOMS AND NUCLEI", clusterTag: "Modern Physics" },
//   { subject: "PHYSICS", chapterName: "SEMICONDUCTORS", clusterTag: "Modern Physics" },
];

async function seed() {
  for (const ch of chapters) {
    await insertChapter(ch.subject, ch.chapterName, ch.clusterTag);
    console.log(`Inserted: ${ch.chapterName}`);
  }
  console.log("All Physics chapters seeded!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });