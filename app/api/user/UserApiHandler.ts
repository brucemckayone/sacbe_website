import CollectionHelper from "@/utils/firebase/collectionHelper";

export class UserApiHandler {
  userColHelper: CollectionHelper;
  accountColHelper: CollectionHelper;
  constructor(db: FirebaseFirestore.Firestore) {
    if (!db)
      throw new Error(
        "Please provide an instance of FirebaseFirestore.Firestore to UserApi Class"
      );
    this.userColHelper = new CollectionHelper(db.collection("users"));
    this.accountColHelper = new CollectionHelper(db.collection("accounts"));
  }

  async get(params: URLSearchParams) {
    try {
      if (params.has("uuid")) {
        const uuid = params.get("uuid") as string;
        return await this.userColHelper?.getDoc(uuid);
      } else if (params.has("email")) {
        return await this.userColHelper?.getDocsWithKeyValue(
          "email",
          params.get("email"),
          true
        );
      } else if (params.has("customerId")) {
        return await this.userColHelper?.getDocsWithKeyValue(
          "customerId",
          params.get("customerId"),
          true
        );
      }
    } catch (e) {
      return { error: e };
    }
  }
  async delete(params: URLSearchParams) {
    if (params.has("uuid")) {
      const uuid = params.get("uuid") as string;

      const userDeleteResponse = await this.userColHelper.deleteByDocId(uuid);
      const accountDeleteResponse =
        await this.userColHelper.deleteAllDocsWithKeyValue("userId", uuid);

      return {
        status: "success",
        user: userDeleteResponse,
        account: accountDeleteResponse,
      };
    } else if (params.has("email") || params.has("customerId")) {
      const key = params.has("email") ? "email" : "customerId";
      const value = params.get(key) as string;
      const firstUser = await this.userColHelper.getDocsWithKeyValue(
        key,
        value,
        true
      );

      if (!firstUser?.ok || !firstUser?.documentId) {
        return { error: `No user found with ${key}: ${value}` };
      }

      const userDeleteResponse =
        await this.userColHelper.deleteAllDocsWithKeyValue(key, value);

      const accountDeleteResponse =
        await this.accountColHelper.deleteAllDocsWithKeyValue(
          "userId",
          firstUser.documentId
        );

      return {
        status: "success",
        user: userDeleteResponse,
        account: accountDeleteResponse,
      };
    } else {
      return {
        status: "error",
        error: "Invalid parameters. Please provide uuid, email, or customerId.",
      };
    }
  }

  async patch(body: { uuid: string; updates: any }) {
    const { updates, uuid } = body;
    return await this.userColHelper?.updateDoc(uuid, updates);
  }
}
