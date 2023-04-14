import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import stripe from "@/lib/stripe/stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { email } = req.body;
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
    console.log(email);

    const snapshot = await firestore()
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.docs.length == 1) {
      console.log(account.id);
      firestore()
        .collection("users")
        .doc(snapshot.docs[0].id)
        .set(
          {
            accountId: account.id,
            chargesEnabled: account.charges_enabled,
          },
          { merge: true }
        )
        .then(() => {
          console.log("firebase saved account id");
        });
    } else {
      console.log("NUMBER OF ACCOUNTS " + snapshot.docs.length);
    }
    res.status(200).json(account);
  } else if (req.method == "GET") {
    const accountId = req.query.accountId;
    if (accountId) {
      res.status(200).json(await stripe.accounts.retrieve(accountId as string));
    } else {
      res.status(200).json({ message: "you have to include and account id" });
    }
  }
}
