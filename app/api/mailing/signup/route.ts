import adminInit from "@/lib/firebase/admin_init";
import { NextRequest, NextResponse } from "next/server";
import MailingSignUpApiHelper from "./helper";

const getHelper = () => new MailingSignUpApiHelper(adminInit().firestore());
export async function POST(request: NextRequest) {
  const helper = getHelper();
  const resp = await helper.post(await request.json());

  return NextResponse.json(resp);
}
