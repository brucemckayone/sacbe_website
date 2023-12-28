import adminInit from "@/lib/firebase/admin_init";
import { NextRequest, NextResponse } from "next/server";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const helper = new CollectionHelper(
    adminInit().firestore().collection("users")
  );
  const params = new URL(req.url).searchParams;

  if (!params.has("accountId"))
    return NextResponse.json({
      ok: false,
      status: "error",
      data: null,
      message: "You did not include accountId in your search params ",
      error: "You did not include accountId in your search params ",
    });

  const res = await helper.getDocsWithKeyValue(
    "accountId",
    params.get("accountId"),
    true
  );

  helper.findAndUpdateDocByKeyValue(
    { key: "accountId", value: params.get("accountId") },
    { chargesEnabled: true }
  );
  return redirect(
    "/portal/affiliate?refreshUser=true&accountId=" + params.get("accountId")
  );
}
