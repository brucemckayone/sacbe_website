"use client";
import { MultiAwnserCard } from "@/app/(quiz)/[quiz]/QuizBody";
import { logEvent } from "@firebase/analytics";
import dynamic from "next/dynamic";
import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [intrestList, setIntrestList] = useState(["newsletter"]);
  const [signedUp, setSignedUp] = useState(false);

  const ConfettiExplosion = dynamic(() =>
    import("react-confetti-explosion").then((res) => res.default)
  );

  const intrests = [
    "Newsletter",
    "Recipes",
    "Blog Posts",
    "New Products",
    "Discounts",
    "Events",
    "Workshops",
    "Education",
  ];

  if (signedUp)
    //confetti animation
    return (
      <div className="w-full bg-primaryContainer m-auto flex justify-center pb-10 mt-10 p-5 rounded drop-shadow-lg">
        <div className=" w-11/12 md:w-8/12">
          <h1 className="text-4xl md:text-5xl text-center">
            Thank you for signing up!
          </h1>
          <ConfettiExplosion />
          <p className="text-center text-xl">
            We will be in touch with you soon!
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full bg-primaryContainer m-auto flex justify-center pb-10 mt-10 rounded drop-shadow-lg">
      <div className=" w-11/12 md:w-8/12">
        <label htmlFor="email" className="hidden">
          Email
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Join our newsletter..."
          className="text-onPrimaryContainer focus:outline-none text-4xl placeholder:text-3xl md:text-5xl border-b-2 font-display placeholder:text-onPrimaryContainer self-center w-full  bg-transparent m-auto  pt-2 mt-10"
        />
        <div className="flex justify-between mt-2">
          <h3 className="text-sm mt-2">Choose what you want to hear about?</h3>
          <button
            onClick={async () => {
              setLoading(true);
              await signUp();
              setLoading(false);
              setSignedUp(true);
            }}
            type="button"
            className="self-end rounded-md px-2 py-1 border-2 font-display"
          >
            <span className="text-lg self-end">
              {loading ? "Loading..." : "Submit"}
            </span>
          </button>
        </div>

        <div className="flex flex-wrap">
          {intrests.map((e) => {
            return (
              <MultiAwnserCard
                addToSelected={setIntrestList}
                awnser={e}
                selected={intrestList}
                key={e}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  async function signUp() {
    const fetchPostJSON = (await import("@/utils/stripe/fetchPostJson"))
      .fetchPostJSON;
    const toast = (await import("react-hot-toast")).toast;

    const analytics = (await import("@/lib/firebase/firebase")).analytics;

    const response = await fetchPostJSON("/api/mailing/signup", {
      email: email,
      tags: [...intrestList, "Likes blog posts & Recipes"],
    });

    logEvent(analytics, "Newsletter signup", {});

    if (response.success) {
      toast.success("Signed up, you will hear from us soon!");
    } else toast.error("Something Went Wrong");
  }
}
