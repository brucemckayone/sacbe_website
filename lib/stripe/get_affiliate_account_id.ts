import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";

interface params {
  email: string;
}
async function getAffiliateAccountId({ email }: params) {
  return await fetchPostJSON("https:localhost:3000/api/affiliates/id", {
    email: email,
  });
}

export default getAffiliateAccountId;
