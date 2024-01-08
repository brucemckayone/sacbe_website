"use client";
import { useUser } from "@/components/shared/auth/UserProvider";
import LinkButton from "@/components/shared/buttons/LinkButton";
import PrimaryButton from "@/components/shared/buttons/primaryButton";
import TextInput from "@/components/shared/form/inputs/TextInput";
import ButtonLoader from "@/components/shared/loaders/ButtonLoader";
import { signInAndRedirectTo } from "@/lib/auth/signinAndRedirectTo";
import { fetchPostJSON } from "@/utils/http/fetchPostJson";

import { useSession } from "next-auth/react";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

// async function sendRequest(data: any) {
//   const db = firestore();
//   db.collection("wholesale_requests").add(data);
// }

export function WholeSaleForm(): JSX.Element {
  const [firstName, setFirstname] = useState("");
  const session = useSession();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { isLoading, user } = useUser();

  return (
    <div className="flex flex-col">
      {session.status == "unauthenticated" ? (
        <div className="my-5">
          <h3 className="text-xl font-bold md:text-3xl">
            Request a wholesale account
          </h3>
          <p className="mb-3 ml-2">
            Simpily enter your details and hit send. When your request is
            approved we will contact you with the next steps.
          </p>

          <PrimaryButton
            text={"Join Now"}
            onClicked={async () => {
              signInAndRedirectTo("/wholesale");
            }}
          />
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
          />
        </div>
      );
    } else {
      if (user.wholesale != null || isSent) {
        return (
          <div className="my-5 text-black">
            <h3>Wholesale Request Status</h3>
            <p>
              Your whole sale request is is being processed, you will be
              notified by email when your request is processed
            </p>

            <div className="flex justify-between bg-recommendedGreen/70 rounded-lg p-4 my-4 drop-shadow-lg">
              <div>
                <h5>Request Status</h5>
                <p className="px-2">Your request has been sent</p>
              </div>
              <div className="bg-errorContainer p-4  rounded-lg drop-shadow-lg">
                <p className="text-onErrorContainer">Pending</p>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="flex flex-col my-5 h-96 justify-center ">
          <h3>Request a wholesale account</h3>
          <p className="mb-3 ml-2">
            Simpily enter your details and hit send. When your request is
            approved we will contact you with the next steps.
          </p>
          {isLoading ? (
            <ButtonLoader />
          ) : (
            <div className="flex flex-col justify-start">
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
                          try {
                            await fetchPostJSON(`/api/wholesale/request`, {
                              user: user,
                            });
                            toast.success(
                              "Wholesale account request has been made successfully"
                            );
                            setIsSent(true);
                            setIsSending(false);
                          } catch (e) {
                            toast.error(
                              "There was an error sending your wholesale request"
                            );
                            setIsSent(false);
                            setIsSending(false);
                          }
                        }
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  }
}
