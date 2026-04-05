//./api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    console.log("555555555555555555555555555555555555555555555][]]]]]]]]]]]]]]]]]");
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

    await db
      .update(users)
      .set({
        name,
        dateOfBirth: dob || null,
        schoolName: school,
        district,
        classStudying,
        phoneNumber: phone,
        profileCompleted: true, // ✅ important
      })
      .where(eq(users.email, session.user.email));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}