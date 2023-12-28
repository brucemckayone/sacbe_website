import stripe from "../../../../lib/stripe/init/stripe";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import adminInit from "@/lib/firebase/admin_init";
import emailSender from "@/lib/email/nodemailer";
import wholesale_invoice_email from "@/lib/email/templates/wholesale/invoice";
import { userType } from "@/types/typings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ((req.method = "POST")) {
    try {
      const invoice = await sendWholeSaleInvoice(
        req.body as sendWholeSaleInvoiceType
      );
      res.status(200).json(invoice);
    } catch (e) {
      res.status(200).json(false);
    }
  }
}

type NewType = userType;

type sendWholeSaleInvoiceType = {
  extraEmail: string;
  user: NewType;
  bulk: {
    qty: number;
  };
  retail: {
    qty: number;
  };
  shipping: {
    fixedAmount: number;
    address: Stripe.AddressParam;
  };
};

export async function sendWholeSaleInvoice({
  user,
  shipping,
  bulk,
  retail,
  extraEmail,
}: sendWholeSaleInvoiceType) {
  adminInit();

  const bulksnap = firestore().collection("wholesale_prices").doc("bulk").get();
  const retailsnap = firestore()
    .collection("wholesale_prices")
    .doc("retail")
    .get();

  const bulkUnitPirce = (await bulksnap).data();
  const retailUnitPirce = (await retailsnap).data();

  try {
    const invoice = await stripe.invoices.create({
      customer: user.customerId,
      collection_method: "send_invoice",
      days_until_due: 30,
      shipping_details: {
        address: shipping.address,
        name: user.name ?? "No name given",
      },
      shipping_cost: {
        shipping_rate_data: {
          display_name: user.name ?? "No Name",
          fixed_amount: {
            amount: shipping.fixedAmount ?? 50,
            currency: "GBP",
          },
          type: "fixed_amount",
        },
      },
    });

    let items = [];
    if (bulk) {
      items.push({
        name: "bulk",
        invoice: invoice.id,
        quantity: bulk.qty,
        unit_amount: bulkUnitPirce!.price,
      });
    }
    if (retail) {
      items.push({
        name: "Retail",
        invoice: invoice.id,
        quantity: retail.qty,
        unit_amount: retailUnitPirce!.price,
      });
    }

    for (const item of items) {
      await stripe.invoiceItems.create({
        customer: user.customerId!,
        currency: "GBP",
        description: item.name,
        quantity: item.quantity,
        unit_amount: item.unit_amount,
        invoice: invoice.id,
      });
    }

    const finalInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    if (extraEmail != "")
      new emailSender().send({
        bodyMessage: "Your Wholesale Invoice is ready",
        htmlContent: wholesale_invoice_email(finalInvoice.hosted_invoice_url!),
        replayTo: "no-reply@sacbe-ceremonial-cacao.com",
        sender: "no-reply@sacbe-ceremonial-cacao.com",
        subject: "Your Wholesale Order Is Ready To Pay",
        to: extraEmail,
      });

    return await stripe.invoices.sendInvoice(invoice.id);
  } catch (error) {
    console.error("Error creating and sending invoice:", error);
  }
}
