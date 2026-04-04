//./api/components/ChapterList.tsx
"use client";

import {useState ,useEffect} from "react";
import ChapterTab from "./ChapterTab";
import {ContentRow, ChapterRow} from "@/src/types/content";
import { Subject } from "@/app/components/SubjectTab";
import  AddChapterDialog  from "@/app/components/dialogBoxes/AddChapterDialog";
import ConceptList from "@/app/components/ConceptList";
import Button from "@/app/components/ui/Button";
import { getChapterProgress, getProgressForUser , getUserId} from "@/src/utils/progress";
import { ConceptProgress } from "@/src/utils/progress";
import Loader from "@/app/components/ui/Loader";

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
    const [loadingChapterId, setLoadingChapterId] = useState<number | null>(null);
    const [progressData, setProgressData] = useState<Record<number, ConceptProgress>>({});
      useEffect(() => {
          const userId = getUserId();
          if (!userId) return;

          function load() {
              const data = getProgressForUser(userId!);
              setProgressData(data);
          }

          load();
          window.addEventListener("storage", load);

          return () => window.removeEventListener("storage", load);
      }, []);

    async function handleClick(id:number){
        if(expandedChapterId==id){
            changeExpandedChapterId(null);
            changeConcepts([]); 
            return;
        }
        changeExpandedChapterId(id);
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
                            ? getChapterProgress(conceptList, progressData)
                            : 0
                        }
                        />
                    {expandedChapterId === row.chapterId && (
                        
                        loadingChapterId === row.chapterId ? (
                            <Loader show={loadingChapterId === row.chapterId} />
                            ) : (
                            <ConceptList
                                chapterId={row.chapterId}
                                rows={conceptList}
                                mode={mode}
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