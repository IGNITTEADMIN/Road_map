
//./api/chapters/concepts/add/route.ts
import {NextResponse} from "next/server";
import {insertConcept} from "@/src/db/queries";
import { requireAdmin } from "@/src/lib/apiAuth";

export async function POST(req:Request) {
    await requireAdmin();
    try{
        const {chapterId,conceptName,orderIndex,videoTitle,videoUrl}= await req.json();
        const result=await insertConcept(Number(chapterId),conceptName,Number(orderIndex),videoTitle,videoUrl);
        return NextResponse.json(result,{ status:201});
    }catch(err:any) {
        return NextResponse.json({error:err.message},{status:500});
    }
}