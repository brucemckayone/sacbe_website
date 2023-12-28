import stripe from "@/lib/stripe/init/stripe";
import { NextRequest, NextResponse } from "next/server";
import AffiliateBalanceHelper from "./helper";
const getHelper = () => new AffiliateBalanceHelper(stripe);

export async function GET(req: NextRequest) {
  const helper = getHelper();
  const resp = await helper.get(new URL(req.url).searchParams);
  return NextResponse.json(resp);
}
export async function POST(req: NextRequest) {
  throw NextResponse.error();
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
