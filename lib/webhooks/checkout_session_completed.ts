import { firestore } from "firebase-admin";
import Stripe from "stripe";
import { envConfig } from "./envConfig";

const checkoutSessionCompleteHandler = async (params: Stripe.Event) => {
  console.log("handling checkout session web hook");
  const stripe = new Stripe(envConfig.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });
  let data = params.data as any;
  data = data.object as object;
  console.log(data.id);

  const lineItems = await stripe.checkout.sessions.listLineItems(data.id);
  const ids = lineItems.data.map((item) => item.price!.product);
  let products = await stripe.products.list({ ids: ids as string[] });
  // products = products.data as any;
  let dbProducts: any = [];
  if (products.object == "list") {
    dbProducts = products.data.map((p) => ({
      id: p.id,
      defaultPrice: p.default_price,
      name: p.name,
    }));
  }

  console.log(dbProducts);
  // purchases
  firestore().collection("purchases").add({
    lineItems: dbProducts,
    // purchaseDate: firestore.Timestamp,
    status: "processing",
    // shipping: params.shipping,
  });
  return dbProducts;
};

export default checkoutSessionCompleteHandler;
