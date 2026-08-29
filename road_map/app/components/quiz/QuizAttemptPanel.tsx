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
    const total = questions.length;
    const percent = total > 0 ? Math.round((score / total) * 100) : 0;

    const tone =
      percent >= 80
        ? { ring: "#22c55e", label: "Excellent work! 🔥", chip: "text-green-400" }
        : percent >= 50
        ? { ring: "#ff6b00", label: "Good job — keep improving 🚀", chip: "text-orange-400" }
        : { ring: "#ef4444", label: "Keep practicing, you'll get there 💪", chip: "text-red-400" };

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111113] p-8 shadow-2xl text-white text-center">
          <p className="text-xs font-semibold tracking-widest text-white/40 mb-2">
            {conceptName?.toUpperCase() ?? "QUIZ"}
          </p>
          <h2 className="text-2xl font-bold mb-1">Quiz Completed</h2>
          <p className="text-sm text-white/60 mb-8">Here's how you did</p>

          {/* Score ring */}
          <div className="flex justify-center mb-8">
            <div
              className="h-32 w-32 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(${tone.ring} ${percent}%, rgba(255,255,255,0.08) ${percent}%)`,
              }}
            >
              <div className="h-24 w-24 rounded-full bg-[#111113] flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{score}/{total}</span>
                <span className="text-xs text-white/50">{percent}%</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-white/50 mb-1">Correct</p>
              <p className="text-xl font-semibold text-green-400">{score}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-white/50 mb-1">Wrong</p>
              <p className="text-xl font-semibold text-red-400">{total - score}</p>
            </div>
          </div>

          <p className={`mb-8 text-sm font-medium ${tone.chip}`}>{tone.label}</p>

          <Button onClick={onClose} variant="action">
            Close
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;

  return (
    <div className="fixed inset-4 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full h-full max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#111113] p-5 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* LEFT SIDEBAR */}
          <div className="space-y-4 flex flex-col justify-center">
            <QuestionList
              questions={questions}
              current={current}
              answers={answers}
              onJump={(i) => {
                setCurrent(i);
                setSelectedOption(answers[i] ?? null); // fixes the answer-restore bug
              }}
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

            <div className="mt-4 flex justify-between">
  {current === questions.length - 1 ? (
    <Button onClick={handleSubmitQuiz} disabled={selectedOption === null}>
      Submit Quiz
    </Button>
  ) : (
    <Button onClick={nextQuestion} disabled={selectedOption === null}>
      Next Question
    </Button>
  )}
</div>
          </div>
        </div>
      </div>
    </div>
  );
}