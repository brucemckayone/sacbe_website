"use client";
import React, { useState } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/buttons/primaryButton";
import { useDisclosure } from "@mantine/hooks";
import TextInput from "@/components/form/inputs/TextInput";
import { Modal } from "@mantine/core";
import TextArea from "@/components/form/inputs/TextArea";
import { useUser } from "@/components/auth/affiliate_auth_context";
import ButtonLoader from "@/components/loaders/ButtonLoader";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { useSession } from "next-auth/react";
import { signInAndRedirectTo } from "@/utils/client/auth/redirect/signinAndRedirectTo";

function AffiliateSignUpModal(props: {
  opened: boolean;
  setSocial: (value: string) => void;
  social: string;
  setWebsite: (value: string) => void;
  website: string;
  message: string;
  setMessage: (value: string) => void;
  setIsSending: (arg0: boolean) => void;
  userData: any;
  setIsSent: (arg0: boolean) => void;
}) {
  return (
    <Modal
      opened={props.opened}
      onClose={function (): void {
        close();
      }}
    >
      <form action="">
        <TextInput
          placeHolder="Enter Your Social Media Account"
          label="Social Media"
          update={props.setSocial}
          value={props.social}
          type="text"
          key="Social Media Form Input"
        />
        <TextInput
          placeHolder="Enter your website if you have one"
          label="Website"
          update={props.setWebsite}
          value={props.website}
          type="text"
          key="website input form "
        />
        <TextArea
          key={""}
          placeHolder={"What Should We Know About You"}
          value={props.message}
          update={props.setMessage}
          label="Message"
        ></TextArea>
        <div className=" flex justify-center">
          <PrimaryButton
            className="self-center"
            text={"Make Request"}
            onClicked={async () => {
              props.setIsSending(true);
              await fetchPostJSON(`/api/affiliate/request`, {
                user: props.userData,
                social: props.social,
                website: props.website,
                message: props.message,
              });
              props.setIsSent(true);
              props.setIsSending(false);
            }}
          />
        </div>
      </form>
    </Modal>
  );
}

export function AffiliateHeader() {
  const [opened, { open, close }] = useDisclosure(false);
  const session = useSession();
  const user = useUser();
  const userData = user.user;

  const [social, setSocial] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  return (
    <div className="flex flex-col md:flex-row justify-between mx-5 md:mx-56 md:py-5">
      <AffiliateSignUpModal
        opened={opened}
        userData={userData}
        social={social}
        setSocial={setSocial}
        website={website}
        setWebsite={setWebsite}
        message={message}
        setMessage={setMessage}
        setIsSending={setIsSending}
        setIsSent={setIsSent}
      ></AffiliateSignUpModal>{" "}
      <div className="relative w-full self-center">
        <Image
          src={"/cacao_in_leaf.png"}
          width={600}
          height={600}
          alt={"header image"}
          className="object-contain p-10 md:mx-0"
        ></Image>
      </div>
      <div className="md:basis-10/12 self-center  ">
        <div className="flex flex-wrap md:w-12/12">
          <h1 className="mt-10 sm:text-center md:text-start  text-5xl md:text-7xl">
            SACBE AMBASSADOR PROGRAM
          </h1>
          <h2 className="text-3xl">Join in the abundance of cacao</h2>
        </div>
        <p className="md:w-8/12 mt-5">
          Join Our Affiliate Program Today! Unlock the power of ceremonial cacao
          and embark on a journey of spiritual awakening while earning enticing
          rewards. Become a part of our affiliate community and share the
          profound benefits of ceremonial cacao with others. Join now in the
          abundant opportunities that await you!
        </p>
        {generateButton()}
      </div>
    </div>
  );

  function generateButton(): JSX.Element {
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

    if (user.isLoading || isSending || session.status == "loading")
      return <ButtonLoader />;

    if (user.isError && session.status == "unauthenticated")
      return (
        <PrimaryButton
          text={"Join Now"}
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
