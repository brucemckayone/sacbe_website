import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";

// this endpoint takes in the request body and adds it to a affiliate request document in "affiliate_requests"
// the document referance is saved along with the status of the request to "users" queried with email;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.body.user as userType;
  const marketingDetails = req.body.marketingDetails;
  const message = req.body.message;

  switch (req.method) {
    case "POST":
      const user = req.body.user as userType;
      const marketingDetails = req.body.marketingDetails;
      const message = req.body.message;

      if (!user.accountId) {
        res
          .status(200)
          .json(await sendAffiliateRequest(user, marketingDetails, message));
      } else {
        res.status(200).json({ message: "user has already sent a request" });
      }
      break;
    case "PUT":
      const { status, docRef, userId } = req.body;
      res.status(200).json(await updateAffiliateStatus(status, docRef, userId));
      break;
    case "GET":
      const requestId = req.query.userId as string;
      res.status(200).json({ status: await getStatus(requestId) });
      break;
    default:
      res.status(400).json({
        message: `there is no endpoint that matches request method ${req.method}`,
      });
  }
}

async function getStatus(userId: string) {
  console.log(userId);
  const db = firestore();
  const docRef = await db.collection("users").doc(userId).get();
  const data = docRef.data();
  if (data) {
    return data!["affiliateStatus"]["status"];
  } else {
    return null;
  }
}

async function updateAffiliateStatus(
  status: "active" | "pending",
  docRef: string,
  userId: string
) {
  const db = firestore();
  const affiliateResult = await db
    .collection("affiliate_requests")
    .doc(docRef)
    .set({ status: status }, { merge: true });
  const userResult = await db
    .collection("users")
    .doc(userId)
    .set(
      { affiliateStatus: { status: status, refId: docRef } },
      { merge: true }
    );
}

async function sendAffiliateRequest(
  user: userType,
  marketingDetails: marketingType,
  message: string
) {
  const db = firestore();

  // save affiliate request
  db.collection("affiliate_requests")
    .add({
      email: user.email,
      social: marketingDetails,
      message: message,
    })
    .then((docRef) => {
      const updates: Promise<FirebaseFirestore.WriteResult>[] = [];
      // get users with email
      db.collection("users")
        .where("email", "==", user.email)
        .get()
        .then((snapshot) => {
          let userId: string = "";
          // if only one user
          if (snapshot.docs.length == 1) {
            console.log("only one user in collection");
            //
            snapshot.forEach((doc) => {
              const data = doc.data();
              userId = doc.id;
              // set updates
              updates.push(
                doc.ref.set({
                  uuid: !data.uuid && doc.id, // of document has not an id uuid then add it
                  ...data, // do not delete data
                  affiliateStatus: {
                    // add affiliate request a link it to the created document
                    refId: docRef.id,
                    status: "pending",
                  } as affiliateStatusType,
                })
              );
            });
          }
          // update created document with affiliate request;
          const cityRef = db.collection("affiliate_requests").doc(docRef.id);

          cityRef.update({
            userId: userId,
            userRef: db.doc(`users/${userId}`),
          });

          Promise.all(updates);
        });
    });

  return { message: "request has been sent" };
}
