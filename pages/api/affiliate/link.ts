import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import stripe from "@/lib/stripe/stripe";
import Stripe from "stripe";

import { PaymentLinkListType } from "@/types/affiliatePaymentLinkType";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method as requestMethodType) {
    case "POST":
      const { accountId, priceIds, uuid } = req.body;
      const postlinkResponse = await createPaymentLink({
        priceIds: priceIds,
        accountId: accountId,
        uuid: uuid,
      });
      res.status(postlinkResponse.status).json(postlinkResponse.data);
      break;
    case "GET":
      const getLinkResponse = await getPaymentLinks(req.query.uuid as string);
      res
        .status(getLinkResponse.status)
        .json(getLinkResponse.data as PaymentLinkListType);
      break;
  }
}

async function getPaymentLinks(uuid: string) {
  return firestore()
    .collection("paymentLinks")
    .doc(uuid)
    .get()
    .then((res) => {
      return { status: 200, data: res.data() };
    })
    .catch((e) => {
      return { status: 400, data: e };
    });
}

type createPaymentLinkParams = {
  accountId: string;
  uuid: string;
  priceIds?: string[];
  promoShippingId?: string;
};
async function createPaymentLink({
  accountId,
  uuid,
  priceIds = [
    "price_1Mb8slG859ZdyFmp0ttYsJAh",
    "price_1Mk4bEG859ZdyFmpFBoMuhFx",
  ],
  promoShippingId,
}: createPaymentLinkParams) {
  const params: Stripe.PaymentLinkCreateParams = {
    line_items: [
      {
        price: "",
        quantity: 1,
        adjustable_quantity: {
          enabled: false,
          //   maximum: 100,
          //   minimum: 0,
        },
      },
    ],
    transfer_data: {
      destination: accountId,
    },

    shipping_address_collection: {
      allowed_countries: ["GB"],
    },
    billing_address_collection: "required",

    currency: "GBP",
    allow_promotion_codes: true,

    shipping_options: [
      {
        shipping_rate: "shr_1Mca6JG859ZdyFmpEcTB0xXj",
      },
      {
        shipping_rate: "shr_1Mca5iG859ZdyFmpCplzBHJK",
      },
    ],
  };
  if (promoShippingId) {
    params.shipping_options = [
      {
        shipping_rate: promoShippingId,
      },
    ];
  }

  const prices = await Promise.all(
    priceIds.map((id) => stripe.prices.retrieve(id))
  );
  const products = await Promise.all(
    prices.map((price) => stripe.products.retrieve(price.product as string))
  );

  console.log(prices.length);

  const linkParams = prices.map((price) => {
    const clone = structuredClone(params);
    clone.line_items[0].price = price.id;
    if (price.type == "recurring") {
      clone.application_fee_percent = 90;
    } else {
      clone.transfer_data!.amount = 300;
    }
    return clone;
  });

  const createdLinks = await Promise.all(
    linkParams.map((params) => stripe.paymentLinks.create(params))
  );
  console.log("return");
  let data = [] as any;
  for (var i = 0; i < prices.length; i++) {
    data.push({
      product: products[i],
      price: prices[i],
      link: createdLinks[i],
    });
  }

  // const db = firestore();

  const db = firestore();
  db.collection("paymentLinks")
    .doc(uuid)
    .set({ links: data })
    .then(() => {
      console.log("firebase document created");
    })
    .catch((e) => {
      return { status: 200, data: "failed to save document to firebase" };
    });

  return { status: 200, data: "product links have been producted" };
}
