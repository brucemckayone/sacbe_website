// middleware.ts
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/affiliates", "/about"],
};

export async function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  // const session = await getSession();
  // if (!session) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/api/auth/signin";
  //   return NextResponse.redirect(url);
  //   // Respond with JSON indicating an error message
  // }
}
