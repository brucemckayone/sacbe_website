import { fetchPostJSON } from "@/utils/http/fetchPostJson";
import { fetchGetJSON } from "@/utils/http/fetchGetJSON";

async function sendMagicLink(email: string) {
  const data = await fetchPostJSON(`/api/auth/magic?email=${email}`, {
    email: email,
  });
  return data.status;
}

export default sendMagicLink;
