///./app/api/chapters/concepts/get/route.ts
import {NextResponse} from "next/server";
import {getConceptsByChapter} from "@/src/db/queries";
import { requireAuth } from "@/src/lib/apiAuth";

export async function GET(req:Request) {
    await requireAuth();
    try{
        const {searchParams}= new URL(req.url);
        const chapterId=searchParams.get("chapterId");
        if(!chapterId){
            return NextResponse.json(
                { error: "chapterId query param is required" },
                { status: 400 }
            );
        }else{
            const result=await getConceptsByChapter(Number(chapterId));
        return NextResponse.json(result,{ status:201});
        }
    }catch(err:any) {
        return NextResponse.json({error:err.message},{status:500});
    }
}

