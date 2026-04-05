//./api/chapters/concepts/delete/route.ts
import {NextResponse} from "next/server";
import {deleteConcept} from "@/src/db/queries";
import type { Subject } from "@/src/db/queries";

export async function DELETE(_req:Request,  {params} : {params: {conceptId:string
}}) {
    try{
        const result=await deleteConcept(Number(params.conceptId));
        return NextResponse.json(result,{ status:201});
    }catch(err:any) {
        return NextResponse.json({error:err.message},{status:500});
    }
}