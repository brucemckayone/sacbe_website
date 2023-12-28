"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useUser } from "../auth/UserProvider";
import PrimaryButton from "./primaryButton";
import TextInput from "../form/inputs/TextInput";
import TextArea from "../form/inputs/TextArea";
import api from "@/lib/apiSchema/apiSchema";

function AffiliateRequestButton() {
  const affiliate = useUser();
  const { data: data } = useSession();
  const [website, setWebsite] = useState("");
  const [social, setSocial] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  if (
    !affiliate.user.accountId &&
    !affiliate.user.affiliateStatus &&
    data?.user
  ) {
    return (
      <div className="rounded-lg bg-tertiaryContainer p-10 border w-full">
        <div className=" flex flex-col ">
          <h2>Affiliate Request Form</h2>
          <p>Enter Your details to request an affiliate account</p>
          <form action="" method="post">
            <div className="flex flex-col m-1">
              <TextInput
                placeHolder="website"
                update={setWebsite}
                value={website}
                key={"website"}
              />
              <TextInput
                placeHolder="social"
                update={setSocial}
                value={social}
                key="social"
              />
              <TextArea
                placeHolder="message"
                update={setMessage}
                value={message}
                key="message"
                label={"Message"}
              />
            </div>
          </form>
        </div>

        <div className="flex justify-center">
          <PrimaryButton
            onClicked={async () => {
              setLoading(true);
              if (!affiliate?.user?.affiliateStatus?.refId ?? true) {
                api.affiliate.request.post({
                  data: {
                    body: {
                      email: affiliate.user.email,
                      userId: affiliate.user.uuid,
                      message: message,
                      social: social,
                      wesbite: website,
                    },
                  },
                });
              }

              setLoading(false);
              affiliate.setUser({
                ...affiliate.user,
                affiliateStatus: { status: "pending", refId: "" },
              });
              location.reload();
            }}
            text={isLoading ? "Loading..." : "Send Request"}
            className="mx-20 my-4"
          />
        </div>
      </div>
    );
  } else if (
    data?.user && //user is logged in
    affiliate.user.affiliateStatus && // has request id
    !affiliate.user.accountId // and does not have an account id
  ) {
  }
  return <> </>;
}

export default AffiliateRequestButton;
