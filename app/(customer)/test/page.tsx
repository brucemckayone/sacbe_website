import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
// "use client";
// import { useUser } from "@/components/shared/auth/UserProvider";
// import PrimaryButton from "@/components/shared/buttons/primaryButton";
// import api from "@/lib/apiSchema/apiSchema";
// import { getSubAndOneTimeId } from "@/lib/constants/stripe/productids";
// import { signOut } from "next-auth/react";
// import React from "react";

// function page() {
//   // const posts = api.affiliate.setup;

//   return (
//     <div>
//       <PrimaryButton
//         onClicked={async () => {
//           console.log(
//             await api.affiliate.payments.get({
//               data: { accountId: accountId },
//             })
//           );
//         }}
//         text={"Get"}
//       />
//       <PrimaryButton
//         onClicked={async () => {
//           await api.affiliate.setup.paymentLinks.post({
//             data: {
//               uuid: uuid,
//               accountId: accountId,
//               priceIds: getSubAndOneTimeId(),
//             },
//           });
//         }}
//         text={"post"}
//       />
//       <PrimaryButton onClicked={() => {}} text={"patch"} />
//       <PrimaryButton
//         onClicked={async () => {
//           console.log(
//             await api.user.delete({
//               data: { uuid: uuid },
//             })
//           );
//           signOut();
//         }}
//         text={"delete"}
//       />
//     </div>
//   );
// }

// export default page;
