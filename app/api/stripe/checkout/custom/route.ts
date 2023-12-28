import stripe from "@/lib/stripe/init/stripe";
import { NextRequest, NextResponse } from "next/server";
import StripeCheckoutApiHelper from "../helper";
const getHelper = () => new StripeCheckoutApiHelper(stripe);

export async function GET(req: NextRequest) {
  throw NextResponse.error();
}
export async function POST(req: NextRequest) {
  const helper = getHelper();
  const resp = await helper.createCustomCheckoutWithNoPrice(
    (await req.json()) as any
  );
  return NextResponse.json(resp);
}
export async function DELETE(req: NextRequest) {
  throw NextResponse.error();
}
export async function PATCH(req: NextRequest) {
  throw NextResponse.error();
}
export async function PUT(req: NextRequest) {
  throw NextResponse.error();
}
