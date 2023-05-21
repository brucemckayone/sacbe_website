import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import adminInit from "@/utils/firebase/admin_init";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  adminInit();
  const db = firestore();
  const reqPath = "wholesale_requests";
  let email;
  let name;

  switch (req.method) {
    case "GET":
      email = req.query.email;
      const snap = await firestore()
        .collection("users")
        .where("email", "==", email)
        .where("wholesale", "==", true)
        .get();
      if (snap.docs.length == 0) {
        return res.status(200).json({});
      } else {
        return res.status(200).json(snap.docs[0].data());
      }
  }
}
