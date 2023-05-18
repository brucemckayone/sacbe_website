import stripe from "../../../../lib/stripe/stripe";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ((req.method = "POST")) {
    await sendWholeSaleInvoice(req.body as sendWholeSaleInvoiceType);
    res.status(200).json({ send: "send" });
  }
}

type sendWholeSaleInvoiceType = {
  customerId: string;
  name: string;
  bulk: {
    priceId: string;
    qty: number;
    total: number;
  };
  retail: {
    priceId: string;
    qty: number;
    total: number;
  };
  shipping: {
    displayName: string;
    fixedAmount: number;
    address: Stripe.AddressParam;
  };
};

export async function sendWholeSaleInvoice({
  customerId,
  name,
  shipping,
  bulk,
  retail,
}: sendWholeSaleInvoiceType) {
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  const unixTimestamp = Math.floor(futureDate.getTime() / 1000);

  const bulksnap = firestore().collection("wholesale_prices").doc("bulk").get();
  const retailsnap = firestore()
    .collection("wholesale_prices")
    .doc("retail")
    .get();

  const bulkUnitPirce = (await bulksnap).data();
  const retailUnitPirce = (await retailsnap).data();
  const invoiceParams: Stripe.InvoiceCreateParams = {
    auto_advance: false,
    currency: "GBP",
    customer: customerId,
    description: "a descriptions ",
    shipping_cost: {
      shipping_rate_data: {
        display_name: name,
        fixed_amount: {
          amount: 0,
          currency: "GBP",
        },
        type: "fixed_amount",
      },
    },
    shipping_details: {
      address: shipping.address,
      name: name,
    },
    collection_method: "send_invoice",
    due_date: unixTimestamp,
  };
  try {
    const invoice = await stripe.invoices.create(invoiceParams);

    if (bulk)
      await stripe.invoiceItems.create({
        customer: customerId,
        unit_amount: bulkUnitPirce!.Price,
        quantity: bulk.qty,
        description: "bulk cacao",
        invoice: invoice.id,
      });

    if (retail)
      await stripe.invoiceItems.create({
        customer: customerId,
        quantity: retail.qty,
        unit_amount: retailUnitPirce!.price,
        description: "retail cacao",
        invoice: invoice.id,
      });
    console.log(await stripe.invoices.finalizeInvoice(invoice.id));
    await stripe.invoices.sendInvoice(invoice.id);

    console.log("Email invoice sent successfully.");
  } catch (error) {
    console.error("Error sending email invoice:", error);
  }
}
