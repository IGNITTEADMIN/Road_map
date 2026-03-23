//./api/components/ChapterList.tsx
"use client";

import {useState } from "react";
import ChapterTab from "./ChapterTab";
import {ContentRow, ChapterRow} from "@/src/types/content";
import { Subject } from "@/app/components/SubjectTab";
import  AddChapterDialog  from "@/app/components/dialogBoxes/AddChapterDialog";
import ConceptList from "@/app/components/ConceptList";
import Button from "@/app/components/ui/Button";
import { getProgress } from "@/src/utils/progress";

interface Props{
    subject: Subject;
    rows: ChapterRow[];
    mode?: "admin" | "user";
    //refresh: ()=> void;
}


export default function ChapterList({ subject, rows, mode="admin" }: Props){
    
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [expandedChapterId,changeExpandedChapterId] = useState<number | null>(null); 
    const [conceptList,changeConcepts]=useState<ContentRow[] | []>([]);
    const [loading, setLoading] = useState(false);
    async function handleClick(id:number){
        if(expandedChapterId==id){
            changeExpandedChapterId(null);
            changeConcepts([]);
            return;
        }
        changeExpandedChapterId(id);
        setLoading(true);
        try{
            const res=await fetch(`/api/chapters/concepts/get?chapterId=${id}`);
            const data:ContentRow[] = await res.json();
            
            changeConcepts(data);
            console.log(data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
        
    }
    const progress = getProgress();

    function getChapterProgress(concepts: any[]) {
        if (!concepts.length) return 0;

        const completed = concepts.filter(
            (c) => progress[c.id]?.completed
        ).length;

        return Math.round((completed / concepts.length) * 100);
    }
    return (
        <div className="space-y-4">
            {
                mode === "admin" && showAddDialog && (<AddChapterDialog subject={subject} onClose={()=>setShowAddDialog(false)} />)
            }
            {rows.map((row)=>(
                <div key={row.chapterId}>
                    <ChapterTab
                        chapterId={row.chapterId}
                        chapterName={row.chapterName}
                        onClick={() => handleClick(row.chapterId)}
                        conceptList={conceptList}
                        expandedcI={expandedChapterId}
                        mode={mode}
                        progress={
                            expandedChapterId === row.chapterId
                            ? getChapterProgress(conceptList)
                            : 0
                        }
                        />
                    {expandedChapterId==row.chapterId && <ConceptList chapterId={row.chapterId} rows={conceptList} mode={mode}></ConceptList>} 
                </div>
            )
            
            )}
            {mode === "admin" && (
                <div className="flex justify-center">
                    <Button onClick={() => { setShowAddDialog(true); }}>
                        Add Chapter
                    </Button>
                </div>
            )}
        </div>
    );
}