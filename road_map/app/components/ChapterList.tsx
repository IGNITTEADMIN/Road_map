//./api/components/ChapterList.tsx
"use client";

import {useState ,useEffect} from "react";
import ChapterTab from "./ChapterTab";
import {ContentRow, ChapterRow} from "@/src/types/content";
import { Subject } from "@/app/components/SubjectTab";
import  AddChapterDialog  from "@/app/components/dialogBoxes/AddChapterDialog";
import ConceptList from "@/app/components/ConceptList";
import Button from "@/app/components/ui/Button";
import Loader from "@/app/components/ui/Loader";

interface Props {
  subject: Subject;
  rows: ChapterRow[];
  mode?: "admin" | "user";
  initialChapterId?: number | null;
  targetConceptId?: number | null;
    targetChapterId?: number | null;
    expandedChapterId:number | null;
    setExpandedChapterId: (id: number | null) => void;
  
}


export default function ChapterList({ subject, rows, mode="admin",initialChapterId=null,targetConceptId=null,targetChapterId=null,expandedChapterId,setExpandedChapterId     }: Props){
    
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [conceptList,changeConcepts]=useState<ContentRow[] | []>([]);
    const [loadingChapterId, setLoadingChapterId] = useState<number | null>(null);
    

    async function handleClick(id:number){
        if(expandedChapterId==id){
            setExpandedChapterId(null);
            changeConcepts([]); 
            return;
        }
        setExpandedChapterId(id);
        changeConcepts([]);
        setLoadingChapterId(id);
        try {
                const res = await fetch(`/api/chapters/concepts/get?chapterId=${id}`);
                const data: ContentRow[] = await res.json();

                await new Promise((res) => setTimeout(res, 500)); // 👈 add this

                changeConcepts(data);
            }catch(err){
            console.log(err);
        }finally{
            setLoadingChapterId(null);
        }
        
    }
    useEffect(() => {
        if (initialChapterId) {
            handleClick(initialChapterId);
        }
        }, [initialChapterId]);

        useEffect(() => {
  if (targetChapterId && rows.some(r => r.chapterId === targetChapterId)) {
    handleClick(targetChapterId);
  }
}, [targetChapterId]);

    
    
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
                        />
                    {expandedChapterId === row.chapterId && (
                        
                        loadingChapterId === row.chapterId ? (
                            <Loader show={loadingChapterId === row.chapterId} />
                            ) : (
                            <ConceptList
                                chapterId={row.chapterId}
                                rows={conceptList}
                                mode={mode}
                                targetConceptId={targetConceptId}
                                />
                            )
                        )}
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