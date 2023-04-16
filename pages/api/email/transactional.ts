import emailSender from "@/utils/email/nodemailer";
import purchase_confirmation from "@/utils/email/templates/purchase_confirmation";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as requestMethodType;
  switch (method) {
    case "POST":
      let { bodyMessage, to, subject, htmlContent } = req.body;
      new emailSender().send({
        bodyMessage: bodyMessage,
        htmlContent: purchase_confirmation({
          affiliateProgramUrl: "",
          facilitatorUrl: "",
          name: "bruce",
          orderNumberUrl: "",
          orderNumer: "order number",
          productName: "a delicous product",
          recipesUrl: "",
        }),
        replayTo: "no-reply@sacbe-ceremonial-cacao.com",
        sender: "no-reply@sacbe-ceremonial-cacao.com",
        subject: subject,
        to: to,
      });
      return res.status(200).json({});
  }
}
