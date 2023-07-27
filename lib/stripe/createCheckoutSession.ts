import Stripe from "stripe";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";

import createCustomerClient from "./createCustomerClient";
import { getStripeCustomerIdByEmail } from "../firebase/getStripeCustomerId";
import { getSession } from "next-auth/react";

// this function get the current user  email if session is active
// if active customer id is fetched from firestore based on email
// if no customer id exists one is created.
// when created it is saved to customer account.
// if not logged in checkout is created with guest customer
// checkout is opened in browser
interface params {
  prices: string[];
  customerEmail?: string;
  customerId?: string;
  mode: Stripe.Checkout.SessionCreateParams.Mode;
  qty: number
  discountCode?: string
}

export default async function createCheckoutSession({ prices, mode, qty, discountCode, customerId  }: params) {
  
  let email;
  const session = await getSession();
  

  if (session?.user) {
  
    email = session?.user?.email;
    try {
      customerId = await getStripeCustomerIdByEmail(email);
    } catch (e) {
      console.log(e);
    }

    let customer: Stripe.Customer | undefined;
    if (!customerId) {
      customer = await createCustomerClient({ email: email ?? "", name: "" });
      customerId = customer!.id!;
    }

  } else {
    console.log("session has no user");
  }

  const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
    "/api/stripe/client/create_checkout_session",
    {
      prices: prices,
      mode: mode,
      qty: qty,
      // discount: discountCode ??'',
    }
  );

  if (checkoutSession.url) {
    location.href = checkoutSession.url;
  }
}
