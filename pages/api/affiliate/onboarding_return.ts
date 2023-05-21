import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestType = req.method as requestMethodType;
  switch (requestType) {
    case "GET":
      const accountId = req.query.accountId as string;
      const db = firestore();
      const snapshot = await db
        .collection("users")
        .where("accountId", "==", accountId)
        .get();
      if (snapshot.docs.length == 1) {
        db.collection("users")
          .doc(snapshot.docs[0].id)
          .update({ chargesEnabled: true });
      }
      res.status(200).redirect("/portal");
      break;
    case "POST":
      break;
    case "PUT":
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
  }
}
