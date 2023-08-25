"use client";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";

export async function buySubscriptionFirstClass(
  user: userType,
  subQty: number
) {
  const getPrices = () => {
    const env = process.env.VERCEL_ENV;
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
    prices: getPrices(),
    mode: "subscription",
    customerId: user.customerId ?? undefined,
    qty: subQty,
  });
}

export async function buySubscriptionSecondClass(
  user: userType,
  subQty: number
) {
  const getPrices = () => {
    const env = process.env.VERCEL_ENV;
    if (env == "preview") {
      return [
        "price_1NIqy6G859ZdyFmpzaNNkSNu",
        "price_1NIsiYG859ZdyFmpLEjRmAAZ",
      ];
    } else {
      return [
        "price_1NLYCcG859ZdyFmpa95GIeSb",
        "price_1NLYCaG859ZdyFmprZcXvCYg",
      ];
    }
  };

  await createCheckoutSession({
    prices: getPrices(),
    mode: "subscription",
    customerId: user.customerId ?? undefined,
    qty: subQty,
  });
}

export async function buyOneTimeCacao(user: userType, oneoffQty: number) {
  const getPrices = () => {
    const env = process.env.VERCEL_ENV;
    if (env == "preview") {
      return ["price_1NIqy6G859ZdyFmpEbQLnA5q"];
    } else {
      return ["price_1NLYCcG859ZdyFmpgkHOXIUZ"];
    }
  };

  await createCheckoutSession({
    prices: getPrices(),
    mode: "payment",
    customerId: user.customerId ?? undefined,
    qty: 1,
  });
}
