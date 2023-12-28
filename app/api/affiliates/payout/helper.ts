import adminInit from "@/lib/firebase/admin_init";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import Stripe from "stripe";
import { APIResponse } from "../../types";

export default class AffiliatePayoutApiHelper {
  //public variable
  //private variables
  private stripe: Stripe;

  //constructor
  constructor(db: FirebaseFirestore.Firestore, stripe: Stripe) {
    if (!db)
      throw new Error(
        "Please provide an instance of FirebaseFirestore.Firestore to AffiliatePayoutApiHelper Class"
      );

    if (!stripe)
      throw new Error(
        "Please provide an instance of stripe to AffiliatePayoutApiHelper Class"
      );

    this.stripe = stripe;
  }

  //public functions
  async get(params: URLSearchParams): Promise<APIResponse<any>> {
    if (!params.has("accountId") && !params.has(""))
      return {
        data: null,
        message: "need to add account id to get params",
        ok: false,
        status: "error",
      };

    return {
      data: await this.stripe.payouts.list(
        {},
        { stripeAccount: params.get("accountId") as string }
      ),
      message: "payout fetched for customer" + params.get("accountId"),
      ok: true,
      status: "success",
    };
  }
  async delete() {}
  async post() {}
  async patch() {}
  async put() {}

  //private functions

  createTransferByAccoundId = ({
    amount,
    accountId,
    sourceTransation,
    coupon,
  }: ICreatePayOut) => {
    this.stripe.transfers.create({
      destination: accountId,
      currency: "GBP",
      amount: amount,
      description: `Transfer was made on account of a customer using the coupon: ${coupon}, Thank you for sharing the medicine`,
      metadata: {
        coupon: coupon,
      },
      source_transaction: sourceTransation,
    });
  };
  getAccountIdFromCoupon = async (coupon: string) => {
    const admin = adminInit();
    const snap = await admin
      .firestore()
      .collection("coupons")
      .doc(coupon)
      .get();
    if (snap.exists) {
      const userData = snap.data();
      if (userData) return userData["accountId"];
      else return null;
    }
  };
}

interface ICreatePayOut {
  amount: number;
  accountId: string;
  sourceTransation: string;
  coupon: string;
}

// export const createTransferByAccoundId = ({
//   amount,
//   accountId,
//   sourceTransation,
//   coupon,
// }: ICreatePayOut) => {
//   this.stripe.transfers.create({
//     destination: accountId,
//     currency: "GBP",
//     amount: amount,
//     description: `Transfer was made on account of a customer using the coupon: ${coupon}, Thank you for sharing the medicine`,
//     metadata: {
//       coupon: coupon,
//     },
//     source_transaction: sourceTransation,
//   });
// };

// export const getAccountIdFromCoupon = async (coupon: string) => {
//   const admin = adminInit();
//   const snap = await admin.firestore().collection("coupons").doc(coupon).get();
//   if (snap.exists) {
//     const userData = snap.data();
//     if (userData) return userData["accountId"];
//     else return null;
//   }
// };
