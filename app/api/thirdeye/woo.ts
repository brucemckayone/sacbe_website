import stripe from "@/lib/stripe/init/stripe";
import { envConfig } from "@/lib/env/envConfig";
import { LineItem, ShippingLine, WooCreateOrderModel } from "@/types/typings";
import { fetchPostJSON } from "@/utils/http/fetchPostJson";
import Stripe from "stripe";

export async function createWoocommerceOrder(order: WooCreateOrderModel) {
  return await fetchPostJSON(
    `https://www.thirdeyetribe.co.uk/wp-json/wc/v3/orders?consumer_key=${envConfig.THIRDEYE_KEY}&consumer_secret=${envConfig.THIRDEYE_SECRET}`,
    order
  );
}

export async function convertStripeInvoiceToWoocommerceOrder(
  invoice: Stripe.Invoice
) {
  const productIds = invoice.lines.data.map(
    (line) => line.price!.product as string
  );
  const products = await stripe.products.list({ ids: productIds, limit: 100 });

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
    const name = products.data[i].name;
    const lineItem = invoice.lines.data.filter((e) => {
      return e.description?.toLowerCase().includes(name.toLowerCase());
    })[0];

    const product = {
      id: products.data[i].id ?? "no id",
      name: products.data[i].name ?? "no nake",
      image:
        products.data[i].images[0] ??
        "https://www.sacbe-ceremonial-cacao.com/logo.svg",
      quantity: lineItem.quantity ?? "non quantity",
      cost: lineItem.amount ?? 0,
      subscriptionId: lineItem.subscription ?? "no sub id",
    };
    productList.push(product);
  }

  const sacbeItems = productList.filter((p) => {
    return p.name.toLocaleLowerCase().includes("sacbe");
  });

  let shippingItem = invoice.lines.data.filter((e) => {
    return e.description?.toLowerCase().includes("shipping");
  });

  let shippingRates: string | null = "Nameless shipping rate ";
  try {
    shippingRates = (
      await stripe.shippingRates.retrieve(
        invoice.shipping_cost?.shipping_rate as string
      )
    ).display_name;
  } catch (e) {
    console.error(e);
  }
  const order: WooCreateOrderModel = {
    billing: {
      address_1: invoice.customer_address?.line1 ?? "",
      address_2: invoice.customer_address?.line2 ?? "",
      city: invoice.customer_address?.city ?? "",
      country: invoice.customer_address?.country ?? "",
      first_name: invoice.customer_name ?? " ",
      last_name: "",
      postcode: invoice.customer_address?.postal_code ?? "",
      state: invoice.customer_address?.state ?? "",
      email: invoice.customer_email ?? "",
    },
    shipping: {
      address_1: invoice.customer_address?.line1 ?? "",
      address_2: invoice.customer_address?.line2 ?? "",
      city: invoice.customer_address?.city ?? "",
      country: invoice.customer_address?.country ?? "",
      first_name: invoice.customer_name ?? " ",
      last_name: "",
      postcode: invoice.customer_address?.postal_code ?? "",
      state: invoice.customer_address?.state ?? "",
      email: invoice.customer_email ?? "",
    },
    line_items: sacbeItems.map((p) => {
      return {
        product_id: p.subscriptionId != "no sub id" ? 5331 : 5188,
        quantity: p.quantity,
      } as LineItem;
    }),
    payment_method: "Sacbe Stripe Integration - Card",
    payment_method_title: "Sacbe Stripe Integration",
    set_paid: true,
    shipping_lines:
      shippingItem.length == 0
        ? ([
            {
              method_id:
                (invoice.shipping_cost?.shipping_rate as string) ??
                "see order for shipping",
              method_title: shippingRates,
              total: (invoice.amount_shipping / 100).toFixed(2),
            },
          ] as ShippingLine[])
        : ([
            {
              method_id: shippingItem[0].description,
              method_title: shippingItem[0].description,
              total: (shippingItem[0].amount / 100).toFixed(2),
            },
          ] as ShippingLine[]),
  };

  return order;
}
