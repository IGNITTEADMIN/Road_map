export interface ContentRow{
    id:number;
    chapterId: number;
    conceptName:string;
    orderIndex: number;
    videoTitle:string;
    videoUrl:string;
}


export interface ChapterRow {
  chapterId: number;
  subject: string;
  chapterName: string;
}

export interface QuizQuestionRow {
  id?: number;
  _status?: "new" | "updated" | "deleted" | "unchanged";
  conceptId: number;
  question: string;
  questionImage: string | null;
  optionA: string | null;
  optionAImage: string | null;
  optionB: string | null;
  optionBImage: string | null;
  optionC: string | null;
  optionCImage: string | null;
  optionD: string | null;
  optionDImage: string | null;
  answer: string;
  solutionText: string | null;
  solutionImage: string | null;
};