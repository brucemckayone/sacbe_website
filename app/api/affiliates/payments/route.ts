import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe/init/stripe";

export async function GET(req: NextRequest) {
  const params = new URL(req.url).searchParams;
  if (!params.has("accountId")) return NextResponse.error();
  const resp = await stripe.charges.list({
    stripeAccount: params.get("accountId") as string,
  });
  return NextResponse.json(resp);
}
