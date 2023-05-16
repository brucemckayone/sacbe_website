import Stripe from "stripe";
import { firestore } from "firebase-admin";

export async function handlePaymentSucceeded(
  event: Stripe.Event,
  stripe: Stripe,
  data: {}
) {
  const invoice = event.data.object as Stripe.Invoice;
  const productIds = invoice.lines.data.map(
    (line) => line.price!.product as string
  );

  const products = await stripe.products.list({
    ids: productIds,
    limit: 100,
  });

  if (products.has_more) {
    const moreProducts = await stripe.products.list({
      ids: productIds,
      limit: 100,
      starting_after: "100",
    });
    products.data.push(...moreProducts.data);
  }

  let productList = [];
  for (let i = 0; i < products.data.length; i++) {
    const product = {
      id: products.data[i].id ?? "no id",
      name: products.data[i].name ?? "no nake",
      image: products.data[i].images[0] ?? "no image",
      quantity: invoice.lines.data[i].quantity ?? "non quantity",
      cost: invoice.lines.data[i].amount ?? 0,
      subscriptionId: invoice.lines.data[i].subscription ?? "no sub id",
    };
    productList.push(product);
  }

  data = {
    customer: {
      id: invoice.customer,
      name: invoice.customer_name,
      phone: invoice.customer_phone,
      email: invoice.customer_email,
      address: invoice.customer_address,
      customer_standard_shipping_address: invoice.customer_shipping,
    },
    products: productList,
    orderStatus: "processing" as orderStatusType,
    invoiceNumber: invoice.id,
    dateCreated: new Date(),
    lastUpdated: new Date(),
    amount_paid: invoice.amount_paid,
    amount_due: invoice.amount_due,
    shipping_cost: invoice.shipping_cost,
    charge: invoice.charge,
  };
  const db = firestore();

  const firebaseResponse = await db
    .collection("orders")
    .doc(invoice.id)
    .set(data);
  console.log(firebaseResponse);
  return data;
}
