// scripts/importVideos.ts
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import ytdl from "ytdl-core";

// Relative import to your queries.ts
import { insertConcept } from "../src/db/queries.js";

// Set to true if you want to fetch video title from YouTube
const FETCH_YOUTUBE_TITLE = true;

// Get video title from YouTube
async function getVideoTitle(url: string): Promise<string | null> {
  try {
    const info = await ytdl.getBasicInfo(url);
    return info.videoDetails.title;
  } catch (err) {
    console.error("Failed to fetch title for:", url, err);
    return null;
  }
}

async function main() {
  // Resolve CSV path relative to this script
  const csvPath = path.resolve(process.cwd(), "Feed_1.csv");

  const parser = fs
    .createReadStream(csvPath)
    .pipe(parse({ columns: true, trim: true }));

  for await (const row of parser) {
    const chapterId = Number(row["Chapter ID"]);
    const orderIndex = Number(row["Order No"]);
    const conceptName = row["Video Name"];
    const videoUrl = row["Video URL"];

    let videoTitle = conceptName;
    if (FETCH_YOUTUBE_TITLE) {
      const fetchedTitle = await getVideoTitle(videoUrl);
      if (fetchedTitle) videoTitle = fetchedTitle;

      // Wait 2 seconds between requests to avoid rate limits
      await new Promise((res) => setTimeout(res, 2000));
    }

    await insertConcept(chapterId, conceptName, orderIndex, videoTitle, videoUrl);
    console.log(`Inserted: Chapter ${chapterId}, Order ${orderIndex}, ${conceptName}`);
  }

  console.log("✅ All concepts imported!");
}

// Run the main function
main().catch((err) => {
  console.error("Error importing videos:", err);
});