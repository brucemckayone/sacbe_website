import { firestore } from "firebase-admin";
import { getOrCreateCustomer } from "../stripe/client/create_customer/_create_customer";
import { NextApiRequest, NextApiResponse } from "next/types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body.email;
  console.log(`calling get get user by id: with email: ${email}`);
  if (email) {
    //get snapshot of users with emails
    const db = firestore();
    const snapshots = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    console.log(
      `returned ${snapshots.docs.length} users with email: from firestore ${email}`
    );

    const { customerId } = snapshots.docs[0].data();
    if (customerId) {
      //return first user if it customer id exists
      res.status(200).json(customerId);
    } else {
      // if customer id does not exist and there is a user with this email
      if (snapshots.docs.length > 0) {
        const updates: Promise<FirebaseFirestore.WriteResult>[] = [];
        //create a customer from stripe
        const customer = await getOrCreateCustomer({
          email: email!,
        });
        // prime updates with customer id
        snapshots.forEach(async (doc) => {
          console.log("updating all acounts with email");
          updates.push(
            doc.ref.set({
              ...doc.data(),
              customerId: customer!.id,
            })
          );
          // add updates to customer id
          await Promise.all(updates);
          res.status(200).json(customer!.id);
        });
      }
    }
  } else {
    res.status(400).json("message: please provide an email");
  }
}
