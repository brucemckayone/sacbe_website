import { userType } from "@/types/typings";
import { fetchPostJSON } from "@/utils/http/fetchPostJson";

export default async function sendWholeSaleRequest(user: userType) {
  return await fetchPostJSON(`api/wholesale/request`, {
    user: user,
  });
}
