//./api/chapters/[chapterId]/route.ts
import {NextResponse} from "next/server";
import {deleteChapter} from "@/src/db/queries";
import {editConcept} from "@/src/db/queries";
import {renameChapter} from "@/src/db/queries";
import { requireAdmin } from "@/src/lib/apiAuth";

export async function DELETE(_req: Request,  context: { params: Promise<{ chapterId: string }> }) {
  try {
    const { chapterId } = await context.params;

    await deleteChapter(Number(chapterId));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



export async function PUT(req:Request, {params}:{params:Promise<{chapterId:string}>}){
    try{
        const {chapterId}=await params;
        const body=await req.json();

        const {chapterName}=body;
        if(!chapterName){
            return NextResponse.json({error:"ChapterName required"},{status:400});
        }

        await renameChapter(Number(chapterId),{chapterName});

        return NextResponse.json({success:true});
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500}); 
    }
}

