import {NextResponse} from "next/server";
import {getConceptsByChapter} from "@/src/db/queries";

export async function GET(req:Request) {
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

