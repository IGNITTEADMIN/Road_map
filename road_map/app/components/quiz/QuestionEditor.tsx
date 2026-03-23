//./api/components/quiz/QuestionEditor.tsx
import { Question } from "./types";
import OptionEditor from "./OptionEditor";
import SolutionEditor from "./SolutionEditor";
import { uploadToCloudinary } from "./cloudinary";

interface Props {
  question: Question;
  onChange: (q: Question) => void;
}

export default function QuestionEditor({ question, onChange }: Props) {
  const change = (patch: Partial<Question>) =>
    onChange({ ...question, ...patch });

  return (
    <div className="space-y-4">
      <textarea
        value={question.text}
        onChange={e => change({ text: e.target.value })}
        placeholder="Question text"
        className="w-full h-24 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white resize-none"
      />

      <input
        type="file"
        accept="image/*"
        onChange={async e => {
          const f = e.target.files?.[0];
          if (!f) return;
          const url = await uploadToCloudinary(f, "Questions");
          if (url) change({ imageUrl: url });
        }}
        className="text-white"
      />

      {question.type === "mcq" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((opt, idx) => (
            <OptionEditor
              key={idx}
              option={opt}
              onChange={o => {
                const copy = [...question.options];
                copy[idx] = o;
                change({ options: copy });
              }}
            />
          ))}
        </div>
      )}
      <SolutionEditor
          question={question}
          onChange={onChange}
        />
    </div>
  );
}