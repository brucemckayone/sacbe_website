import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = firestore();
  const reqPath = "wholesale_requests";
  let email;
  let name;

  const method = req.method as requestMethodType;
  switch (method) {
    case "POST":
      email = req.body.email;
      name = req.body.name;
      db.collection(reqPath).add({ email, name });
      return res.status(200).json({});
  }
}
