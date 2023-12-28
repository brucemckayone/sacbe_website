import { NextApiRequest, NextApiResponse } from "next";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import homeUrl from "@/lib/constants/urls";
import adminInit from "@/lib/firebase/admin_init";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as requestMethodType;
  switch (method) {
    case "POST":
      const email = req.body.email as string;
      try {
        await sendSignInLinkToEmail(auth, email, {
          url: `${homeUrl}/finish-signin`,
          handleCodeInApp: true,
        });

        return res
          .status(200)
          .json({ message: "email has been sent", status: 200 });
      } catch (e) {
        console.error(e);
        return res.status(200).json({
          message: "there was an issue with this request",
          status: 400,
          e: e,
        });
      }
  }
}
