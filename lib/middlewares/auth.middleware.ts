import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function handleUnauthorizedRequest(req: NextRequest): NextResponse | null {
  // Redirect to auth page for UI routes
  if (req.nextUrl.pathname.startsWith("/chat")) {
    return NextResponse.redirect(new URL("/auth-page", req.url));
  }

  // Return unauthorized for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
