//@app/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED_PREFIXES = ["/user", "/admin", "/learn"];
const EXEMPT_PATHS = ["/profile", "/api", "/login", "/post-login", "/about", "/contact", "/"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (EXEMPT_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admins skip the profile-completion gate entirely
  if (token.role === "admin") {
    return NextResponse.next();
  }

  if (!token.profileCompleted) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/learn"],
};