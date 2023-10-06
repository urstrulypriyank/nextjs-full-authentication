import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const isPublicPath = pathname === "/login" || pathname === "/signup";
    const token = request.cookies.get("token")?.value || 0;

    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const config = {
  matcher: ["/", "/profile/(.*)", "/login", "/signup", "/profile"],
};
