"use client";
import { useUser } from "@/components/auth/affiliate_auth_context";
import LinkButton from "@/components/buttons/LinkButton";
import PrimaryButton from "@/components/buttons/primaryButton";
import TextInput from "@/components/form/inputs/TextInput";
import ButtonLoader from "@/components/loaders/ButtonLoader";
import homeUrl from "@/lib/constants/urls";
import { signInAndRedirectTo } from "@/utils/client/auth/redirect/signinAndRedirectTo";

import { signIn, useSession } from "next-auth/react";

import React, { useState } from "react";

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

          <div className="flex justify-center">
            <PrimaryButton
              text={"Join Now"}
              onClicked={async () => {
                signInAndRedirectTo("/wholesale");
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
          <div className=" mb-10">
            <h3>Wholesale Request Status</h3>
            <p>
              Your whole sale request is is being processed, you will be
              notified by email when your request is processed
            </p>

            <div className="flex justify-between bg-recommendedGreen rounded-lg p-4 my-4 drop-shadow-lg">
              <div>
                <h5>Request Status</h5>
                <p>Your request has been sent</p>
              </div>
              <div className="bg-errorContainer p-4  rounded-lg drop-shadow-lg">
                <p className="text-onErrorContainer">Pending</p>
              </div>
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
          {isLoading ? (
            <ButtonLoader />
          ) : (
            <div className="flex justify-start">
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
                  {!isSent && (
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
                  )}
                </div>
              )}
              )
            </div>
          )}
        </div>
      );
    }
  }
}
