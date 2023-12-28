import homeUrl from "@/lib/constants/urls";
import Stripe from "stripe";

export interface ICreateCheckoutParams {
  prices: string[];
  qty: any;
  mode: Stripe.Checkout.SessionCreateParams.Mode;
  customerId: string | null | undefined;
  discount?: string | null | undefined;
  hasShipping?: boolean;
  hasReferalFeild?: boolean;
  metaData?: Record<string, any> | undefined;
}

export interface IPOSTCreateCheckoutParams {
  customerId?: string;
  mode?: string;
  prices: string[];
  qty: number;
  discount?: string;
  hasShipping?: boolean;
  hasReferalFeild?: boolean;
  metaData?: Record<string, any> | undefined;
}

export interface IGETCreateCustomCheckoutParams {
  customerId: string;
  price: number;
  deposit: number;
  hasShipping?: boolean;
  duration: number;
  metaData?: Record<string, any> | undefined;
}

export const referalFeild: Stripe.Checkout.SessionCreateParams.CustomField = {
  key: "Referal",
  label: {
    custom: "Email of the person who referred you",
    type: "custom",
  },
  type: "text",
  optional: true,
};

export default class StripeCheckoutApiHelper {
  private stripe: Stripe;

  constructor(stripe: Stripe) {
    if (!stripe)
      throw new Error(
        "you must provide a Stripe instance to StripeCheckoutAPIHelper"
      );
    this.stripe = stripe;
  }

  async createCustomCheckoutWithNoPrice(body: IGETCreateCustomCheckoutParams) {
    if (!validateInputs(body))
      return {
        status: "error",
        error: "invalid input params",
        message: "double check the spelling of your input params",
        ok: false,
        data: null,
      };

    const stripeResponse = await this.stripe.checkout.sessions.create({
      success_url: `${homeUrl}/complete/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${homeUrl}/cancelled/checkout?session_id={CHECKOUT_SESSION_ID}`,
      payment_method_types: ["card"],
      mode: "subscription",
      custom_fields: [
        referalFeild,
      ] as Stripe.Checkout.SessionCreateParams.CustomField[],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Cacao Facilitator Training Plan",
            },
            unit_amount: Math.round(
              (body.price - body.deposit) / body.duration
            ),
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },

        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "One Time Deposit",
            },
            unit_amount: body.deposit,
          },
          quantity: 1,
        },
      ],
      consent_collection: {
        terms_of_service: "required",
      },
      custom_text: {
        submit: {
          message: "Invest In My Future",
        },
        terms_of_service_acceptance: {
          message: `I agree to starting my subscription and paying for ${body.duration} months from the start date. I understand the deposit is non-refundable.`,
        },
      },

      subscription_data: {
        trial_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // starting one month from now
      },

      customer: body.customerId ?? undefined,
      customer_update: !body.customerId
        ? undefined
        : {
            shipping: "auto",
            name: "auto",
            address: "auto",
          },
      shipping_address_collection: !body.hasShipping
        ? undefined
        : {
            allowed_countries: ["GB"],
          },
      currency: "GBP",
      locale: "auto",
      metadata: body.metaData,
      phone_number_collection: {
        enabled: true,
      },
    });

    return {
      ok: true,
      status: "success",
      message: "checkout Session Created",
      data: stripeResponse,
    };

    function validateInputs(body: IGETCreateCustomCheckoutParams) {
      if (!body.price && !body.metaData) {
        return false;
      } else return true;
    }
  }

  async createCustomCheckout(body: IPOSTCreateCheckoutParams) {
    if (!validateInputs(body))
      return {
        status: "error",
        error: "invalid input params",
        message: "double check the spelling of your input params",
        ok: false,
        data: null,
      };

    const stripeResponse = await this.stripe.checkout.sessions.create(
      this.createCheckoutSessionParams({
        customerId: body.customerId!,
        mode: body.mode! as Stripe.Checkout.SessionCreateParams.Mode,
        prices: body.prices,
        qty: body.qty,
        discount: body.discount,
        metaData: body.metaData,
        hasShipping: body.hasShipping,
        hasReferalFeild: body.hasReferalFeild,
      })
    );

    return {
      ok: true,
      status: "success",
      message: "checkout Session Created",
      data: stripeResponse,
    };

    function validateInputs(body: IPOSTCreateCheckoutParams) {
      if (!body.prices && !body.qty && !body.customerId && !body.mode) {
        return false;
      } else return true;
    }
  }
  async createCheckoutSession(params: URLSearchParams) {
    if (!validateInputs(params))
      return {
        status: "error",
        error: "invalid input params",
        message: "double check the spelling of your input params",
        ok: false,
        data: null,
      };

    const stripeResponse = await this.stripe.checkout.sessions.create(
      this.createCheckoutSessionParams({
        customerId: params.get("customerId"),
        mode: params.get("mode") as Stripe.Checkout.SessionCreateParams.Mode,
        prices: JSON.parse(params.get("prices") as string),
        qty: parseInt(params.get("qty") as string),
        discount: (params.get("discount") as string) ?? undefined,
        hasShipping: true,
      })
    );

    return {
      ok: true,
      status: "success",
      message: "checkout Session Created",
      data: stripeResponse,
    };
    function validateInputs(params: URLSearchParams) {
      if (
        !params.has("prices") &&
        !params.has("qty") &&
        !params.has("customerId") &&
        !params.has("mode")
      ) {
        return false;
      } else return true;
    }
  }

  private calculateShippingQty(qty: number) {
    if (qty == 1 || qty == 2) {
      return 1;
    } else if (qty == 3 || qty == 4) {
      return 2;
    } else if (qty == 5 || qty == 6) {
      return 3;
    } else if (qty == 6 || qty == 7) {
      return 4;
    } else if (qty == 8 || qty == 9) {
      return 5;
    } else return 6;
  }

  private createCheckoutSessionParams(input: ICreateCheckoutParams) {
    const undefinedCheck = (value: any) =>
      value != "undefined" && value != undefined;
    const {
      customerId,
      mode,
      prices,
      qty,
      discount,
      metaData,
      hasShipping,
      hasReferalFeild,
    } = input;

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    prices.forEach((price) => {
      if (
        price != "price_1NLYCaG859ZdyFmprZcXvCYg" &&
        price != "price_1NLYCTG859ZdyFmpJCrCATal" &&
        price != "price_1NIsjZG859ZdyFmpvMG66qkf" &&
        price != "price_1NIsiYG859ZdyFmpLEjRmAAZ"
      ) {
        lineItems.push({
          adjustable_quantity: { enabled: false },
          quantity: qty,
          price: price,
        });
      } else {
        lineItems.push({
          adjustable_quantity: { enabled: false },
          quantity: this.calculateShippingQty(qty),
          price: price,
        });
      }
    });

    const discounts = undefinedCheck(discount)
      ? [{ coupon: discount! }]
      : undefined;

    let payload: Stripe.Checkout.SessionCreateParams = {
      success_url: `${homeUrl}/complete/checkout?session_id={CHECKOUT_SESSION_ID}`,
      line_items: lineItems,
      mode: mode,
      billing_address_collection: "required",
      allow_promotion_codes: discount == "undefined" ? true : undefined,
      cancel_url: `${homeUrl}/cancelled/checkout?session_id={CHECKOUT_SESSION_ID}`,
      currency: "GBP",
      locale: "auto",
      discounts: discounts,
      client_reference_id: undefinedCheck(customerId)
        ? customerId!
        : "guest checkout",
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
      metadata: metaData,
      custom_fields: hasReferalFeild ? [referalFeild] : undefined,
      customer: undefinedCheck(customerId) ? customerId! : undefined,
      customer_update: undefinedCheck(customerId)
        ? {
            shipping: "auto",
            name: "auto",
            address: "auto",
          }
        : undefined,
    };

    if (mode == "payment") {
      payload = {
        ...payload,
        // payment_method_types: ["card",  "afterpay_clearpay", "klarna", "],
        customer_creation: undefinedCheck(customerId)
          ? "if_required"
          : undefined,
        shipping_options: !hasShipping
          ? undefined
          : [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: {
                    currency: "gbp",
                    amount: this.generateShippingCost(qty),
                  },
                  display_name: "1st Class ",
                  delivery_estimate: {
                    maximum: {
                      unit: "business_day",
                      value: 3,
                    },
                    minimum: {
                      unit: "business_day",
                      value: 1,
                    },
                  },
                },
              },
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: {
                    currency: "gbp",
                    amount: this.generateSecondClassShipping(qty),
                  },
                  display_name: "2nd Class",
                  delivery_estimate: {
                    maximum: {
                      unit: "business_day",
                      value: 5,
                    },
                    minimum: {
                      unit: "business_day",
                      value: 2,
                    },
                  },
                },
              },
            ],
        shipping_address_collection: {
          allowed_countries: ["GB"],
        },
        invoice_creation: { enabled: true },
      };
    }

    return payload;
  }

  private generateSecondClassShipping(qty: number) {
    const shippingCost = 395;
    const shippingCostPertem = 195;
    const shippingCostPerItemAfter = 95;
    const shippingCostAfter = 2;
    if (qty <= shippingCostAfter) {
      return shippingCost;
    }
    return shippingCost + (qty - shippingCostAfter) * shippingCostPerItemAfter;
  }

  private generateShippingCost(qty: number) {
    const shippingCost = 495;
    const shippingCostPerItem = 295;
    const shippingCostPerItemAfter = 195;
    const shippingCostAfter = 2;
    if (qty <= shippingCostAfter) {
      return shippingCost;
    } else {
      return (
        shippingCost + (qty - shippingCostAfter) * shippingCostPerItemAfter
      );
    }
  }
}
