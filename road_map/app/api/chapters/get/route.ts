import {NextResponse} from "next/server";
import {getChaptersBySubject} from "@/src/db/queries";
import type { Subject } from "@/src/db/queries";

export async function GET(req:Request) {
    try{
        const {searchParams}= new URL(req.url);
        const subject=searchParams.get("subject");
        if(subject){
            const result=await getChaptersBySubject(subject as Subject);
            return NextResponse.json(result,{ status:200});
        }else{
            return NextResponse.json(
                { error: "subject query param is required" },
                { status: 400 }
            );
        }
        
    }catch(err:any) {
        return NextResponse.json({error:err.message},{status:500});
    }
}