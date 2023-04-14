import { fetchGetJSON, fetchPostJSON } from "@/utils/stripe/fetchPostJson";

async function sendMagicLink(email: string) {
  const data = await fetchPostJSON(`/api/auth/magic?email=${email}`, {
    email: email,
  });
  console.log(data);
  return data.status;
}

export default sendMagicLink;
