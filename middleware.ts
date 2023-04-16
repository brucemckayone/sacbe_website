// middleware.ts
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextURL } from "next/dist/server/web/next-url";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/affiliates"],
};

export async function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  });

  if (!token) {
    if (request.nextUrl.pathname.startsWith("/affiliates/portal")) {
      return NextResponse.rewrite(new NextURL("/auth/signin", request.url));
    }
  }
}
