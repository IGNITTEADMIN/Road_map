//./app/admin/content/page.tsx
"use client";

import { useState,useEffect } from "react";
import SubjectTab from "../../components/SubjectTab";
import { Subject } from "../../components/SubjectTab";
import ChapterList from "../../components/ChapterList";
import { ChapterRow } from "@/src/types/content";
import Loader from "@/app/components/ui/Loader";


export default function AdminPage(){
    const [selectedSubject, setSelectedSubject]= useState< Subject | null>(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chapterRows, setChapterRows]=useState<ChapterRow[]>([]);
    const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);
    
    
    useEffect(()=>{
        if(!selectedSubject) return;
        
        async function fetchChapters(){
            try{
                setLoading(true);
                setError(null);
                const res=await fetch(`/api/chapters/get?subject=${selectedSubject}`);
                if(!res.ok){
                    throw new Error("Failed to fetch chapters");
                }
                const data:ChapterRow[] = await res.json();

                setChapterRows(data);
                console.log(data);
            }catch{
                setError("Unable to load content");
            }finally{
                setLoading(false);
            }
        }

        fetchChapters();
    },[selectedSubject]);


    return (
        <div>
            <h2>Select a Subject</h2>
            <SubjectTab
                subject={selectedSubject} 
                onSubjectChange={setSelectedSubject}
            />
            {error && <p>{error}</p>}

            {selectedSubject && (
            loading ? (
                <div className="py-10 flex justify-center">
                <Loader show={loading} />
                </div>
            ) : (
                <ChapterList
                    subject={selectedSubject}
                    rows={chapterRows}
                    mode="admin"
                    expandedChapterId={expandedChapterId}
                    setExpandedChapterId={setExpandedChapterId}
                    />
            )
            )}
        </div>
    );
}