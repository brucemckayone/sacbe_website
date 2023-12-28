"use client";
import { getOneTimeId } from "@/lib/constants/stripe/productids";
import createCheckoutSession from "@/lib/stripe/checkout/createCheckoutSession";
import { userType } from "@/types/typings";

export async function buyOneTimeCacao(user: userType, oneoffQty: number) {
  await createCheckoutSession({
    prices: getOneTimeId() as string[],
    mode: "payment",
    customerId: user.customerId ?? undefined,
    qty: oneoffQty,
  });
}
