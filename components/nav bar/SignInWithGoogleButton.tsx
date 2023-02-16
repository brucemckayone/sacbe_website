"use client";
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase/firebase";
import Image from "next/image";
import "../../app/globals.css";
function SignInWithGoogleButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };
  return (
    <button className="button" onClick={signInWithGoogle}>
      <Image
        src={"/google-logo-9808.png"}
        width={30}
        height={30}
        alt="google logo"
      />
      <p className="padded">Sign in with Google</p>
    </button>
  );
}

export default SignInWithGoogleButton;
