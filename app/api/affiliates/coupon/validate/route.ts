import adminInit from "@/lib/firebase/admin_init";
import { NextRequest, NextResponse } from "next/server";
import CouponAPIHelper from "../CouponAPIHelper";

export async function GET(request: NextRequest) {
  const helper = new CouponAPIHelper(adminInit().firestore());
  const params = new URL(request.url).searchParams;
  return NextResponse.json(await helper.validateCoupon(params));
}
