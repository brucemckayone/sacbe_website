import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import adminInit from "@/utils/firebase/admin_init";
import stripe from "@/lib/stripe/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  adminInit();

  const db = firestore();
  const requestCol = db.collection("wholesale_requests");
  const userCol = db.collection("users");
  let user: userType;
  let ref: firestore.DocumentReference<firestore.DocumentData>;

  const method = req.method as requestMethodType;
  switch (method) {
    case "POST":
      user = req.body.user;
      ref = requestCol.doc(user.email);
      console.log(user);

      if (!user.uuid) {
        user.uuid = await addUuidToUser(user.email);
      }

      if (!user.customerId) {
        await addCustomerIdToUser(user.uuid, user.email);
      }

      await userCol.doc(user.uuid).set({ wholesale: false }, { merge: true });

      try {
        const doc = await ref.get();

        if (!doc.exists) {
          const request = {
            name: user.name ?? "name",
            email: user.email,
            isApproved: false,
            uuid: user.uuid,
          };

          await ref.set(request);

          userCol.doc(user.uuid).set({ wholesale: false }, { merge: true });

          return res.status(200).json({
            message: "A new request for wholesale has been sent",
            data: request,
          });
        } else {
          return res.status(200).json({
            message: "Wholesale request already exists",
            data: doc.data(),
          });
        }
      } catch (e) {
        console.error(e);
      }

    case "PATCH":
      user = req.body.user;
      const status = req.body.status;

      ref = requestCol.doc(user.email);
      const doc = await ref.get();

      if (doc.exists) {
        ref.set({
          isApproved: status,
        });

        userCol.doc(user.uuid).set({ wholesale: status }, { merge: true });

        return res.status(200).json({ message: "Status has been updated" });
      } else {
        return res.status(400).json({
          message: "There is no wholesale account request for this account",
        });
      }
  }
}

export async function addCustomerIdToUser(uuid: string, email: string) {
  const customer = await stripe.customers.create({
    email: email,
  });
  firestore()
    .collection("users")
    .doc(uuid)
    .set({ customerId: customer.id }, { merge: true });
}

export async function addUuidToUser(email: string) {
  const snap = await firestore()
    .collection("users")
    .where("email", "==", email)
    .get();

  if (snap.docs.length == 1) {
    await firestore()
      .collection("users")
      .doc(snap.docs[0].id)
      .set({ uuid: snap.docs[0].id }, { merge: true });
    return snap.docs[0].id;
  }
  return "";
}
