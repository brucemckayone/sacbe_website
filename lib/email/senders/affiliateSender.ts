import emailSender from "../nodemailer";
import affiliate_update_status from "../templates/affiliate_update_status";

type SendInterface = {
  htmlContent: string;
  to: string;
  subject: string;
  bodyMessage: string;
};
export default class AffiliateSender {
  email = new emailSender();
  send({ htmlContent, subject, to, bodyMessage }: SendInterface) {
    try {
      this.email.send({
        bodyMessage: bodyMessage,
        htmlContent: htmlContent,
        replayTo: "no-reply@sacbe-ceremonial-cacao.com",
        sender: '"Sacbe Cacao ☕" <no-reply@sacbe-ceremonial-cacao.com>',
        subject: subject,
        to: to,
      });
    } catch (e) {
      console.error("failed to send email, error: ", e);
    }
  }

  async sendRequestMade(email: string, status?: "active" | "pending") {
    this.email.send({
      bodyMessage: `Affiliate Request: "pending"`,
      htmlContent: affiliate_update_status({
        status: status ? status : "pending",
      }),
      subject: ` Affiliate Status has been updated: 'pending'`,
      to: email,
      replayTo: "no-reply@sacbe-ceremonial-cacao.com",
      sender: '"Sacbe Cacao ☕" <no-reply@sacbe-ceremonial-cacao.com>',
    });
  }

  success({
    email,
    status,
  }: {
    name: string;
    email: string;
    status: "active" | "pending";
  }) {
    this.send({
      bodyMessage: `Your affiliate status has been updated to: ${status}`,
      htmlContent: affiliate_update_status({ status: status }),
      subject: `Your affiliate status has been updated to: ${status}`,
      to: email,
    });
  }
}
