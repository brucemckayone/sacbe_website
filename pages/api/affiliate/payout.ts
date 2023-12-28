import stripe from "@/lib/stripe/init/stripe";
import adminInit from "@/lib/firebase/admin_init";

interface ICreatePayOut {
  amount: number;
  accountId: string;
  sourceTransation: string;
  coupon: string;
}

export const createTransferByAccoundId = ({
  amount,
  accountId,
  sourceTransation,
  coupon,
}: ICreatePayOut) => {
  stripe.transfers.create({
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

export const getAccountIdFromCoupon = async (coupon: string) => {
  const admin = adminInit();
  const snap = await admin.firestore().collection("coupons").doc(coupon).get();
  if (snap.exists) {
    const userData = snap.data();
    if (userData) return userData["accountId"];
    else return null;
  }
};
