// components/quiz/AnswerSolutionEditor.tsx

import { Question } from "./types";
import { uploadToCloudinary } from "./cloudinary";

interface Props {
  question: Question;
  onChange: (q: Question) => void;
}

export default function SolutionEditor({ question, onChange }: Props) {
  const change = (patch: Partial<Question>) =>
    onChange({ ...question, ...patch });

  return (
    <div className="space-y-4 mt-4 border-t border-white/10 pt-4">

      <div>
        <label className="text-white font-medium block mb-2">Correct Answer:</label>
        <div className="flex gap-2">
          {question.options.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => change({ correctIndex: idx })}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                question.correctIndex === idx
                  ? "bg-[#ff6b00] text-black border-[#ff6b00]"
                  : "bg-white/5 text-white border-white/10 hover:border-[#ff6b00] hover:text-[#ff6b00]"
              }`}
            >
              {["A", "B", "C", "D"][idx]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-white font-medium block mb-2">Solution:</label>
        <textarea
          value={question.solutionText || ""}
          onChange={(e) => change({ solutionText: e.target.value })}
          placeholder="Explain the answer..."
          className="w-full h-24 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white resize-none focus:border-[#ff6b00] focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="text-white font-medium block mb-2">Solution Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const url = await uploadToCloudinary(f, "Solutions");
            if (url) change({ solutionImage: url });
          }}
          className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ff6b00] file:text-black file:font-semibold hover:file:bg-orange-500 transition-colors"
        />
      </div>
    </div>
  );
}