import cloudinary from "@/utils/cloudinary";
import { addQuizQuestion } from "@/db/queries";
import type { NextApiRequest, NextApiResponse } from "next";

async function uploadImage(base64: string | null) {
  if (!base64) return null;

  const uploaded = await cloudinary.uploader.upload(base64, {
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    folder: "road_map"
  });

  return uploaded.secure_url;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      quiz_identifier,
      question_type,
      question_text,

      question_image,   // base64
      options,          // [{text,image(base64)}, ...]
      correct_answer,   // {text,image(base64)}
      solution_text,
      solution_image    // base64
    } = req.body;

    // 1️⃣ Upload question image
    const questionImageUrl = await uploadImage(question_image);

    // 2️⃣ Upload options images
    const processedOptions = await Promise.all(
      options.map(async (opt: any) => ({
        text: opt.text,
        image: await uploadImage(opt.image)
      }))
    );

    // 3️⃣ Upload correct answer image (same shape)
    const processedCorrect = {
      text: correct_answer.text,
      image: await uploadImage(correct_answer.image)
    };

    // 4️⃣ Upload solution image
    const solutionImageUrl = await uploadImage(solution_image);

    // 5️⃣ Save to DB
    const saved = await addQuizQuestion({
      quiz_identifier,
      question_type,
      question_text,

      question_image: questionImageUrl,

      options: processedOptions,
      correct_answer: processedCorrect,

      solution_text,
      solution_image: solutionImageUrl,
    });

    return res.status(200).json({ success: true, saved });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
