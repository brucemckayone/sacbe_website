import emailSender from "../nodemailer";
import affiliate_update_status from "../templates/affiliate_update_status";

type SendInterface = {
  htmlContent: string;
  to: string;
  subject: string;
  bodyMessage: string;
};
export default class AffiliateSender {
  send({ htmlContent, subject, to, bodyMessage }: SendInterface) {
    new emailSender().send({
      bodyMessage: bodyMessage,
      htmlContent: htmlContent,
      replayTo: "no-replay@sacbe-ceremonial-cacao.com",
      sender: "no-replay@sacbe-ceremonial-cacao.com",
      subject: subject,
      to: to,
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
