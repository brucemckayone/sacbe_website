import { NextApiRequest, NextApiResponse } from "next";

import EmailBuilder from "@/utils/email/emailBuilder";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await EmailBuilder.sendTransactionalEmail({
    htmlContent: "<h1>Hello there this is a tes</h1>",
    sender: { email: "bruce.r.mckay@outlook.com", name: "bruce mckay" },
    replayTo: { email: "bruce.r.mckay@outlook.com", name: "bruce mckay" },
    params: { bodyMessage: "hellow" },
    subject: "subject",
    to: [{ email: "brucemckayone@gmail.com", name: "bruce" }],
  });
  res.status(200).json(response);
}
