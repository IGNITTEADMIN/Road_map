// components/quiz/cloudinary.ts

import { UploadKind } from "./types";

export async function uploadToCloudinary(
  file: File,
  kind: UploadKind = "Questions"
): Promise<string> {
  if (!file) return "";

  try {
    const folder = `Road_map/${kind}`;

    const sigRes = await fetch(`/api/sign-cloudinary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder }),
    });

    if (!sigRes.ok) throw new Error("Failed to get signature");

    const sig = await sigRes.json();

    const form = new FormData();
    form.append("file", file);
    form.append("api_key", sig.api_key);
    form.append("timestamp", String(sig.timestamp));
    form.append("signature", sig.signature);
    form.append("folder", sig.folder || folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloud_name}/auto/upload`;

    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      body: form,
    });

    if (!uploadRes.ok) throw new Error("Cloudinary upload failed");

    const uploadJson = await uploadRes.json();
    return uploadJson.secure_url as string;
  } catch (err) {
    console.error("Upload error:", err);
    alert("Image upload failed");
    return "";
  }
}