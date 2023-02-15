import { firestore } from "firebase-admin";
import { authFireStore } from "../firebase";

import Stripe from "stripe";
import { env } from "next.config";

interface params {
  id: string;
  shipping: object;
}

const checkoutSessionCompleteHandler = async (params: params) => {
  const stripe = new Stripe(env!.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });
  const lineItems = await stripe.checkout.sessions.listLineItems(params.id);
  const ids = lineItems.data.map((item) => item.price!.product);
  const productIDs = await stripe.products.list({ ids: ids as string[] });

  console.log(productIDs);
  //purchases
  // authFireStore.collection("purchases").add({
  //   lineItems: {
  //     a: lineItems.data,
  //   },
  //   purchaseDate: firestore.Timestamp,
  //   status: "processing",
  //   shipping: params.shipping,
  // });
};

export default checkoutSessionCompleteHandler;
