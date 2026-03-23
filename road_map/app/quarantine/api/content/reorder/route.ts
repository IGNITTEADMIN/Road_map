export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { db } from "@/src/_quarantine/db/client";
import { content } from "@/src/_quarantine/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request) {
  try {
    const { items } = await req.json();

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    // ✅ Sequential updates (NO transaction)
    for (const item of items) {
      if (
        typeof item.id !== "number" ||
        typeof item.order_index !== "number"
      ) {
        return NextResponse.json(
          { error: "Invalid item shape" },
          { status: 400 }
        );
      }

      await db
        .update(content)
        .set({ order_index: item.order_index })
        .where(eq(content.id, item.id));
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("REORDER ERROR:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
