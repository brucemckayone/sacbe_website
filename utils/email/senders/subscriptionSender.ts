import emailSender from "../nodemailer";
import affiliate_update_status from "../templates/affiliate_update_status";
import subscription_created from "../templates/subscriptions/subscription_created";

type SendInterface = {
  htmlContent: string;
  to: string;
  subject: string;
  bodyMessage: string;
};
export default class SubscriptionSender {
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

  async created({
    email,
    name,
    portalLink,
  }: {
    name: string;
    email: string;
    portalLink: string;
  }) {
    try {
      this.send({
        bodyMessage: `Welcome ${name} to the Sacbe Community`,
        htmlContent: subscription_created({
          name: name,
          portalLink: portalLink,
        }),
        subject: `Welcome ${name} to the Sacbe Cacao Community`,
        to: email,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
