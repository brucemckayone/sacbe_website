var SibApiV3Sdk = require("sib-api-v3-sdk");
import { envConfig } from "@/lib/webhooks/envConfig";
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  envConfig.SENDINBLUE_API_KEY;

type transactionalEmailParamType = {
  subject: string;
  sender: emailSenderType;
  replayTo: emailSenderType;
  to: emailSenderType[];
  htmlContent: string;
  params: {
    bodyMessage: string;
  };
};
type emailSenderType = {
  email: string;
  name: string;
};

export default class EmailBuilder {
  static async sendTransactionalEmail({
    subject,
    sender,
    replayTo,
    to,
    htmlContent,
    params,
  }: transactionalEmailParamType) {
    return await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      subject: subject,
      sender: sender,
      replyTo: replayTo,
      to: to,
      htmlContent: htmlContent,
      params: params,
    });
  }
}

// export default { messageId: "<202103121308.46570265992@smtp-relay.mailin.fr>" };
