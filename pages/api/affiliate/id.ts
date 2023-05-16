import { NextApiRequest, NextApiResponse } from "next";

import { firestore } from "firebase-admin";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const email = req.body["email"];
      console.log(email);
      const snapshot = await firestore()
        .collection("users")
        .where("email", "==", email)
        .get();
      if (snapshot.docs.length > 0) {
        const data = snapshot.docs[0].data();
        const accoundId = data["accoundId"];
        if (accoundId) {
          return res.status(200).json({ accountId: accoundId });
        } else {
          return res
            .status(200)
            .json({ accountId: "", message: "user has no account id" });
        }
      } else {
        return res.status(200).json({
          accountId: "",
          message: "there is no user with this email address",
        });
      }
    } catch (e) {
      return res.status(401).json(e);
    }
  }
}
