import { fetchPostJSON } from "@/utils/http/fetchPostJson";
const getStripeCustomerIdByEmail = async (email: string | undefined | null) => {
  const customerId = await fetchPostJSON("api/users/get_user_id_by_email", {
    email: email,
  });
  return customerId;
};
export { getStripeCustomerIdByEmail };
