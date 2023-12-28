import CustomerEmailSender from "@/lib/email/senders/customerSender";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import Stripe from "stripe";
import { APIResponse } from "../../types";
import { IPostBody } from "./types";

const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export default class MailingSignUpApiHelper {
  private segmentationCol: CollectionHelper;
  private email;
  constructor(db: FirebaseFirestore.Firestore) {
    this.segmentationCol = new CollectionHelper(db.collection("segmentation"));
    this.email = new CustomerEmailSender();
  }
  async post(body: IPostBody): Promise<APIResponse<any>> {
    try {
      const { email, name, phoneNumber, address, tags } = body;
      const listId = process.env.MAILCHIMP_AUDIENCE_ID;

      const prefs = await this.segmentationCol.getDoc(email);
      const got = prefs.data as { [key: string]: string[] | string };

      let data = [] as any;
      let emailMeAbout: string[] = [];

      if (prefs.ok)
        for (let key in got)
          if (key === "email_me_about") emailMeAbout = got[key] as string[];
          else if (got[key] instanceof String) data.push(got[key]);
          else if (got[key] instanceof Array)
            data.push(...(got[key] as string[]));

      if (tags instanceof Array) emailMeAbout.push(...tags);

      const subscribingUser = {
        firstName: name?.split(" ")[0] ?? null,
        lastName: name?.split(" ")[1] ?? null,
        email: email,
        tags: data,
        segments: emailMeAbout,
        phoneNumber: phoneNumber ?? null,
        address: address as Stripe.Address,
      };
      let message;
      const response = await mailchimp.lists
        .addListMember(listId, {
          email_address: subscribingUser.email,
          status: "subscribed",
          tags: subscribingUser.tags,
          merge_fields: {
            FNAME: subscribingUser.firstName ?? "",
            LNAME: subscribingUser.lastName ?? "",
            PHONE: subscribingUser.phoneNumber ?? "",
          },
        })
        .catch(async (error: any) => {
          message = "Success, Your information has been updated";
          return { success: true, message: message, error: error };
        });

      if (!message) message = response?.body?.title ?? "Success";

      this.sendSignupCouponEmail(email);
      return { ok: true, status: "success", data: null, message: message };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        status: "error",
        error: error,
        data: null,
        message: "",
      };
    }
  }

  private async sendSignupCouponEmail(email: string) {
    await this.email.sendSignUpGift(email);
  }
}
