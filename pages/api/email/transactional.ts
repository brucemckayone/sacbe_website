import { NextApiRequest, NextApiResponse } from "next";

import EmailBuilder from "@/utils/email/emailBuilder";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as requestMethodType;
  switch (method) {
    case "POST":
      let { bodyMessage, to, toName, subject, htmlContent } = req.body;
      const response = await EmailBuilder.sendTransactionalEmail({
        htmlContent: htmlContent,
        sender: {
          email: "no-reply@sacbe-ceremonial-cacao.com",
          name: "Sacbe Ceremonial Cacao",
        },
        replayTo: {
          email: "no-reply@sacbe-ceremonial-cacao.com",
          name: "Sacbe Ceremonial Cacao",
        },
        params: { bodyMessage: bodyMessage },
        subject: subject,
        to: [{ email: to, name: toName }],
      });
      return res.status(200).json(response);
  }
}
