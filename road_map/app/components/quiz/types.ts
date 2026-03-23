// components/quiz/types.ts

export interface Option {
  text: string;
  imageUrl?: string;
}

export type Question = {
  text: string;
  imageUrl?: string;

  options: Option[];

  correctIndex: number;

  solutionText?: string;
  solutionImage?: string;

  type: "mcq";
};

export type UploadKind = "Questions" | "Options" | "Solutions";