import { NextRequest } from "next/server";
import { createSubscriptionPortal } from "./helper";

export async function GET(req: NextRequest) {
  return await createSubscriptionPortal(new URL(req.url).searchParams);
}
