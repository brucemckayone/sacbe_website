import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import stripe from "@/lib/stripe/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestType = req.method as requestMethodType;
  switch (requestType) {
      case "GET":
          return res.status(200).json(await getAccountIdFromCoupon(req.query.coupon as string));
      case "POST":
          const { uuid, accountId, couponName } = req.body;
          const response = await createCoupon(uuid, accountId, couponName);
          return res.status(response.status).json({ ok: response.ok, message: response.message });
    case "PUT":
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
  }
}

const db = firestore();
const getAccountIdFromCoupon = async (coupon: string) => { 
    
    const snap = await db.collection("coupons").doc(coupon).get();
    if (!snap.exists)
        return null;
 
    const userData = snap.data();
    if (userData)
        return userData["accountId"];
    else
        return null;

}

const getCouponFromAccountId = async (accountId: string) => {
    const snap = await db.collection('coupons').where("accountId", "==", accountId).limit(1).get();;
    if (snap.docs.length == 1) { 
        return snap.docs[0].data()["coupon"];
    } else return null;
 }

export const createCoupon = async (uuid: string, accountId: string, couponName: string) => {
    if ((await db.collection("coupons").doc(couponName).get()).exists)
        return { status: 200, ok: false, message:`The coupon ${couponName} already exists please try another name` };

    try {
        db.collection("users").doc(uuid).set({ coupon: couponName }, { merge: true });
        db.collection("coupons").doc(couponName).set({ coupon: couponName, uuid: uuid, accountId: accountId }, { merge: true });
        const coupon = await stripe.coupons.create({
            percent_off: 10,
            name: couponName,
            duration: "once",
            max_redemptions: 1,
            metadata: {
                "uuid": uuid,
                "accountId": accountId
            },
            applies_to: {
                products: ["prod_O7noF65HmL4yI7"]
            }
        });
        await stripe.promotionCodes.create({
            coupon: coupon.id,
            code: couponName,
            active: true,
            restrictions: {
                first_time_transaction:true
            }
        })
        return { status: 200, ok: true, message: `Coupon ${couponName} was created for connected account: ${accountId}, for user :${uuid}` };
    } catch (e) { 
        return { status: 400, ok: true, message: `Coupon ${couponName} was failed to be created for connected account: ${accountId}, for user :${uuid}` };
    }
};
const updateCoupon = () => { };
const couponExists = () => { };
const deleteCoupon = () => { };