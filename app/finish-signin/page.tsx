"use client";
import { auth } from "@/lib/firebase/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { Divide } from "hamburger-react";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import TextInput from "@/components/form/inputs/TextInput";
import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import homeUrl from "@/lib/constants/urls";
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
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email!, window.location.href)
        .then(async (result) => {
          // Clear email from storage.
          setIsValidLink(true);
          const providers = await getProviders();

          const res = await fetchGetJSON("/api/auth/csrf");
          console.log(res);

          console.log(res["csrfToken"]);
          // signIn(res["csrfToken"]);

          setProvider(
            <div>
              <form method="post" action="/api/auth/callback/credentials">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={res["csrfToken"]}
                />
                <label>
                  Username
                  <input name="username" type="text" />
                </label>
                <label>
                  Password
                  <input name="password" type="password" />
                </label>
                <button type="submit">Sign in</button>
              </form>
              <TextInput
                value={email!}
                placeHolder="enter your email"
                label="Email"
                update={() => {}}
                type="email"
                key="magic link auth input text"
              />
              <div key={providers!.credentials.name}>
                <button onClick={() => handleSignin(email!, res["csrfToken"])}>
                  Sign in with {providers!.credentials.name}
                </button>
              </div>
            </div>
          );
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch(async (error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          setIsValidLink(true);
          const providers = await getProviders();

          const res = await fetchGetJSON("/api/auth/csrf");
          console.log(res);

          console.log(res["csrfToken"]);
          // signIn(res["csrfToken"]);

          handleSignin(email!, res["csrfToken"]);
          setProvider(
            <div>
              <TextInput
                value={email!}
                placeHolder="enter your email"
                label="Email"
                update={() => {}}
                type="email"
                key={"setMgic signin form "}
              />
              <div key={providers!.credentials.name}>
                <button onClick={() => handleSignin(email!, res["csrfToken"])}>
                  Sign In
                </button>
              </div>
            </div>
          );
        });
    }
  }, []);
  if (isValidLink) {
    return <div>{emailProviders}</div>;
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
