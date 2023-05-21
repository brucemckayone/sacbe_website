import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
// import getAffiliateUser from "@/utils/server/affiliate/getAffiliateUser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestType = req.method as requestMethodType;
  switch (requestType) {
    case "GET":
      const email = req.query.email as string;
      const response = await getAffiliateUser(email);
      res.status(response.status).json(response.data);
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

async function getAffiliateUser(email: string) {
  try {
    const snapshot = await firestore()
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.docs.length > 0) {
      const data = snapshot.docs[0].data() as userType;
      console.log(data);

      return { status: 200, data: data };
    } else {
      return {
        status: 200,
        message: "there is no user with this email address",
      };
    }
  } catch (e) {
    return { status: 400 };
  }
}
