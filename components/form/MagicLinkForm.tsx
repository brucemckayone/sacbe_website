"use client";
import TextInput from "./inputs/TextInput";
import { useState } from "react";
import sendMagicLink from "@/utils/server/auth/send_magic_link";
import PrimaryButton from "../buttons/primaryButton";
import Image from "next/image";

export default function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "failed" | "loading" | "success" | "notsent"
  >("notsent");
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Image
          src={"/sacbe_logo_icon.png"}
          width={180}
          height={180}
          alt={"sacbe logo"}
          className="mb-5"
        />
        <h3>Sign In</h3>
      </div>
      <TextInput
        label="Enter Your Email Address"
        placeHolder="cacaolover@gmail.com"
        update={setEmail}
        value={email}
        type="email"
        key={"magic link sign email form "}
      />
      <p>An magic link will be sent to your email</p>
      <EmailStatus status={status} />
      <PrimaryButton
        text="Get Link"
        isPrimary={true}
        key={"magic link sign in button :)"}
        onClicked={async () => {
          setStatus("loading");
          const statusCode = await sendMagicLink(email);
          window.localStorage.setItem("emailForSignIn", email);
          console.log(statusCode);
          if (statusCode == 200) {
            setStatus("success");
          } else {
            setStatus("failed");
          }
        }}
      />
    </div>
  );
}

interface emailStatusInterface {
  status: "failed" | "loading" | "success" | "notsent";
}
function EmailStatus({ status }: emailStatusInterface) {
  switch (status) {
    case "failed":
      return (
        <div className="border bg-errorContainer p-5 m-5 rounded-lg">
          <p className="text-onErrorContainer">
            There was a problem sending the email
          </p>
        </div>
      );

    case "success":
      return (
        <div className="border bg-recommendedGreen p-5 m-5 rounded-lg">
          <p className="text-onErrorContainer">Email Has Been Sent</p>
        </div>
      );
    case "notsent":
      return <></>;
    case "loading":
      return (
        <div className="border bg-tertiaryContainer p-5 m-5 rounded-lg flex flex-row justify-between">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-background animate-spin dark:text-gray-600 fill-sacbeBrandColor"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-onErrorContainer">Processing Request</p>
        </div>
      );
  }
}
