"use client";
import { auth } from "@/lib/firebase/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { Divide } from "hamburger-react";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import TextInput from "@/components/form/inputs/TextInput";
import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import homeUrl from "@/lib/constants/urls";
import PrimaryButton from "@/components/buttons/primaryButton";
function finishSignin() {
  // Confirm the link is a sign-in with email link.
  // Confirm the link is a sign-in with email link.
  const [isValidLink, setIsValidLink] = useState(false);
  const [emailProviders, setProvider] = useState(<div></div>);
  const [crfToken, setCrfToken] = useState("");

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email!, window.location.href)
        .then(async (result) => {
          setIsValidLink(true);
          const res = await fetchGetJSON("/api/auth/csrf");
          handleSignin(email!, res["csrfToken"]);
        })
        .catch(async (error) => {
          setIsValidLink(false);
        });
    }
  }, []);
  if (isValidLink) {
    return (
      <div>
        <PrimaryButton
          onClicked={() => {}}
          text="Confirm Sign in"
          key={"confirm signin button"}
        />
      </div>
    );
  } else {
    return <div>Looks like there was an issue with </div>;
  }
}

function handleSignin(email: string, token: string) {
  try {
    signIn("credentials", {
      email: email,
      token: token,
      redirect: true,
      callbackUrl: homeUrl,
    });
  } catch (e) {
    console.log(e);
  }
}

export default finishSignin;
