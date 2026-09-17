//./app/admin/content/page.tsx
"use client";

import { useState,useEffect } from "react";
import SubjectTab from "../../components/SubjectTab";
import { Subject } from "../../components/SubjectTab";
import ChapterList from "../../components/ChapterList";
import { ChapterRow } from "@/src/types/content";
import Loader from "@/app/components/ui/Loader";

type Track = "JEE" | "BRIDGE";

export default function AdminPage(){
    const [selectedSubject, setSelectedSubject]= useState< Subject | null>(null);
    const [loading,setLoading] = useState(false);
     const [track, setTrack] = useState<Track>("JEE");
    const [error, setError] = useState<string | null>(null);
    const [chapterRows, setChapterRows]=useState<ChapterRow[]>([]);
    const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);
    
    
    useEffect(()=>{
        if(!selectedSubject) return;
        
        async function fetchChapters(){
            try{
                setLoading(true);
                setError(null);
                const res = await fetch(
          `/api/chapters/get?subject=${selectedSubject}&track=${track}` // 🆕
        );
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
    },[selectedSubject, track]);


    return (
        <div>
            <div className="flex justify-center gap-2 mb-6">
                <button
                onClick={() => {
                    setTrack("JEE");
                    setExpandedChapterId(null);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    track === "JEE"
                    ? "bg-orange-500 text-black shadow-lg scale-105"
                    : "text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-200"
                }`}
                >
                JEE Course
                </button>
                <button
                onClick={() => {
                    setTrack("BRIDGE");
                    setExpandedChapterId(null);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    track === "BRIDGE"
                    ? "bg-orange-500 text-black shadow-lg scale-105"
                    : "text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-200"
                }`}
                >
                Bridge Course
                </button>
            </div>
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
                    track={track}
                    expandedChapterId={expandedChapterId}
                    setExpandedChapterId={setExpandedChapterId}
                    />
            )
            )}
        </div>
    );
}