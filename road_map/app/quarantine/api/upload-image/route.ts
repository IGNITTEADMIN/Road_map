import { NextResponse } from "next/server";
import { cloudinary } from "@/src/_quarantine/lib/cloudinary";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "quiz_images" },
      (err, res) => (err ? reject(err) : resolve(res))
    ).end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}
