// import { firestore } from "firebase-admin";
// async function getAffiliateUser(email: string) {
//   try {
//     const snapshot = await firestore()
//       .collection("users")
//       .where("email", "==", email)
//       .get();

//     if (snapshot.docs.length > 0) {
//       const data = snapshot.docs[0].data() as userType;
//       return { status: 200, data: data };
//     } else {
//       return {
//         status: 200,
//         message: "there is no user with this email address",
//       };
//     }
//   } catch (e) {
//     return { status: 400 };
//   }
// }

// export default getAffiliateUser;
