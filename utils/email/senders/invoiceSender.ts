import React from "react";
import emailSender from "../nodemailer";
import purchase_confirmation from "../templates/purchase_confirmation";
interface SendInterface {
  htmlContent: string;
  to: string;
  toName: string;
  subject: string;
  bodyMessage: string;
}
class InvoiceSender {
  send({ htmlContent, subject, to, toName, bodyMessage }: SendInterface) {
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
  }: {
    name: string;
    email: string;
    productName: string;
    orderNumber: string;
    orderNumberUrl: string;
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
        recipesUrl: "",
      }),
      subject: `Order Confirmation for ${productName}`,
      to: email,
      toName: name,
    });
  }
}

export default InvoiceSender;
