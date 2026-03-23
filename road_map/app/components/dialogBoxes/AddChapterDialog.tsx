"use client";

import {useState } from "react";
import Button from "@/app/components/ui/Button";

interface Props{
    subject: string
    onClose: ()=>void;
}


export default function AddChapterDialog
({subject, onClose}: Props){
    const [chapterName,setChapterName]=useState("");
    const [loading, setLoading] = useState(false);

    async function handleAdd() {
        if(!chapterName.trim()){
            alert("Chaptername needed");
            return;
        }
        try{
            const res=await fetch(`/api/chapters/add`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body : JSON.stringify({
                subject,chapterName
            })
            });
        
            if(!res.ok){
                throw new Error("Failed to delete chapter");
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
                    <h3 className="text-xl font-semibold text-white">Add Chapter</h3>
                    <p className="mt-2 text-sm text-gray-300">
                        Add a new chapter to the selected subject.
                    </p>
                </div>

                <label className="block text-sm font-medium text-gray-200">
                    Chapter name
                    <input
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#ff6b00]"
                        placeholder="Enter chapter name"
                        value={chapterName}
                        onChange={(e) => setChapterName(e.target.value)}
                    />
                </label>

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