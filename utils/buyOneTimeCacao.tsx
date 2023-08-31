"use client";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import { envConfig } from "@/lib/webhooks/envConfig";
import testSwitch from "./test/TestSwitch";

export async function buySubscriptionFirstClass(
  user: userType,
  subQty: number
) {
  const getPrices = () => {
    const env = process.env.NEXT_PUBLIC_VERCEL_ENV;
    console.log(env);

    if (env == "preview") {
      return [
        "price_1NIqy6G859ZdyFmpzaNNkSNu",
        "price_1NIsjZG859ZdyFmpvMG66qkf",
      ];
    } else {
      return [
        "price_1NLYCcG859ZdyFmpa95GIeSb",
        "price_1NLYCaG859ZdyFmprZcXvCYg",
      ];
    }
  };

  await createCheckoutSession({
    prices: testSwitch({
      live: [
        "price_1NLYCcG859ZdyFmpa95GIeSb",
        "price_1NLYCaG859ZdyFmprZcXvCYg",
      ],
      test: [
        "price_1NIqy6G859ZdyFmpzaNNkSNu",
        "price_1NIsjZG859ZdyFmpvMG66qkf",
      ],
    }),
    mode: "subscription",
    customerId: user.customerId ?? undefined,
    qty: subQty,
  });
}

export async function buySubscriptionSecondClass(
  user: userType,
  subQty: number
) {
  await createCheckoutSession({
    prices: testSwitch({
      live: [
        "price_1NLYCcG859ZdyFmpa95GIeSb",
        "price_1NLYCaG859ZdyFmprZcXvCYg",
      ],
      test: [
        "price_1NIqy6G859ZdyFmpzaNNkSNu",
        "price_1NIsiYG859ZdyFmpLEjRmAAZ",
      ],
    }),
    mode: "subscription",
    customerId: user.customerId ?? undefined,
    qty: subQty,
  });
}

export async function buyOneTimeCacao(user: userType, oneoffQty: number) {
  await createCheckoutSession({
    prices: testSwitch({
      live: ["price_1NLYCcG859ZdyFmpgkHOXIUZ"],
      test: ["price_1NIqy6G859ZdyFmpEbQLnA5q"],
    }),
    mode: "payment",
    customerId: user.customerId ?? undefined,
    qty: 1,
  });
}
