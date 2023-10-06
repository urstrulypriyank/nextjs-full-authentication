import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  try {
    const { pathName } = request.nextUrl;
    const isPublicPath = pathName === "/login" || pathName === "/signup";
    const token = request.cookies.get("token")?.value || "";

    if(!isPublicPath && !token)
    {
         
    }

  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const config = {
  matcher: ["/", "/profile/(.*)", "/login", "/signup"],
};
