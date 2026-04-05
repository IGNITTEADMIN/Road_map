//./api/sign-cloudinary/route.ts
import {NextResponse} from "next/server";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME!,
    api_key:process.env.CLOUDINARY_API_KEY!,
    api_secret:process.env.CLOUDINARY_API_SECRET!,
    secure:true
});
export async function POST(req:Request){
    const {folder} = await req.json();
    try{
        const timestamp=Math.round(new Date().getTime() / 1000);
        const paramsToSign = {timestamp,folder};

        const signature = cloudinary.utils.api_sign_request(paramsToSign,process.env.CLOUDINARY_API_SECRET!);
    
        return NextResponse.json({
            timestamp,
            signature,
            api_key:process.env.CLOUDINARY_API_KEY!,
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME!,
            folder,
        });
    }catch(error){
        console.error("Error generating Cloudinary signature:", error);
        return NextResponse.json({error: "Failed to generate signature"}, {status: 500});       
    
    }
}