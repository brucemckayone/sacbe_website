import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import adminInit from "@/lib/firebase/admin_init";

adminInit();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method as requestMethodType) {
    case "POST":
      break;
    case "GET":
      const orders = await getOrders();
      res.status(orders.status).json(orders.data);
      break;
  }
}

async function getOrders() {
  const data = await firestore().collection("orders").get();

  const list = data.docs.map((doc) => doc.data());

  return { status: 200, data: list };
}
