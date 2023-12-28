import emailSender from "@/lib/email/nodemailer";

export default class EmailAPIHelper {
  private sender = new emailSender();

  async send(htmlContent: string, to: string, body: string, subject: string) {
    this.sender.send({
      bodyMessage: body,
      htmlContent: htmlContent,
      replayTo: "no-reply@sacbe-ceremonial-cacao.com",
      sender: "no-reply@sacbe-ceremonial-cacao.com",
      subject: subject,
      to: to,
    });
  }
}
