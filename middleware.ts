import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const userAuth = request.cookies.get("sb-localhost-auth-token");

  if (!userAuth || !process.env.SUPABASE_JWT_SECRET) return NextResponse.redirect(new URL("/", request.url));

  const parsedAuth = JSON.parse(userAuth);
  const token = parsedAuth[0];

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/unihosts/superadmin/:path*",
};
