import stripe from "../../../../lib/stripe/stripe";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import adminInit from "@/utils/firebase/admin_init";

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
  user: userType;
  bulk: {
    qty: number;
    total: number;
  };
  retail: {
    qty: number;
    total: number;
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
    const invoiceParams: Stripe.InvoiceCreateParams = {
      auto_advance: false,
      currency: "GBP",
      customer: user.customerId!,
      description: "a descriptions",
      shipping_details: {
        address: shipping.address,
        name: user.name!,
      },
      collection_method: "send_invoice",
      days_until_due: 30,
    };
    const invoice = await stripe.invoices.create({
      customer: user.customerId,
      collection_method: "send_invoice",
      days_until_due: 30,
      shipping_cost: {
        shipping_rate_data: {
          display_name: user.name ?? "No Name",
          fixed_amount: {
            amount: shipping.fixedAmount,
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
        quantity: 2,
        unit_amount: bulkUnitPirce!.price,
      });
    }
    if (retail) {
      items.push({
        name: "Retail",
        invoice: invoice.id,
        quantity: 1,
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

    await stripe.invoices.sendInvoice(invoice.id);

    console.log("Invoice created and sent:", invoice);
  } catch (error) {
    console.error("Error creating and sending invoice:", error);
  }
}
