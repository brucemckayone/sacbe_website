"use client";
import { useUser } from "@/components/auth/affiliate_auth_context";
import LinkButton from "@/components/buttons/LinkButton";
import PrimaryButton from "@/components/buttons/primaryButton";
import TextInput from "@/components/form/inputs/TextInput";
import ButtonLoader from "@/components/loaders/ButtonLoader";
import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import { Divide } from "hamburger-react";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Wholesale from "../affiliates/portal/wholesale/page";
import sendWholeSaleRequest from "./sendRequest";

// async function sendRequest(data: any) {
//   const db = firestore();
//   db.collection("wholesale_requests").add(data);
// }

export function WholeSaleForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const session = useSession();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { isLoading, isError, user } = useUser();

  // useEffect(() => {
  //   fetchGetJSON(
  //     `/api/wholesale/account?email=${session.data?.user?.email}`
  //   ).then((res) => {

  //   });
  // }, [session]);

  return (
    <div className="flex flex-col">
      {session.status == "unauthenticated" ? (
        <div>
          <h2>How To Order</h2>
          <h3>Request a wholesale account</h3>
          <p className="mb-3">
            Simpily enter your details and hit send. When your request is
            approved we will contact you with the next steps.
          </p>

          <TextInput
            key="first name"
            type="text"
            placeHolder="First Name"
            update={setFirstname}
            value={firstName}
          />
          <TextInput
            key="Last Name"
            type="text"
            placeHolder="Last Name"
            update={setLastName}
            value={lastName}
          />
          <TextInput
            key="email"
            type="email"
            placeHolder="email"
            update={setEmail}
            value={email}
          />
          <div className="flex justify-center">
            <PrimaryButton
              text={"Login To Request Wholesale Account"}
              onClicked={() => {
                location.href = "/auth/signin";
              }}
            />
          </div>
        </div>
      ) : (
        generateSignedIn()
      )}
    </div>
  );
  function generateSignedIn() {
    if (user.wholesale) {
      return (
        <div>
          <h2>How To Order</h2>
          <h3>Request a wholesale account</h3>
          <p className="mb-3">
            Simpily enter your details and hit send. When your request is
            approved we will contact you with the next steps.
          </p>
          <LinkButton
            isPrimary={true}
            text="Go To Portal"
            url="/portal"
            key={"go to portal button "}
          ></LinkButton>
        </div>
      );
    } else {
      if (user.wholesale != null) {
        return (
          <div className="m-10">
            <h1>Wholesale Request Status</h1>
            <p>
              Your whole sale request is is being processed, you will be
              notified by email when your request is processed
            </p>

            <div className="bg-recommendedGreen rounded-lg p-4 m-4 shadow-md ">
              <h5>Request Status</h5>
              <p>Your request has been sent</p>
            </div>
          </div>
        );
      }
      return (
        <div className="flex flex-col h-96 justify-center ">
          <h2>How To Order</h2>
          <h3>Request a wholesale account</h3>
          <p className="mb-3">
            Simpily enter your details and hit send. When your request is
            approved we will contact you with the next steps.
          </p>
          {!session.data?.user?.name && (
            <TextInput
              key="first name"
              type="text"
              placeHolder="Enter Name"
              update={setFirstname}
              value={firstName}
            />
          )}

          {isSending ? (
            <ButtonLoader />
          ) : (
            <div>
              <PrimaryButton
                text={"Send Request"}
                onClicked={async () => {
                  if (!isSent) {
                    setIsSending(true);
                    const response = await sendWholeSaleRequest(user);
                    console.log(response);
                    setIsSent(true);
                    setIsSending(false);
                  }
                }}
              />

              {isSent && (
                <div className="bg-recommendedGreen rounded-lg p-4 m-4">
                  <h5>Request Status</h5>
                  <p>Your request has been sent</p>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  }
}
