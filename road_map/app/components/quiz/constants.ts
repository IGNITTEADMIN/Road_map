// components/quiz/constants.ts

import { Question } from "./types";

export const defaultQuestion: Question = {
  text: "",
  imageUrl: "",
  solutionImage: "",
  type: "mcq",
  options: [
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  correctIndex: 0,
};