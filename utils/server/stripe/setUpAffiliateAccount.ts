import createStripeAccount from "./createAccount";
import createOnBoardingLink from "./createOnboardingLink";

async function setUpAffiliateAccount(email: string) {
  const account = await createStripeAccount(email);
  const accountLink = await createOnBoardingLink(account.id);
  return accountLink;
}

export default setUpAffiliateAccount;
