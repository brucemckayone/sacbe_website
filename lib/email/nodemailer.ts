import nodemailer from "nodemailer";
import { envConfig } from "@/lib/env/envConfig";

const transport = nodemailer.createTransport(
  {
    host: envConfig.SMTP_HOST,
    port: 465,
    secure: true,

    auth: {
      user: "no-reply@sacbe-ceremonial-cacao.com",
      pass: envConfig.NO_REPLY_PASSWORD,
    },
  },
  {}
);

// send some mail
type transactionalEmailParamType = {
  subject: string;
  sender: string;
  replayTo: string;
  to: string;
  htmlContent: string;
  bodyMessage: string;
};

export default class emailSender {
  async send({
    subject,
    sender,
    replayTo,
    to,
    htmlContent,
    bodyMessage,
  }: transactionalEmailParamType) {
    return await transport.sendMail({
      from: sender,
      replyTo: replayTo,
      to: to,
      subject: subject,
      text: bodyMessage,
      html: htmlContent,
    });
  }
}
