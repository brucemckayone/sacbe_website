import EmailBuilder from "../emailBuilder";
import purchase_confirmation from "./purchase_confirmation";
export default class emailTemplateSender {
  private static readonly salesSender = {
    email: "sales@sacbe-ceremonial-cacao.com",
    name: "Sacbe Cacao",
  };

  static async purchaseConfirmation({
    name,
    email,
    product,
  }: {
    name: string;
    email: string;
    product: string;
  }) {
    return await EmailBuilder.sendTransactionalEmail({
      sender: this.salesSender,
      replayTo: this.salesSender,
      to: [{ name: name, email: email }],
      subject: `Sacbe Cacao - Payment Confirmed`,
      htmlContent: purchase_confirmation({
        affiliateProgramUrl: "",
        facilitatorUrl: "",
        orderNumberUrl: "",
        name: name,
        orderNumer: "oijaerg",
        productName: product,
        recipesUrl: "",
      }),
      params: { bodyMessage: "" },
    });
  }
}
