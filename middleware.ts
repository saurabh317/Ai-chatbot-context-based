import { NextResponse, NextRequest } from "next/server";
import { loggerMiddleware } from "@/lib/middlewares/logger.middleware";

export function middleware(req: NextRequest) {
  // // 1. Logger (always run)
  // loggerMiddleware(req);

  // 2. Simple auth check for chat pages (check if token cookie exists)
  // Note: Can't verify JWT in edge runtime, so we just check token existence
  // Actual JWT verification happens in controllers
  if (req.nextUrl.pathname.startsWith("/chat")) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/auth-page", req.url));
    }
  }

  // 3. Continue (API auth handled at controller level)
  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/api/(.*)"],
};
