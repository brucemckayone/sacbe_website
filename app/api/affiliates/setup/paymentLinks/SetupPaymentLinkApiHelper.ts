import { getShippingRates } from "@/lib/constants/stripe/productids";
import homeUrl from "@/lib/constants/urls";
import stripe from "@/lib/stripe/init/stripe";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import testSwitch from "@/utils/test/TestSwitch";
import Stripe from "stripe";

export class SetupPaymentLinkApiHelper {
  private paymentLinkCol: CollectionHelper;

  constructor(db: FirebaseFirestore.Firestore) {
    if (!db)
      throw new Error(
        "Please provide an instance of FirebaseFirestore.Firestore to UserApi Class"
      );
    this.paymentLinkCol = new CollectionHelper(db.collection("paymentLinks"));
  }

  async delete(params: URLSearchParams) {
    if (!params.has("uuid"))
      return {
        status: "error",
        ok: false,
        message: "You are missing the feild uuid from the search params",
        data: null,
      };

    return await this.paymentLinkCol.deleteByDocId(
      params.get("uuid") as string
    );
  }

  async get(params: URLSearchParams) {
    if (!params.has("uuid"))
      return {
        status: "error",
        ok: false,
        message: "You are missing the feild uuid from the search params",
        data: null,
      };

    return await this.paymentLinkCol.getDoc(params.get("uuid") as string);
  }

  async post(body: {
    accountId: string;
    uuid: string;
    priceIds: string[];
    promoShippingId?: string;
  }) {
    //
    const params: Stripe.PaymentLinkCreateParams = {
      line_items: [
        {
          price: "",
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
          },
        },
      ],
      after_completion: {
        type: "redirect",
        redirect: {
          url: `${homeUrl}/complete/checkout?session_id={CHECKOUT_SESSION_ID}`,
        },
      },
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
      billing_address_collection: "required",
      currency: "GBP",
      allow_promotion_codes: true,
      shipping_options: getShippingRates(),
    };
    if (body.promoShippingId) {
      params.shipping_options = [
        {
          shipping_rate: body.promoShippingId,
        },
      ];
    }

    const prices = await Promise.all(
      body.priceIds.map((id) => stripe.prices.retrieve(id))
    );

    const products = await Promise.all(
      prices.map((price) => stripe.products.retrieve(price.product as string))
    );

    const linkParams = prices.map((price) => {
      const clone = structuredClone(params);
      clone.line_items[0].price = price.id;
      if (price.type == "recurring") {
        clone.application_fee_percent = 90;

        clone.transfer_data = {
          destination: body.accountId,
        };
        clone.line_items = [
          ...clone.line_items,
          {
            price: testSwitch({
              test: "price_1NIsiYG859ZdyFmpLEjRmAAZ",
              live: "price_1NLYCaG859ZdyFmprZcXvCYg",
            }),
            adjustable_quantity: {
              enabled: true,
              maximum: 4,
              minimum: 1,
            },
            quantity: 1,
          },
        ];
      } else {
        // clone.transfer_data!.amount = 300;
        clone.invoice_creation = {
          enabled: true,
        };
      }
      return clone;
    });

    const createdLinks = await Promise.all(
      linkParams.map((params) => stripe.paymentLinks.create(params))
    );

    let data = [] as any;
    for (var i = 0; i < prices.length; i++) {
      data.push({
        product: products[i],
        price: prices[i],
        link: createdLinks[i],
      });
    }

    return await this.paymentLinkCol.createDocument({ links: data }, body.uuid);
    return { status: 200, data: "product links have been producted" };
  }
}
