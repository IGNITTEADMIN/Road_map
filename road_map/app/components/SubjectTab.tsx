//./api/components/SubjectTabs.tsx
"use client";

import Button from "@/app/components/ui/Button";

const SUBJECTS=["PHYSICS","CHEMISTRY","MATHS"];
export type Subject= typeof SUBJECTS[number];


interface Props{
    subject: Subject | null;
    onSubjectChange: (subject:Subject) =>void;
}

export default function SubjectTab({ subject, onSubjectChange} : Props){
    return (
        <div className="mb-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm">
            <div className="flex justify-center gap-4">
                {SUBJECTS.map((s) => (
                    <Button
                      key={s}
                      onClick={() => {
                        onSubjectChange(s);
                      }}
                      variant="action"
                    >
                      {s}
                    </Button>
                ))}
            </div>
        </div>
    );
}