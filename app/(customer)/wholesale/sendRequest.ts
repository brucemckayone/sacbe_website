import { fetchGetJSON, fetchPostJSON } from "@/utils/stripe/fetchPostJson";

export default async function sendWholeSaleRequest(body: {
  email: string;
  name: string;
}) {
  return await fetchPostJSON(`api/wholesale/request`, {
    email: body.email,
    name: body.name,
  });
}
