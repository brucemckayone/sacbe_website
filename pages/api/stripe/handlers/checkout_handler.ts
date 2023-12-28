import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/env/envConfig";
import { createCheckoutSessionParams } from "../client/create_checkout_session";
import emailSender from "@/lib/email/nodemailer";
import getRawBody from "raw-body";

import stripe from "@/lib/stripe/init/stripe";
import adminInit from "@/lib/firebase/admin_init";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import { handleRoomPurchase } from "@/lib/training/roomHandler";

export const config = { api: { bodyParser: false } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig: string = req.headers["stripe-signature"] as string;
  const rawBody = await getRawBody(req);
  let event: Stripe.Event;
  let status = 200;
  let message = "unhandeld webhook";
  let data = { message: "no message" };

  try {
    adminInit();
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      envConfig.STRIPE_CHECKOUT_WEBHOOK
    );

    switch (event.type) {
      case "checkout.session.completed":
        const csCompleted = event.data.object as Stripe.Checkout.Session;

        let checkoutSession = await stripe.checkout.sessions.retrieve(
          csCompleted.id,
          { expand: ["line_items", "customer", "invoice"] }
        );

        // handleCheckoutCompleteLogging(checkoutSession);
        // await handleUnpaid(checkoutSession, stripe);
        console.log("unpaid handled");

        await handleAffiliatePayoutsViaCoupon(checkoutSession);
        console.log("coupon handled ");

        handleCustomFeilds(checkoutSession);
        console.log("custom fields handled");
        try {
          if (checkoutSession.metadata) {
            await handleRoomPurchase(
              checkoutSession.metadata.roomType,
              parseInt(checkoutSession.metadata.duration),
              checkoutSession.subscription as string
            );
          }
        } catch (err) {
          console.log(`room purchase error: ${err}`);
        }

        return res.status(status).json({
          status: status,
          message: message,
          data: data,
          invoice: checkoutSession,
        });

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.log(`webhook error failed ${err}`);
    const error = err as any;
    return res.status(401).json(`web hook error: ${error.message}`);
  }
  return res
    .status(status)
    .json({ status: status, message: message, data: data });
}

function handleCustomFeilds(
  checkoutSession: Stripe.Response<Stripe.Checkout.Session>
) {
  if (checkoutSession.custom_fields) {
    if (checkoutSession.custom_fields[0].key == "Referal") {
      if (checkoutSession.custom_fields[0].text?.value)
        new CollectionHelper(
          adminInit().firestore().collection("referals")
        ).createDocument(
          { info: checkoutSession.custom_fields[0].text?.value! },
          checkoutSession.custom_fields[0].text?.value!
        );
    }
  }
}

async function handleAffiliatePayoutsViaCoupon(
  checkoutSession: Stripe.Response<Stripe.Checkout.Session>
) {
  adminInit();
  const invoice = checkoutSession.invoice as Stripe.Invoice;

  if (invoice?.payment_intent && !invoice.transfer_data) {
    const coupon = invoice.discount?.coupon;
    if (coupon) {
      const accountId = await getAccountIdFromCoupon(coupon.name!);
      if (accountId) {
        const amount =
          invoice.total_discount_amounts?.reduce((sum, discount) => {
            return sum + discount.amount;
          }, 0) ?? 0;
        createTransferByAccoundId({
          accountId: accountId,
          amount: amount / 2 ?? 0,
          sourceTransation: invoice.charge as string,
          coupon: coupon.name!,
        });
      }
    }
  }
}

async function handleUnpaid(
  checkoutSession: Stripe.Response<Stripe.Checkout.Session>,
  stripe: Stripe
) {
  const admin = adminInit();
  if (checkoutSession.payment_status == "unpaid") {
    const customer = checkoutSession.customer as Stripe.Customer;
    const newSession = await stripe.checkout.sessions.create(
      createCheckoutSessionParams({
        customerId: customer?.id,
        mode: checkoutSession.mode,
        prices: checkoutSession.line_items!.data.map((item) => item!.price!.id),
        qty: checkoutSession!.line_items!.data[0].quantity,
      })
    );

    new emailSender().send({
      to: customer.email!,
      subject: "How can we help?",
      bodyMessage: "A little gift for you!",
      htmlContent: `<p>Hi ${customer.name},</p> <p> We noticed that you did not complete your purchase, so we attached 15% discount to your account to help make your decision for positive change easier.</p> <p>Here is a link with your coupon code: <a href="${newSession.url}">link</a></p> <p><a href="https://sacbe-ceremonial-cacao.com">Sacbe Cacao</a></p>`,
      replayTo: "no-replay@sacbe-ceremonial-cacao.com",
      sender: "Sacbe Cacao",
    });
  }
}

interface ICreatePayOut {
  amount: number;
  accountId: string;
  sourceTransation: string;
  coupon: string;
}

export const createTransferByAccoundId = ({
  amount,
  accountId,
  sourceTransation,
  coupon,
}: ICreatePayOut) => {
  stripe.transfers.create({
    destination: accountId,
    currency: "GBP",
    amount: amount,
    description: `Transfer was made on account of a customer using the coupon: ${coupon}, Thank you for sharing the medicine`,
    metadata: {
      coupon: coupon,
    },
    source_transaction: sourceTransation,
  });
};

export const getAccountIdFromCoupon = async (coupon: string) => {
  const helper = new CollectionHelper(
    adminInit().firestore().collection("coupons")
  );
  const snap = await helper.getDoc(coupon);

  if (snap.ok) {
    const userData = snap.data;
    if (userData) return userData["accountId"];
    else return null;
  }
};
