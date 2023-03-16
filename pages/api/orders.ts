import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import adminInit from "@/utils/firebase/admin_init";

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

  return { status: 200, data: data.docs };
}
