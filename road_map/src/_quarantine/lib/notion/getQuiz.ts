import { notion } from "./client";

export async function getNotionQuiz() {
  const databaseId = process.env.NOTION_QUIZ_DATABASE_ID!;

  const pages = [];
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
    const p = page.properties;

    return {
      subject: p.subject.select?.name || "",
      chapter: p.chapter.title?.[0]?.plain_text || "",
      concept: p.concept.rich_text?.[0]?.plain_text || "",
      question_number: p.question_number.number,
      question_type: p.question_type.select?.name,
      question_text: p.question_text.rich_text?.[0]?.plain_text || "",
      question_image: p.question_image.url,

      optionA_text: p.optionA.rich_text?.[0]?.plain_text || null,
      optionA_image: p.optionA_image.url || null,

      optionB_text: p.optionB.rich_text?.[0]?.plain_text || null,
      optionB_image: p.optionB_image.url || null,

      optionC_text: p.optionC.rich_text?.[0]?.plain_text || null,
      optionC_image: p.optionC_image.url || null,

      optionD_text: p.optionD.rich_text?.[0]?.plain_text || null,
      optionD_image: p.optionD_image.url || null,

      answer_key: p.answer_key.select?.name || null,
      numeric_answer: p.numeric_answer.number || null,

      solution_text: p.solution_text.rich_text?.[0]?.plain_text || null,
      solution_image: p.solution_image.url || null,
    };
  });
}
