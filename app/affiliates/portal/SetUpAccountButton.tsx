import React, { useState } from "react";
import PrimaryButton from "@/components/buttons/primaryButton";
import setUpAffiliateAccount from "@/utils/server/stripe/setUpAffiliateAccount";
import { useAffiliate } from "@/components/auth/affiliate_auth_context";
import createOnBoardingLink from "@/utils/server/stripe/createOnboardingLink";
import ButtonLoader from "@/components/loaders/ButtonLoader";

function SetUpAccountButton() {
  const { user: affiliate, isLoading: isloading } = useAffiliate();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading || isloading) {
    return <ButtonLoader />;
  } else if (!affiliate.accountId) {
    return (
      <div className="text-center">
        <PrimaryButton
          text="Set Up Account"
          onClicked={async () => {
            setIsLoading(true);
            const accountLink = await setUpAffiliateAccount(affiliate.email);
            window.location.href = accountLink.url;
            setIsLoading(false);
          }}
        />
      </div>
    );
  } else if (affiliate.accountId && !affiliate.chargesEnabled) {
    return (
      <div className="text-center">
        <PrimaryButton
          text="Continue Set up"
          onClicked={async () => {
            setIsLoading(true);
            const accountLink = await createOnBoardingLink(affiliate.accountId);
            window.location.href = accountLink.url;
            setIsLoading(false);
          }}
        />
      </div>
    );
  }
  return <> </>;
}

export default SetUpAccountButton;
