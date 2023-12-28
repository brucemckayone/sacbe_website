import api from "@/lib/apiSchema/apiSchema";

export default async function getAffiliatePayouts(accountId: string) {
  return await api.affiliate.payout.get({ data: { accountId: accountId } });
}
