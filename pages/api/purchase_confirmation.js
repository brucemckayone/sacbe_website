import initStripe from "stripe";
import { buffer } from "micro";
import { env } from "next.config";
import checkoutSessionCompleteHandler from "@/lib/webhooks/checkout_session_completed";
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704";
export const config = { api: { bodyParser: false } };
export default async function handler(req, res) {
  const stripe = initStripe(env.STRIPE_SECRET);
  const sig = req.headers["stripe-signature"];
  const reqBuffer = await buffer(req);
  let event;
  if (req.method === "POST") {
    try {
      event = stripe.webhooks.constructEvent(reqBuffer, sig, endpointSecret);
    } catch (err) {
      return req.status(401).send(`web hook error: ${err.message}`);
    }
    switch (event.type) {
      case "invoice.payment_succeeded":
        const invoicePaymentSucceeded = event.data.object;

        break;
      // ... handle other event types
      case "checkout.session.completed":
        checkoutSessionCompleteHandler(event.data.object);
        break;
      default:
      // console.log(event.data);
      // console.log(`Unhandled event type ${event.type}`);
    }
  } else {
    // Handle any other HTTP method
  }

  res.status(200).json({ name: "John Doe" });
}
