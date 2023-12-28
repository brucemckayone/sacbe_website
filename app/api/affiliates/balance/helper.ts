import stripe from "@/lib/stripe/init/stripe";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import Stripe from "stripe";
import { APIResponse } from "../../types";

stripe;
export default class AffiliateBalanceHelper {
  //public variable
  //private variables
  private stripe: Stripe;

  //constructor
  constructor(stripe: Stripe) {
    if (!stripe)
      throw new Error(
        "Please provide an instance of stripe to AffiliateBalanceHelper Class"
      );
    this.stripe = stripe;
  }

  //public functions
  async get(params: URLSearchParams) {
    if (!params.has("accountId")) {
      return {
        ok: false,
        message: "Missing params",
        data: null,
        status: "error",
        error: "You are missing the param accountId from get params",
      };
    }
    try {
      const accountId = params.get("accountId") as string;
      if (accountId) {
        const balance = await stripe.balance.retrieve(
          {},
          {
            stripeAccount: accountId as string,
          }
        );

        return {
          ok: true,
          message: "Balance has been fetched",
          data: balance,
          status: "success",
        };
      }
    } catch (e: any) {
      return {
        ok: false,
        message: "Missing params",
        data: null,
        status: "error",
        error: e,
      };
    }
  }

  async delete() {}
  async post() {}
  async patch() {}
  async put() {}

  //private functions
}
