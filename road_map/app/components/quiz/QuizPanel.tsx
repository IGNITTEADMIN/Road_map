//./api/components/quiz/QuestionPanel.tsx
"use client";

import React, { useState,useEffect } from "react";
import { Question } from "./types";
import { defaultQuestion } from "./constants";
import QuestionNavigator from "./QuestionNavigator";
import QuestionEditor from "./QuestionEditor";
import { mapRowToQuestion, mapQuestionToRow } from "./mappers";
import Button from "@/app/components/ui/Button";

interface Props {
  conceptId: number;
  conceptName?: string;
  onClose: () => void;
}

export default function QuizPanel({
  conceptId,
  conceptName,
  onClose,
}: Props) {
  const [questions, setQuestions] = useState<Question[]>([defaultQuestion]);
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState("2:00");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const initialLoadRef = React.useRef(true);

  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
    } else{
      setDirty(true);
    }
  },[questions]);

  useEffect(() => {
  async function loadQuiz() {
    try {
      const res = await fetch(`/api/quiz/get?conceptId=${conceptId}`);
      if (!res.ok) return;

      const data = await res.json();
        console.log(data);

      if (Array.isArray(data)) {
        const mapped = data.map(mapRowToQuestion);
        if (mapped.length > 0) {
          setQuestions(mapped);
        }
      }
    } catch (err) {
      console.error("Failed to load quiz", err);
    }
  }

  loadQuiz();
}, [conceptId]);

  const updateCurrent = (q: Question) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[current] = q;
      return copy;
    });
  };


  const addQuestion = () => {
    setQuestions(prev => [...prev, { ...defaultQuestion }]);
    setCurrent(questions.length);
  };

  const handleSave = async () => {
        if (saving) return;
        setSaving(true);

        try {
          const payload = questions.map(q =>
            mapQuestionToRow(q, conceptId)
          );

          const result=await fetch(`/api/quiz/update?conceptId=${conceptId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if(!result.ok){
            throw new Error("Failed to save quiz");
          }

          setDirty(false);
        } finally {
          setSaving(false);
        }
  };

      const handleClose = async () => {
        if (dirty) {
          const ok = confirm("You have unsaved changes. Save before closing?");
          if (!ok) return;
          await handleSave();
        }
        onClose();
      };

  const allValid = questions.every(q => {
    if (!q.text.trim()) return false;
    if (!q.options.every(o => o.text.trim())) return false;
    if (q.correctIndex < 0) return false;
    return true;
});

  return (
    <div className="fixed inset-4 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full h-full max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-white">Quiz for {conceptName ?? `#${conceptId}`}</h2>
            <Button onClick={handleClose} variant="action">Close</Button>
          </div>

          <div className="flex flex-1 gap-6 overflow-hidden">
            <QuestionNavigator
              questions={questions}
              current={current}
              setCurrent={setCurrent}
              addQuestion={addQuestion}
            />

            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
              <div className="flex items-center gap-4">
                <label className="text-white font-medium">Timer:</label>
                <input
                  value={timer}
                  onChange={e => setTimer(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white"
                />
              </div>

              <div className="flex-1 overflow-auto">
                <QuestionEditor
                  question={questions[current]}
                  onChange={updateCurrent}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="action" onClick={handleSave} disabled={!dirty || !allValid}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}