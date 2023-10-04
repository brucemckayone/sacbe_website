"use client";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import { userType } from "@/types/typings";
import testSwitch from "./test/TestSwitch";

export async function buySubscriptionFirstClass(
  user: userType,
  subQty: number
) {
  await createCheckoutSession({
    prices: testSwitch({
      live: [
        "price_1NLYCcG859ZdyFmpa95GIeSb",
        "price_1NLYCTG859ZdyFmpJCrCATal",
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
