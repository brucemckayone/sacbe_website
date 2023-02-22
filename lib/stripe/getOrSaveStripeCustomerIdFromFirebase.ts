import { firestore } from "../firebase/firebase";
import { getOrCreateCustomer } from "@/pages/api/stripe/client/create_customer/_create_customer";
export default async function getOrSaveCustomerIdFromFirebase(email: string) {
  firestore
    .collection("users")
    .where("email", "==", email)
    .get()
    .then(async (snapshots) => {
      console.log(
        `updating: ${snapshots.docs.length} accounts with user Email = ${email}`
      );
      if (snapshots.docs.length > 0) {
        const updates: Promise<FirebaseFirestore.WriteResult>[] = [];
        snapshots.forEach(async (doc) => {
          console.log(`customerId:${doc.data()["customerId"]}`);
          if (!doc.data()["customerId"]) {
            console.log("updating all acounts with email");
            const customer = await getOrCreateCustomer({
              email: email!,
            });
            updates.push(
              doc.ref.set({
                ...doc.data(),
                customerId: customer!.id,
              })
            );
            await Promise.all(updates).then(() => {
              console.log(
                `stripe Customer Id added to firebase user account with email:${email} `
              );
              return customer!.id;
            });
          }
        });
      } else {
        console.error("there is no user in database with this email address");
      }
    });
}
