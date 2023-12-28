import CollectionHelper from "@/utils/firebase/collectionHelper";
import stripe from "@/lib/stripe/init/stripe";
import homeUrl from "@/lib/constants/urls";
import { APIResponse } from "../../types";
export default class SetupApiHelper {
  private userColHelper: CollectionHelper;

  constructor(db: FirebaseFirestore.Firestore) {
    if (!db)
      throw new Error(
        "Please provide an instance of FirebaseFirestore.Firestore to UserApi Class"
      );
    this.userColHelper = new CollectionHelper(db.collection("users"));
  }

  async get(params: URLSearchParams): Promise<APIResponse<any>> {
    let link;

    if (params.has("accountId")) {
      link = await this.createOnBoadingLink(params.get("accountId") as string);
    } else {
      if (!params.has("uuid") && !params.has("email"))
        return {
          ok: false,
          status: "error",
          message: "missing input feilds needs email and uuid",
          documentId: "",
          data: null,
        };

      const accountId = await this.createStripeAccount(
        params.get("uuid") as string,
        params.get("email") as string
      );
      link = await this.createOnBoadingLink(accountId);
    }

    return {
      ok: true,
      status: "success",
      documentId: "",
      message: "Account set up link is created",
      data: link,
    };
  }

  private async createStripeAccount(uuid: string, email: string) {
    const account = await stripe.accounts.create({
      type: "express",
      country: "GB",
      email: email as string,
      business_type: "individual",
      default_currency: "GBP",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
        link_payments: { requested: true },
        afterpay_clearpay_payments: { requested: true },
        klarna_payments: { requested: true },
      },
    });

    this.userColHelper.updateDoc(uuid, {
      accountId: account.id,
      chargesEnabled: account.charges_enabled,
    });

    return account.id;
  }

  private async createOnBoadingLink(accountId: string) {
    const accountLink = await stripe.accountLinks.create({
      account: accountId as string,
      refresh_url: `${homeUrl}/affiliate/portal`,
      return_url: `${homeUrl}/api/affiliates/onboarding_return?accountId=${accountId}`,
      type: "account_onboarding",
    });

    return accountLink;
  }
}
