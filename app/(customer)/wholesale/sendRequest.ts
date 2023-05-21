import { fetchGetJSON, fetchPostJSON } from "@/utils/stripe/fetchPostJson";

export default async function sendWholeSaleRequest(user: userType) {
  return await fetchPostJSON(`api/wholesale/request`, {
    user: user,
  });
}
