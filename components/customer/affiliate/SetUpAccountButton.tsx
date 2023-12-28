import React, { useState } from "react";
import PrimaryButton from "@/components/shared/buttons/primaryButton";
import { useUser } from "@/components/shared/auth/UserProvider";

import ButtonLoader from "@/components/shared/loaders/ButtonLoader";
import api from "@/lib/apiSchema/apiSchema";
import toast from "react-hot-toast";

function InitialSetup(props: any) {
  return (
    <div className="w-full rounded bg-tertiaryContainer border drop-shadow-md">
      <div className="text-center">
        <p className="mb-4">
          Clicking Setup Account will redirect you to our onboarding process.
          Please follow the instructions to set up your account.
        </p>

        <PrimaryButton
          text="Setup Account"
          onClicked={async () => {
            props.setIsLoading(true);
            const response = await api.affiliate.setup.get({
              data: {
                email: props.affiliate.email,
                uuid: props.affiliate.uuid,
              },
            });
            if (response?.ok) {
              window.location.href = response.data.url;
              toast.success("Setup has Started");
            } else {
              toast.error("Error starting Setup");
            }
            props.setIsLoading(false);
          }}
        />
        <div className=" w-11/12 md:w-5/12 m-auto text-start bg-errorContainer text-onErrorContainer p-2 mb-5 rounded-lg border font-body">
          <p>
            note: Your will need to have your bank account details at hand. In
            the section where it asks you to provide a website, if you do not
            have one use www.sacbe-ceremonial-cacao.com
          </p>
        </div>
      </div>
    </div>
  );
}

function SetUpAccountButton() {
  const { user: affiliate, isLoading: isloading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [hasPressed, setHasPressed] = useState(false);

  if (isLoading || isloading) {
    return <ButtonLoader />;
  } else if (!affiliate.accountId || isloading) {
    return <InitialSetup affiliate={affiliate} setIsLoading={setIsLoading} />;
  } else if (affiliate.accountId && !affiliate.chargesEnabled && !isloading) {
    return (
      <div className="text-center">
        <PrimaryButton
          isPrimary={!hasPressed}
          text="Continue Setup"
          onClicked={async () => {
            if (!hasPressed) {
              setHasPressed(true);
              setIsLoading(true);

              const response = await api.affiliate.setup.get({
                data: { accountId: affiliate.accountId },
              });

              if (response?.ok) {
                window.location.href = response.data.url;
                toast.success("Setup has Started");
              } else {
                toast.error("Error starting Setup");
              }

              setIsLoading(false);
            }
          }}
        />
      </div>
    );
  }
  return <> </>;
}

export default SetUpAccountButton;
