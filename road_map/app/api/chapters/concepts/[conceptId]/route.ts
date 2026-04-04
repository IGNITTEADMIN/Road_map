///api/chapters/concepts/[conceptId]/route.ts
import {NextResponse} from "next/server";
import {deleteConcept, editConcept} from "@/src/db/queries";
import { requireAdmin } from "@/src/lib/apiAuth";

export async function DELETE(_req:Request,  {params} : {params: Promise<{conceptId:string
}>}) {
    await requireAdmin();
    try{
        const {conceptId}=await params;
        //console.log(params);
        //console.log("Id:",Number(params.conceptId));
        await deleteConcept(Number(conceptId));
        return NextResponse.json({ success:true});
    }catch(err:any) {
        return NextResponse.json({error:err.message},{status:500});
    }
}
export async function PUT(req:Request, {params} :{ params: Promise<{ conceptId: string }> }){
    try{
        const {conceptId} = await params;
        const body= await req.json();
        console.log(body);
        const {conceptName,orderIndex,videoTitle,videoUrl}= body;
        console.log(videoTitle);
        await editConcept(Number(conceptId),{conceptName,orderIndex,videoTitle,videoUrl});

        return NextResponse.json({success:true});
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500});
    }
}