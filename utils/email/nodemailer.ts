import { defaultProvider } from "@aws-sdk/credential-provider-node";

const nodemailer = require("nodemailer");
import * as aws from "@aws-sdk/client-ses";
import { envConfig } from "@/lib/webhooks/envConfig";

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: envConfig.AWS_REGION,
  credentials: {
    secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
    accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
  },
});

const transport = nodemailer.createTransport({
  SES: { ses, aws },
});

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
      replayTo: replayTo,
      to: to,
      subject: subject,
      text: bodyMessage,
      html: htmlContent,
    });
  }
}
