// scripts/seedConcepts.ts
import "dotenv/config";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { insertConcept } from "../src/db/queries";
import ytdl from "ytdl-core";
import type { ContentRow } from "../src/types/content"; 

const FETCH_YOUTUBE_TITLE = false;


const csvData = fs.readFileSync("Feed_3.csv", "utf-8");
const rows = parse(csvData, { columns: true, trim: true }) as unknown[];


const contentRows: ContentRow[] = rows.map((row) => {
  const r = row as Record<string, string>;
  return {
    id: 0,
    chapterId: Number(r["Chapter ID"]),
    conceptName: r["Video Name"],
    orderIndex: Number(r["Order No"]),
    videoTitle: r["Video Name"], 
    videoUrl: r["Video URL"],
  };
});

async function getVideoTitle(url: string): Promise<string | null> {
  try {
    const info = await ytdl.getBasicInfo(url);
    return info.videoDetails.title;
  } catch (err) {
    console.error("Failed to fetch title for:", url, err);
    return null;
  }
}

async function seed() {
  for (const row of contentRows) {
    if (FETCH_YOUTUBE_TITLE) {
      const fetchedTitle = await getVideoTitle(row.videoUrl);
      if (fetchedTitle) row.videoTitle = fetchedTitle;
      await new Promise((res) => setTimeout(res, 2000));
    }

    await insertConcept(
      row.chapterId,
      row.conceptName,
      row.orderIndex,
      row.videoTitle,
      row.videoUrl
    );

    console.log(`Inserted: Chapter ${row.chapterId}, Order ${row.orderIndex}, ${row.conceptName}`);
  }

  console.log("✅ All concepts imported!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});