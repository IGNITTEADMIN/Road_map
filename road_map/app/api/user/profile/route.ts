//./api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      name,
      dob,
      school,
      district,
      classStudying,
      phone,
    } = body;

    const requiredFields = { name, dob, school, district, classStudying, phone };
    const missing = Object.entries(requiredFields)
      .filter(([, value]) => !value || !String(value).trim())
      .map(([key]) => key);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    await db
      .update(users)
      .set({
        name,
        dateOfBirth: dob,
        schoolName: school,
        district,
        classStudying,
        phoneNumber: phone,
        profileCompleted: true,
      })
      .where(eq(users.email, session.user.email));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}