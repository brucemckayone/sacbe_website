"use client";
import LinkButton from "@/components/buttons/LinkButton";
import PrimaryButton from "@/components/buttons/primaryButton";
import TextInput from "@/components/form/inputs/TextInput";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import sendWholeSaleRequest from "./sendRequest";

// async function sendRequest(data: any) {
//   const db = firestore();
//   db.collection("wholesale_requests").add(data);
// }

export function WholeSaleForm(): JSX.Element {
  let wholeSaleAccount: { accountId: string } = { accountId: "" };
  useEffect(() => {
    wholeSaleAccount = { accountId: "string" };
  }, []);

  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const session = useSession();

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
              text={"Send Request"}
              onClicked={() => {
                sendWholeSaleRequest({
                  email: email,
                  name: `${firstName} ${lastName}`,
                });
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
    if (wholeSaleAccount.accountId) {
      return (
        <LinkButton
          isPrimary={true}
          text="Go To Portal"
          url="/portal"
          key={"go to portal button "}
        ></LinkButton>
      );
    } else {
      return (
        <div className="flex flex-col h-96 justify-center ">
          {!session.data?.user?.name && (
            <TextInput
              key="first name"
              type="text"
              placeHolder="Enter Name"
              update={setFirstname}
              value={firstName}
            />
          )}
          <PrimaryButton
            text={"Send Request"}
            onClicked={() => {
              sendWholeSaleRequest({
                email: session.data?.user?.email!,
                name: session.data?.user?.name ?? firstName,
              });
            }}
          />
        </div>
      );
    }
  }
}
