import adminInit from "@/lib/firebase/admin_init";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const admin = adminInit();
  const db = admin.firestore();
  const method = req.method as requestMethodType;
  switch (method) {
    case "GET":
      const customerId = req.query.customerId;

      const snap = await db
        .collection("subscriptions")
        .where("customer", "==", customerId)
        .get();

      if (snap.docs.length == 0)
        return res.json({ message: "no subscription for this user" });
      const data = snap.docs[0].data();
      const canEdit = data.items
        .map((e: any) => {
          return getDaysSinceStripeDate(e.created) > 90;
        })
        .includes(true);
      return res.json({
        created: data.items[0].created,
        status: data.status,
        daysPassed: getDaysSinceStripeDate(data.items[0].created),
        canEdit: canEdit,
      });

    case "POST":
      break;
  }
}

function convertUnixTimestampToDate(unixTimestamp: number): Date {
  return new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
}

function getDaysSinceStripeDate(stripeDate: number): number {
  const currentDate = new Date();
  const differenceInTime =
    currentDate.getTime() - convertUnixTimestampToDate(stripeDate).getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
}
