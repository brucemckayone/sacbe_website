import { NextRequest } from "next/server";
import { createCustomerPortal } from "./helper";

export async function GET(req: NextRequest) {
  return await createCustomerPortal(new URL(req.url).searchParams);
}
