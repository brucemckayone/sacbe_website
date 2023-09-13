import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
import { analytics } from "@/lib/firebase/firebase";
import { logEvent } from "firebase/analytics";
import { createCheckoutSessionParams } from "../client/create_checkout_session";
import emailSender from "@/utils/email/nodemailer";
import getRawBody from "raw-body";
import { createTransferByAccoundId, getAccountIdFromCoupon } from "../../affiliate/payout";
import stripe from "@/lib/stripe/stripe";
import adminInit from "@/utils/firebase/admin_init";

export const config = { api: { bodyParser: false } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  adminInit();
  
  const sig: string = req.headers["stripe-signature"] as string;
  const rawBody = await getRawBody(req);
  
  let event: Stripe.Event;

  let status = 200;
  let message = "unhandeld webhook";
  let data = { message: "no message" };
  try {
    console.log(envConfig.STRIPE_CHECKOUT_WEBHOOK); 
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      envConfig.STRIPE_CHECKOUT_WEBHOOK
    );

    console.log(`handling ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed":
        const csCompleted = event.data.object as Stripe.Checkout.Session;
        let checkoutSession = await stripe.checkout.sessions.retrieve(
          csCompleted.id,
          { expand: ["line_items", "customer", "invoice"] }
        );
        console.log("logging logs ");
        
        // handleCheckoutCompleteLogging(checkoutSession);
        await handleUnpaid(checkoutSession, stripe);
        console.log("unpaid handled");
    
        await handleAffiliatePayoutsViaCoupon(checkoutSession);
        console.log("coupon handled ");
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.log(`webhook error faild ${err}`);
    const error = err as any;
    return res.status(401).send(`web hook error: ${error.message}`);
  }
  return res
    .status(status)
    .json({ status: status, message: message, data: data });
}


async function handleAffiliatePayoutsViaCoupon(checkoutSession: Stripe.Response<Stripe.Checkout.Session>) {
  const invoice = checkoutSession.invoice as Stripe.Invoice;
  if (invoice.payment_intent && !invoice.transfer_data) {
    const coupon = invoice.discount?.coupon;
    if (coupon) {
      const accountId = await getAccountIdFromCoupon(coupon.name!);
      if (accountId) {
        const amount = invoice.total_discount_amounts?.reduce((sum, discount) => { return sum + discount.amount; }, 0) ?? 0;
        createTransferByAccoundId({ accountId: accountId, amount: amount ?? 0, sourceTransation: invoice.charge as string ,coupon: coupon.name!});
      }
    }
  }
}

async function handleUnpaid(checkoutSession: Stripe.Response<Stripe.Checkout.Session>, stripe: Stripe) {
  if (checkoutSession.payment_status == "unpaid") {
    const customer = checkoutSession.customer as Stripe.Customer;
    const newSession = await stripe.checkout.sessions.create(createCheckoutSessionParams(checkoutSession.line_items!.data.map((item) => item!.price!.id), checkoutSession!.line_items!.data[0].quantity, checkoutSession.mode, customer?.id));

    new emailSender().send({
      to: customer.email!,
      subject: "How can we help?",
      bodyMessage: 'A little gift for you!',
      htmlContent: `<p>Hi ${customer.name},</p> <p> We noticed that you did not complete your purchase, so we attached 10% discount to your account to help make your decision for positive change easier.</p> <p>Here is a link with your coupon code: <a href="${newSession.url}">link</a></p> <p><a href="https://sacbe-ceremonial-cacao.com">Sacbe Cacao</a></p>`,
      replayTo: 'no-replay@sacbe-ceremonial-cacao.com',
      sender: 'Sacbe Cacao',
    });
  }
}

function handleCheckoutCompleteLogging(checkoutSession: Stripe.Response<Stripe.Checkout.Session>) {

  if (checkoutSession.mode == "payment") {
    logEvent(analytics, "Single Payment Checkout Complete", {
      total: checkoutSession.amount_total,
      customer: checkoutSession.customer_details?.name,
      customerEmail: checkoutSession.customer_details?.email
    });
  } else if (checkoutSession.mode == "subscription") {
    logEvent(analytics, "Single Payment Checkout Complete", {
      total: checkoutSession.amount_total,
      customer: checkoutSession.customer_details?.name,
      customerEmail: checkoutSession.customer_details?.email
    });
  }
}