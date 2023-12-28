import emailSender from "../nodemailer";
import welcome_email from "../templates/customer/welcome_email";
import signup_gift_template from "../templates/newsletter/survay_gift";

type SendInterface = {
  htmlContent: string;
  to: string;
  subject: string;
  bodyMessage: string;
};

export default class CustomerEmailSender {
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

  async newCustomer(email: string) {
    this.send({
      bodyMessage: `Welcome to the Sacbe Community; We Have Some Gifts for you`,
      htmlContent: welcome_email(),
      subject: `Welcome To the Sacbe Community. We have something for you`,
      to: email,
    });
  }

  async sendSignUpGift(email: string) {
    this.send({
      bodyMessage:
        "Thank you for signing up for our newsletter. Here is your gift",
      htmlContent: signup_gift_template(),
      subject: `Welcome To the Sacbe Community. We have something for you`,
      to: email,
    });
  }
}
