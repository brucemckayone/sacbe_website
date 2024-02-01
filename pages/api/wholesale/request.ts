import { NextApiRequest, NextApiResponse } from "next";
import { firestore, messaging } from "firebase-admin";
import adminInit from "@/lib/firebase/admin_init";
import stripe from "@/lib/stripe/init/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  adminInit();

  const db = firestore();
  const requestCol = db.collection("wholesale_requests");
  const userCol = db.collection("users");
  let user: any;
  let ref: firestore.DocumentReference<firestore.DocumentData>;

  const method = req.method as requestMethodType;

  switch (method) {
    case "POST":
      user = req.body.user;

      ref = requestCol.doc(user.email);

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

          messaging().send({
            notification: {
              title: "New Wholesale Request",
              body: `${user.email} has requested a wholesale account`,
              imageUrl: "https://www.sacbe-ceremonial-cacao.com/logo.svg",
            },
            topic: "all",
          });

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
      const uuid = req.body.uuid;
      const status = req.body.status;

      userCol.doc(uuid).set({ wholesale: status }, { merge: true });

      return res.status(200).json({ message: "Status has been updated" });
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
