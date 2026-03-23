import { notion } from "./client";

export async function getNotionContent() {
  const databaseId = process.env.NOTION_CONTENT_DATABASE_ID!;

  const pages: any[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.databases.query({
  database_id: databaseId,
  start_cursor: cursor,
});

    pages.push(...response.results);
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return pages.map((page: any) => {
    const props = page.properties;

    return {
      subject: props.subject?.select?.name || "",
      chapter: props.chapter?.title?.[0]?.plain_text || "",
      concept: props.concept?.rich_text?.[0]?.plain_text || "",
      order_index: props.order_index?.number || 0,
      video_title: props.video_title?.rich_text?.[0]?.plain_text || "",
      video_url: props.video_url?.url || "",
    };
  });
}
