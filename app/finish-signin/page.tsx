"use client";
import { auth } from "@/lib/firebase/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import homeUrl from "@/lib/constants/urls";
import PrimaryButton from "@/components/buttons/primaryButton";
import SlideInUp from "@/components/animations/slide_in_up";
import MagicLinkForm from "@/components/form/MagicLinkForm";
function finishSignin() {
  const [isValidLink, setIsValidLink] = useState(false);
  const [crfToken, setCrfToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      setEmail(email!);
      signInWithEmailLink(auth, email!, window.location.href)
        .then(async (result) => {
          setIsValidLink(true);
          const res = await fetchGetJSON("/api/auth/csrf");
          setCrfToken(res["csrfToken"]);
          handleSignin(email!, crfToken);
        })
        .catch(async (error) => {
          setIsValidLink(false);
        });
    }
  }, []);
  if (isValidLink) {
    return (
      <div className="flex flex-col items-center justify-around h-screen bg-gradient-to-br from-sacbeBrandColor to-primaryContainer">
        <SlideInUp animiation="animate-zoom_in_fade">
          <div className=" bg-surfaceVarient px-20 py-24 mb-40 rounded-xl border-2 shadow-2xl">
            <div className="text-center border-b-2 pb-6 mb-3">
              <PrimaryButton
                onClicked={() => {
                  handleSignin(email!, crfToken);
                }}
                text="Validate Link"
              />
            </div>
          </div>
        </SlideInUp>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-around h-screen bg-gradient-to-br from-sacbeBrandColor to-primaryContainer ">
        <SlideInUp animiation="animate-zoom_in_fade">
          <div className=" bg-surfaceVarient px-20 py-24 mb-40 rounded-xl border-2 shadow-2xl m-4">
            <div className="text-center border-b-2 pb-6 mb-3">
              <MagicLinkForm />
              <p className="md:w-96">
                It looks like there was a problem with your link. Its possible
                you waited too link, or there was a problem with the link
                generation. OR your are a hacker!!! please try again, unless
                your a hacker!
              </p>
            </div>
          </div>
        </SlideInUp>
      </div>
    );
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
