"use client";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useAffiliate } from "../auth/affiliate_auth_context";
import PrimaryButton from "./primaryButton";
import TextInput from "../form/inputs/TextInput";
import TextArea from "../form/inputs/TextArea";
import homeUrl from "@/lib/constants/urls";
function AffiliateRequestButton() {
  const affiliate = useAffiliate();
  const { data: data } = useSession();
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstgram] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  let marketingDetails: marketingType = {
    facebook: facebook,
    instagram: instagram,
    twitter: twitter,
    website: website,
  };

  if (
    !affiliate.user.accountId &&
    !affiliate.user.affiliateStatus &&
    data?.user
  ) {
    return (
      <div className="rounded-lg bg-tertiaryContainer p-10 border w-full">
        <div className=" flex flex-col ">
          <form action="" method="post">
            <div className="flex flex-col m-1">
              <h2>Socials</h2>
              <TextInput
                placeHolder="website"
                update={setWebsite}
                value={website}
                key={"website"}
              ></TextInput>
              <TextInput
                placeHolder="instagram"
                update={setInstgram}
                value={instagram}
                key={"instagram"}
              ></TextInput>
              <TextInput
                placeHolder="facebook"
                update={setFacebook}
                value={facebook}
                key={"facebook"}
              ></TextInput>
              <TextInput
                placeHolder="twitter"
                update={setTwitter}
                value={twitter}
                key="twitter"
              ></TextInput>
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
            onClicked={() => {
              setLoading(true);
              if (!affiliate?.user?.affiliateStatus?.refId ?? true) {
                fetchPostJSON(`${homeUrl}/api/affiliate/request`, {
                  user: {
                    accountId: "",
                    email: affiliate.user.email,
                    id: "",
                  },
                  marketingDetails: marketingDetails,
                  message: message,
                });
              }
              setLoading(false);
              affiliate.setUser({
                ...affiliate.user,
                affiliateStatus: { status: "pending", refId: "" },
              });
            }}
            text="Send Request"
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
