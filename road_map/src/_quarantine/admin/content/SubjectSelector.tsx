"use client";

interface Props {
  selectedSubject: string | null;
  onSelect: (subject: string) => void;
}

const SUBJECTS = ["Physics", "Chemistry", "Maths"];

export default function SubjectSelector({
  selectedSubject,
  onSelect,
}: Props) {
  return (
    <div
      style={{
        marginBottom: "20px",
        paddingBottom: "12px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        gap: "10px",
      }}
    >
      {SUBJECTS.map((subject) => (
        <button
          key={subject}
          onClick={() => onSelect(subject)}
          style={{
            padding: "8px 14px",
            border: "1px solid #aaa",
            cursor: "pointer",
          }}
        >
          {subject}
        </button>
      ))}
    </div>
  );
}
