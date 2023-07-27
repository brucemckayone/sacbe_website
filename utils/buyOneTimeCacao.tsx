"use client";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";

export async function buySubscriptionFirstClass(
  user: userType,
  subQty: number
) {
  await createCheckoutSession({
    prices: [
      "price_1NLYCcG859ZdyFmpa95GIeSb",
      "price_1NLYCTG859ZdyFmpJCrCATal",
    ],
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
    prices: [
      "price_1NLYCcG859ZdyFmpa95GIeSb",
      "price_1NLYCaG859ZdyFmprZcXvCYg",
    ],
    mode: "subscription",
    customerId: user.customerId ?? undefined,
    qty: subQty,
  });
}

export async function buyOneTimeCacao(user: userType, oneoffQty: number) {
  await createCheckoutSession({
    prices: ["price_1NLYCcG859ZdyFmpgkHOXIUZ"],
    mode: "payment",
    customerId: user.customerId ?? undefined,
    qty: 1,
  });
}
