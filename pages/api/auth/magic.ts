import { NextApiRequest, NextApiResponse } from "next";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as requestMethodType;
  switch (method) {
    case "POST":
      // Initialize Firebase Authentication and get a reference to the service
      const email = req.body.email as string;
      console.log(email);
      try {
        sendSignInLinkToEmail(auth, email, {
          url: "http://localhost:3000/finish-signin",
          // This must be true.
          handleCodeInApp: true,
        })
          .then(() => {
            res
              .status(200)
              .json({ message: "email has been sent", status: 200 });
          })
          .catch((e) => {
            res.status(400).json({
              message: "there was an error generating link",
              status: 400,
              details: e,
            });
          });
      } catch (e) {
        res.status(200).json({
          message: "there was an issue with this request",
          status: 400,
        });
      }
  }
}
