import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import adminInit from "@/utils/firebase/admin_init";
import AffiliateSender from "@/utils/email/senders/affiliateSender";
import affiliate_update_status from "@/utils/email/templates/affiliate_update_status";

export const affiliateRequestEndpoint = `/api/affiliate/request`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //

  switch (req.method) {
    // this endpoint takes in the request body and adds it to a affiliate request document in "affiliate_requests"
    // the document referance is saved along with the status of the request to "users" queried with email;
    case "POST":
      const user = req.body.user as userType;
      const social = req.body.social as string;
      const website = req.body.website as string;
      const message = req.body.message as string;

      if (!user.accountId) {
        res
          .status(200)
          .json(
            await sendAffiliateRequest(
              user,
              { social: social, website: website },
              message
            )
          );
      } else {
        res.status(200).json({ message: "user has already sent a request" });
      }
      break;

    case "PUT":
      await updateAffiliateStatus(req.body);
      new AffiliateSender().send({
        bodyMessage: `Your Affiliate Status has been updated: ${req.body.status}`,
        htmlContent: affiliate_update_status({ status: req.body.status }),
        subject: `Your Affiliate Status has been updated: ${req.body.status}`,
        to: req.body.email,
      });

      res.status(200).json({ message: "success" });
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
adminInit();
async function updateAffiliateStatus({
  status,
  userId,
}: {
  status: "active" | "pending";
  userId: string;
}) {
  const db = firestore();
  const userResult = await db
    .collection("users")
    .doc(userId)
    .set({ affiliateStatus: { status: status } }, { merge: true });
  return userResult;
}

async function sendAffiliateRequest(
  user: userType,
  marketingDetails: any,
  message: string
) {
  const db = firestore();

  // save affiliate request
  db.collection("affiliate_requests")
    .add({
      email: user.email,
      social: marketingDetails.social,
      website: marketingDetails.website,
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
          if (snapshot.docs.length > 0) {
            console.log("only one user in collection");
            //
            snapshot.forEach((doc) => {
              const data = doc.data();
              userId = doc.id;
              // set updates
              updates.push(
                doc.ref.set({
                  uuid: !data.uuid && doc.id, // of document has not an id uuid then add it
                  ...data,
                  social: marketingDetails.social, // do not delete data
                  website: marketingDetails.website, // do not delete data
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
