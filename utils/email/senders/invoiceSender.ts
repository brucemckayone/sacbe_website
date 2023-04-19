import emailSender from "../nodemailer";
import purchase_confirmation from "../templates/purchase_confirmation";
import purchase_failure from "../templates/purchase_failure";
interface SendInterface {
  htmlContent: string;
  to: string;
  toName: string;
  subject: string;
  bodyMessage: string;
}
class InvoiceSender {
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
    name,
    email,
    productName,
    orderNumber,
    orderNumberUrl,
    recipeUrl,
  }: {
    name: string;
    email: string;
    productName: string;
    orderNumber: string;
    orderNumberUrl: string;
    recipeUrl: string;
  }) {
    this.send({
      bodyMessage: `Your ${productName} order has been paid successful`,
      htmlContent: purchase_confirmation({
        name: name,
        productName: productName,
        affiliateProgramUrl: "https://sacbe-ceremonial-cacao.com/affiliate",
        facilitatorUrl: "https://skyeonearth.com/cacaofacilitation",
        orderNumberUrl: orderNumberUrl,
        orderNumer: orderNumber,
        recipesUrl: recipeUrl,
      }),
      subject: `Order Confirmation for ${productName}`,
      to: email,
      toName: name,
    });
  }

  failure({
    name,
    email,
    orderNumber,
    orderNumberUrl,
  }: {
    name: string;
    email: string;
    orderNumber: string;
    orderNumberUrl: string;
  }) {
    this.send({
      bodyMessage: `Your payment has failed`,
      htmlContent: purchase_failure({
        name: name,
        orderNumberUrl: orderNumberUrl,
        orderNumer: orderNumber,
      }),
      subject: `Your Payment Has Failed}`,
      to: email,
      toName: name,
    });
  }
}

export default InvoiceSender;
