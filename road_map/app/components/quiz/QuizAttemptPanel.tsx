//./app/components/quiz/QuizAttemptPanel.tsx
"use client";

import { useState, useEffect } from "react";
import { Question } from "./types";
import { mapRowToQuestion } from "./mappers";
import QuestionView from "./QuestionView";
import ProgressBar from "./ProgressBar";
import QuestionList from "./QuestionList";
import { useProgressContext } from "@/src/context/ProgressContext";
import Button from "@/app/components/ui/Button";

interface Props {
  conceptId: number;
  conceptName?: string;
  onClose: () => void;
}

export default function QuizAttemptPanel({
  conceptId,
  conceptName,
  onClose,
}: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [timeLeft, setTimeLeft] = useState(120);
  const [quizFinished, setQuizFinished] = useState(false);
  const { attemptQuiz } = useProgressContext();

  

  function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctIndex) score++;
    });
    return score;
  }

  useEffect(() => {
    async function loadQuiz() {
      const res = await fetch(`/api/quiz/get?conceptId=${conceptId}`);
      if (!res.ok) return;

      const data = await res.json();
      const mapped = data.map(mapRowToQuestion);
      setQuestions(mapped);
    }

    loadQuiz();
  }, [conceptId]);
  

  useEffect(() => {
  if (quizFinished) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        setQuizFinished(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [quizFinished]);

useEffect(() => {
  if (!quizFinished) return;

  const score = calculateScore();

  attemptQuiz(conceptId, score);
}, [quizFinished]);

  function handleSelect(optionIndex: number) {
    setSelectedOption(optionIndex);

    setAnswers((prev) => ({
      ...prev,
      [current]: optionIndex,
    }));
  }



  function nextQuestion() {
  if (current + 1 < questions.length) {
    const next = current + 1;
    setCurrent(next);
    setSelectedOption(answers[next] ?? null);
  }
}

  function handleSubmitQuiz() {
    setQuizFinished(true);
  }

  if (quizFinished) {
    const score = calculateScore();

    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur">
          <h2 className="text-2xl font-bold">Quiz Finished 🎉</h2>

          <p className="mt-2 text-lg">
            Score: <span className="font-semibold">{score}</span> / {questions.length}
          </p>

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Close Quiz</Button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
       <div className="w-full max-w-3xl max-h-[90vh] flex items-start justify-center">
        <div className="scale-90 origin-top w-full overflow-y-auto rounded-3xl border border-white/10 bg-white/5 p-3 shadow-xl backdrop-blur">      
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* LEFT SIDEBAR */}
          <div className="space-y-4 flex flex-col justify-center">
            <QuestionList
              questions={questions}
              current={current}
              answers={answers}
              onJump={(i) => setCurrent(i)}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-2 mb-5">
              <h2 className="text-2xl font-semibold text-white p-2">
                {conceptName ?? "Quiz"}
              </h2>
              <ProgressBar current={current} total={questions.length} />
            </div>

            <QuestionView
              question={q}
              current={current}
              total={questions.length}
              selected={selectedOption}
              onSelect={handleSelect}
            />

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="mt-4 flex justify-between">
                  <Button
                    onClick={nextQuestion}
                    disabled={selectedOption === null || current === questions.length - 1}
                  >
                    Next Question
                  </Button>

                  {current === questions.length - 1 && (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={selectedOption === null}
                    >
                      Submit Quiz
                    </Button>
                  )}
                </div>
                

              
            </div>
          </div>
        </div>
      
    </div>
    </div></div>
  );
}
