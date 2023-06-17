import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";

export default async function sendWholeSaleRequest(user: userType) {
  console.log("here");
return await fetchPostJSON(`api/wholesale/request`, {
    user: user,
  });
}
