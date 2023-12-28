import CollectionHelper from "@/utils/firebase/collectionHelper";
import stripe from "@/lib/stripe/init/stripe";
import { getSacbeProductId } from "@/lib/constants/stripe/productids";

export default class CouponAPIHelper {
  userColHelper: CollectionHelper;
  couponColHelper: CollectionHelper;
  constructor(db: FirebaseFirestore.Firestore) {
    if (!db)
      throw new Error(
        "Please provide an instance of FirebaseFirestore.Firestore to UserApi Class"
      );
    this.userColHelper = new CollectionHelper(db.collection("users"));
    this.couponColHelper = new CollectionHelper(db.collection("coupons"));
  }

  async get(params: URLSearchParams) {
    if (!params.has("couponName"))
      return {
        status: "error",
        message: "incorrect input parameters missing couponName",
      };

    return await this.couponColHelper.getDoc(
      params.get("couponName") as string
    );
  }

  async validateCoupon(params: URLSearchParams) {
    if (!params.has("couponName"))
      return {
        status: "error",
        message: "missing feild coupon name from get request",
      };
    return await this.couponColHelper.docExists(
      params.get("couponName") as string
    );
  }

  async post(body: { accountId: string; couponName: string; uuid: string }) {
    const { accountId, couponName, uuid } = body;

    try {
      this.userColHelper.updateDoc(uuid, { coupon: couponName });
      this.couponColHelper.createDocument(
        { coupon: couponName, uuid: uuid, accountId: accountId },
        couponName
      );
      this.createStripeCoupon(couponName, uuid, accountId);
      return {
        status: "success",
        ok: true,
        message: `Coupon ${couponName} was created for connected account: ${accountId}, for user :${uuid}`,
      };
    } catch (e) {
      return {
        status: "error",
        ok: false,
        message: `Coupon ${couponName} was failed to be created for connected account: ${accountId}, for user :${uuid}`,
        error: e,
      };
    }
  }

  private async createStripeCoupon(
    couponName: string,
    uuid: string,
    accountId: string
  ) {
    const coupon = await stripe.coupons.create({
      percent_off: 20,
      name: couponName,
      duration: "once",
      metadata: {
        uuid: uuid,
        accountId: accountId,
      },
      applies_to: {
        products: getSacbeProductId(),
      },
    });

    await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: couponName,
      active: true,
      restrictions: {
        first_time_transaction: true,
      },
      metadata: {
        uuid: uuid,
        accountId: accountId,
      },
    });
  }
}
