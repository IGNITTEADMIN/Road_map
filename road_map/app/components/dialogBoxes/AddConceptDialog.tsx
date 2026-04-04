//./app/components/dialogBoxes/AddConceptDialog.tsx
"use client";

import {useState } from "react";
import Button from "@/app/components/ui/Button";

interface Props{
    chapterId: number;
    onClose: ()=>void;
    orderIndex:number
}

export default function AddConceptDialog({chapterId, onClose, orderIndex}: Props){
    const [conceptName,setConceptName]=useState("");
    const [videoTitle,setVideoTitle]=useState("");
    const [videoURL,setVideoURL]=useState("");
    const [loading, setLoading] = useState(false);

    async function handleAdd() {
        if(!conceptName.trim()){
            alert("Chaptername needed");
            return;
        }
        setLoading(true);
        try{
            const res=await fetch(`/api/chapters/concepts/add`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body : JSON.stringify({
                chapterId,conceptName,orderIndex,videoTitle,videoUrl:videoURL
            })
            });
        
            if(!res.ok){
                throw new Error("Failed to add new concept");
            }
            onClose();
        }catch(err){
            alert("Something went wrong");
        }finally{
            setLoading(false);
        }
        
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white">Add Concept</h3>
                    <p className="mt-2 text-sm text-gray-300">Enter details to add a new concept to the chapter.</p>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-200">
                        Concept name
                        <input
                            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#ff6b00]"
                            placeholder="Enter concept name"
                            value={conceptName}
                            onChange={(e) => setConceptName(e.target.value)}
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-200">
                        Video title
                        <input
                            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#ff6b00]"
                            placeholder="Enter video title"
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-200">
                        Video URL
                        <input
                            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#ff6b00]"
                            placeholder="Enter video URL"
                            value={videoURL}
                            onChange={(e) => setVideoURL(e.target.value)}
                        />
                    </label>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="action" onClick={handleAdd} disabled={loading}>
                        {loading ? "Saving" : "Add"}
                    </Button>
                    <Button variant="action" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}