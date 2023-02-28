// middleware.ts
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/affiliates"],
};

export async function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  // const session = await getServerSession();
  // if (!session) {
  //   if (request.nextUrl.pathname.startsWith("/affiliates")) {
  //     return NextResponse.rewrite(new URL("/api/auth/signin", request.url));
  //   }
  // }
}
