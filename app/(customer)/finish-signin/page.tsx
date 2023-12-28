"use client";
import { auth } from "@/lib/firebase/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchGetJSON } from "@/utils/http/fetchGetJSON";
import homeUrl from "@/lib/constants/urls";
import PrimaryButton from "@/components/shared/buttons/primaryButton";
import SlideInUp from "@/components/animations/slide_in_up";
import MagicLinkForm from "@/components/shared/form/MagicLinkForm";

function FinishSignin() {
  const [isValidLink, setIsValidLink] = useState(true);
  const [loading, setLoading] = useState(false);
  const [crfToken, setCrfToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      setLoading(true);
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
          handleSignin(email!, res["csrfToken"]);
          setLoading(false);
        })
        .catch((error) => {
          setIsValidLink(false);
          setLoading(false);
        });
    } else {
      setIsValidLink(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  if (isValidLink && !loading) {
    return (
      <div>
        <div className="flex flex-col items-center justify-around bg-gradient-to-br from-sacbeBrandColor to-primaryContainer">
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
      </div>
    );
  } else if (loading && !isValidLink) {
    return (
      <div>
        <div className="flex flex-col items-center justify-around bg-gradient-to-br from-sacbeBrandColor to-primaryContainer ">
          <SlideInUp animiation="animate-zoom_in_fade">
            <div className=" bg-surfaceVarient  px-5 md:px-20  py-5 my-24 mx-5 md:mx-20 rounded-xl border-2 shadow-2xl">
              <div className="text-center border-b-2 pb-6 mb-3">
                <MagicLinkForm />
                <p
                  className={`d:w-96 p-4 rounded-md border ${
                    !loading && !isValidLink
                      ? "bg-error border-onError text-onError"
                      : "bg-tertiaryContainer border-r-errorContainer text-onBackground"
                  }   shadow-md `}
                >
                  {!loading && !isValidLink
                    ? `It looks like there was a problem with your link. Its possible
                  you waited too link, or there was a problem with the link
                  generation. OR your are a hacker!!! please try again, unless
                  your a hacker!`
                    : `Validating Link....`}
                </p>
              </div>
            </div>
          </SlideInUp>
        </div>
      </div>
    );
  } else {
    return <></>;
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
    console.error(e);
  }
}

export default FinishSignin;
