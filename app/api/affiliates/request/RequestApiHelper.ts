import AffiliateSender from "@/lib/email/senders/affiliateSender";
import affiliate_update_status from "@/lib/email/templates/affiliate_update_status";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import { messaging } from "firebase-admin";
import { Messaging } from "firebase-admin/lib/messaging/messaging";
import { APIResponse } from "../../types";

export class AffiliateRequestHelper {
  private userColHelper: CollectionHelper;
  private requestColHelper: CollectionHelper;
  private sender: AffiliateSender;
  private message: Messaging;

  constructor(db: FirebaseFirestore.Firestore) {
    if (!db)
      throw new Error(
        "Please provide an instance of FirebaseFirestore.Firestore to UserApi Class"
      );
    this.userColHelper = new CollectionHelper(db.collection("users"));
    this.requestColHelper = new CollectionHelper(
      db.collection("affiliate_requests")
    );
    this.sender = new AffiliateSender();
    this.message = messaging();
  }

  async get(params: URLSearchParams) {
    try {
      if (params.has("userId")) {
        return await this.requestColHelper?.getDocsWithKeyValue(
          "userId",
          params.get("userId") as string,
          true
        );
      } else if (params.has("email")) {
        return await this.requestColHelper?.getDocsWithKeyValue(
          "email",
          params.get("email") as string,
          true
        );
      }
    } catch (e) {
      return { error: e };
    }
  }

  async delete(params: URLSearchParams) {
    try {
      if (params.has("userId")) {
        return await this.requestColHelper?.deleteAllDocsWithKeyValue(
          "userId",
          params.get("userId") as string
        );
      } else if (params.has("email")) {
        return await this.requestColHelper?.deleteAllDocsWithKeyValue(
          "email",
          params.get("email") as string
        );
      } else if (params.has("userId")) {
        return await this.requestColHelper?.deleteAllDocsWithKeyValue(
          "userRef",
          params.get("userRef") as string
        );
      }
    } catch (e) {
      return { error: e };
    }
  }

  async post(body: Record<string, any>, id?: string) {
    if (!id) id = await this.getOrCreateUuidByEmail(body.email);
    this.updateUserAffiliateStatus(id, "pending");

    this.sender.sendRequestMade(body.email);

    this.message.send({
      notification: {
        title: `${body.email} status has been created as 'pending'`,
        body: `${body.email} has requested an affiliate account`,
        imageUrl: "https://www.sacbe-ceremonial-cacao.com/logo.svg",
      },
      topic: "all",
    });

    return await this.requestColHelper.createDocument(body, id);
  }

  async patch(
    body: { status: "active" | "pending"; email: string },
    id: string
  ): Promise<APIResponse<any>> {
    try {
      const resp = await this.updateUserAffiliateStatus(id, body.status);

      if (!resp?.ok) throw new Error(resp.message);

      this.sender.sendRequestMade(body.email, body.status);

      this.message.send({
        notification: {
          title: `${body.email} status has been updated to ${body.status}`,
          body: `${body.email} account status updated`,
          imageUrl: "https://www.sacbe-ceremonial-cacao.com/logo.svg",
        },
        topic: "all",
      });

      return {
        ok: true,
        status: "success",
        message:
          "affiliate status Updated messaging complete status: " + body.status,
        data: null,
      };
    } catch (e) {
      return {
        ok: false,
        status: "error",
        message: "There was an error updating affiliate status",
        data: null,
        error: e,
      };
    }
  }

  private async updateUserAffiliateStatus(
    uuid: string,
    status: "active" | "pending"
  ) {
    try {
      this.userColHelper.updateDoc(uuid, {
        affiliateStatus: { refId: uuid, status: status },
      });
      return {
        ok: true,
        status: "success",
        message: "affiliate status Updated",
        data: null,
      };
    } catch (e) {
      return {
        ok: false,
        status: "error",
        message: "There was an error updating affiliate status",
        data: null,
        error: e,
      };
    }
  }

  private async getOrCreateUuidByEmail(email: string) {
    const userDoc = await this.userColHelper.getDocsWithKeyValue(
      "email",
      email,
      true
    );
    this.userColHelper.updateDoc(userDoc.documentId as string, {
      uuid: userDoc.documentId,
    });

    return userDoc.documentId as string;
  }
}
