///app/components/ConceptList.tsx
"use client";

import {useState } from "react";
import {ContentRow, ChapterRow} from "@/src/types/content";
import { Subject } from "@/app/components/SubjectTab";
import  AddConceptDialog  from "@/app/components/dialogBoxes/AddConceptDialog";
import ConceptTab from "@/app/components/ConceptTab";
import Button from "@/app/components/ui/Button";
interface Props {
  chapterId: number;
  rows: ContentRow[];
  mode?: "admin" | "user";
  targetConceptId?: number | null;
}


export default function ConceptList({chapterId, rows, mode="admin" ,targetConceptId=null}: Props){
    const [showAddDialog, setShowAddDialog] = useState(false);
    return (
        <div className="ml-6 space-y-4">
            {    mode === "admin" && showAddDialog && <AddConceptDialog chapterId={chapterId} orderIndex={rows.length} onClose={()=>{setShowAddDialog(false)}}></AddConceptDialog>}
            {rows.map((row)=>(
                <ConceptTab
                    key={row.id}
                    conceptId={row.id}
                    chapterId={chapterId}
                    conceptName={row.conceptName}
                    order_index={row.orderIndex}
                    video_title={row.videoTitle}
                    video_url={row.videoUrl}
                    mode={mode}
                    targetConceptId={targetConceptId}
                    //onClick={()=>handleClick(row.chapterId)}
                    //expandedcI={expandedChapterId}
                >
                </ConceptTab>
            )
            
            )}

            
            {mode === "admin" && (
                <div className="flex justify-center">
                    <Button onClick={() => { setShowAddDialog(true); }}>
                      Add Concept
                    </Button>
                </div>
            )}
        </div>
    );
}//{    showAddDialog && <AddChapterDialog subject={subject} onClose={()=>setShowAddDialog(false)}></AddChapterDialog>}
//            <button onClick={()=>{ setShowAddDialog(true)}}>Add Chapter</button>
