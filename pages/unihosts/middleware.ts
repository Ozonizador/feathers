import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "../../lib/supabaseClient";
import { Profile, ProfilesResponse, PROFILE_TABLE_NAME } from "../../models/profile";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  debugger;
  const { data, error } = await supabase
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select("id, user_type")
    .single();

  if (error || !data) return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
