"use client";
import {
  getFirstClassSubscriptionId,
  getSecondClassSubscriptionId,
} from "@/lib/constants/stripe/productids";
import createCheckoutSession from "@/lib/stripe/checkout/createCheckoutSession";
import { userType } from "@/types/typings";

export async function buySubscriptionFirstClass(
  user: userType,
  subQty: number
) {
  await createCheckoutSession({
    prices: getFirstClassSubscriptionId(),
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
    prices: getSecondClassSubscriptionId(),
    mode: "subscription",
    customerId: user.customerId ?? undefined,
    qty: subQty,
  });
}
