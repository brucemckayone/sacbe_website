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

  async updateAdmin({
    name, 
    status,
  }: {
    name: string;
    email: string;
    status: string;
  }) {
    try {
      this.send({
        bodyMessage: `${name} subscription status has been updated to ${status}`,
        htmlContent: `<p>Hi Bruce, </p><p> This is an automated message to let you know that the subscription status of one of your affiliates has been updated to ${status}. </p><p> Please check the admin portal for more details.</p>`,
        subject: `${name} Subscription status updated`,
        to: "brucemckayone@gmail.com"
      });
    }
    catch (e) {
      console.log(e);
    }
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
        to: email ?? "brucemckayone@gmail.com",
      });
      this.send({
        bodyMessage: `${name} has joined the Sacbe Community, email: ${email} they are the news subscriber`, 
        htmlContent: `Woop woop baby thats a new subscriber ${name} to the Sacbe Community` ,
        subject: `we have a new subscriber ${name} to the Sacbe Community`,
        to: "brucemckayone@gmail.com",
      });
    } catch (e) {
      console.log(e);
    }
  }
}
