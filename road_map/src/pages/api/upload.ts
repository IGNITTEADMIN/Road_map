import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/utils/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const file = req.body.file; // base64 string from frontend

    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      folder: "road_map",
    });

    return res.status(200).json({ url: uploadResponse.secure_url });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
