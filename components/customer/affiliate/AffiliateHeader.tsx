"use client";

import React, { useState } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/shared/buttons/primaryButton";
import { useDisclosure } from "@mantine/hooks";
import TextInput from "@/components/shared/form/inputs/TextInput";
import TextArea from "@/components/shared/form/inputs/TextArea";
import { useUser } from "@/components/shared/auth/UserProvider";
import ButtonLoader from "@/components/shared/loaders/ButtonLoader";
import { useSession } from "next-auth/react";
import { signInAndRedirectTo } from "@/lib/auth/signinAndRedirectTo";
import headerImage from "../../../public/home_header/home_page_header_image_2.jpg";
import { Modal } from "@mantine/core";
import api from "@/lib/apiSchema/apiSchema";

function AffiliateSignUpModal(props: {
  opened: boolean;
  isSending: boolean;
  close: () => void;
  setIsSending: (arg0: boolean) => void;
  setIsSent: (arg0: boolean) => void;
}) {
  const [social, setSocial] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const {
    user: { email, uuid },
  } = useUser();

  const body = {
    social: social,
    message: message,
    wesbite: website,
    email: email,
    userId: uuid,
  };

  return (
    <Modal
      opened={props.opened}
      onClose={function (): void {
        props.close();
      }}
    >
      <TextInput
        placeHolder="Enter Your Social Media Account"
        label="Social Media"
        update={setSocial}
        value={social}
        type="text"
        key="Social Media Form Input"
      />
      <TextInput
        placeHolder="Enter your website if you have one"
        label="Website"
        update={setWebsite}
        value={website}
        type="text"
        key="website input form "
      />
      <TextArea
        key={"message input"}
        placeHolder={"What Should We Know About You"}
        value={message}
        update={setMessage}
        label="Message"
      />
      <div className=" flex justify-center">
        <PrimaryButton
          className="self-center"
          text={props.isSending ? "Sending..." : "Make Request"}
          onClicked={async () => {
            props.setIsSending(true);
            await api.affiliate.request.post({
              data: {
                id: uuid,
                body: body,
              },
            });
            props.setIsSent(true);
            props.setIsSending(false);
            props.close();
          }}
        />
      </div>
    </Modal>
  );
}

export function AffiliateHeader() {
  const [opened, { open, close }] = useDisclosure(false);

  const session = useSession();
  const user = useUser();
  const userData = user.user;

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  return (
    <div className="relative">
      <AffiliateSignUpModal
        opened={opened}
        isSending={isSending}
        close={close}
        setIsSending={setIsSending}
        setIsSent={setIsSent}
      />

      <div className="">
        <Image
          src={headerImage}
          alt={"A cacao pod in a leaf with cacao beans spilling out of it"}
          className="w-full object-cover h-[700px] md:h-[900px]"
        />
        <div className="absolute px-2 py-2 text-white bottom-0 md:bottom-32 md:left-28 backdrop-blur-sm backdrop-filter bg-black/20  shadow-2xl border-white w-full md:w-1/3">
          <h1 className="sm:text-center md:text-start text-4xl lg:text-6xl flex flex-wrap ">
            SACBE AMBASSADOR PROGRAM
          </h1>
          <h2 className="text-xl font-bold mt-5">
            Join in the abundance of cacao
          </h2>
          <p className=" ml-1">
            Join Our Affiliate Program Today! Unlock the power of ceremonial
            cacao and embark on a journey of spiritual awakening while earning
            enticing rewards. Become a part of our affiliate community and share
            the profound benefits of ceremonial cacao with others.
          </p>
          <GenerateButton />
        </div>
      </div>
    </div>
  );
  function GenerateButton(): JSX.Element {
    const pending = (
      <div className=" flex justify-start">
        <div className="flex justify-between bg-recommendedGreen p-3 my-3  rounded drop-shadow-md">
          <div>
            <h4>Affiliate Status</h4>
            <p>Your Affiliate request is being processed</p>
          </div>
          <div className="flex flex-col justify-center bg-errorContainer rounded-lg border shadow-lg p-3 mx-3">
            <p>Pending</p>
          </div>
        </div>
      </div>
    );

    if (session.status == "unauthenticated")
      return (
        <PrimaryButton
          text={"Join Now"}
          className="text-black"
          onClicked={() => {
            signInAndRedirectTo("/affiliates");
          }}
        />
      );

    if (user.isError && session.status == "authenticated")
      return (
        <div className="bg-errorContainer p-4 m-4 rounded-lg border">
          <p>There was an error fetching user data</p>
        </div>
      );

    if (isSent) return pending;

    if (user.isLoading || isSending || session.status == "loading")
      return <ButtonLoader />;

    if (!userData.affiliateStatus) {
      return (
        <PrimaryButton
          text={"Join Now"}
          onClicked={() => {
            open();
          }}
        />
      );
    } else {
      switch (userData.affiliateStatus.status) {
        case "active":
          return (
            <PrimaryButton
              text={"Go To Portal"}
              onClicked={() => {
                window.location.href = "/portal";
              }}
            />
          );
        case "pending":
          return pending;
      }
    }
  }
}
