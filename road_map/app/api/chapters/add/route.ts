import {NextResponse} from "next/server";
import {insertChapter} from "@/src/db/queries";
import type { Subject } from "@/src/db/queries";

export async function POST(req:Request) {
    try{
        const {subject, chapterName}= await req.json();
        const result=await insertChapter(subject as Subject,chapterName);

        return NextResponse.json(result,{ status:201});
    }catch(err:any) {
        return NextResponse.json({error:err.message},{status:500});
    }
}