"use client";

import { useState,useEffect } from "react";
import SubjectTab from "../../components/SubjectTab";
import { Subject } from "../../components/SubjectTab";
import ChapterList from "../../components/ChapterList";
import { ChapterRow } from "@/src/types/content";


export default function AdminPage(){
    const [selectedSubject, setSelectedSubject]= useState< Subject | null>(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chapterRows, setChapterRows]=useState<ChapterRow[]>([])
    
    
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
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}


            {selectedSubject && <ChapterList subject={selectedSubject} rows={chapterRows} mode="admin"/>}
        </div>
    );
}