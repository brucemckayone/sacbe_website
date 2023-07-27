"use client";
import { useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { toast } from "react-hot-toast";
import { analytics } from "@/lib/firebase/firebase";
import { logEvent } from "@firebase/analytics";
import TextInput from "@/components/form/inputs/TextInput";
import { useUser } from "@/components/auth/affiliate_auth_context";

const Modal = dynamic(() => import("@mantine/core").then((res) => res.Modal));

export function AskAQuestion() {
  const { user, isLoading } = useUser();
  const [opened, { open, close }] = useDisclosure(false);

  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email) {
      setEmail(user.email);
    }
  }, [user.email]);

  const handleQuestionSubmit = async () => {
    setLoading(true);
    await askQuestion(email, question);
    close();
    setLoading(false);
  };

  const memoizedModal = useMemo(
    () => (
      <Modal
        opened={opened}
        onClose={close}
        title="We Need An Email"
        size="md"
        shadow="md"
      >
        <label htmlFor="email" className="text-lg">
          Enter Your Email...
        </label>
        <TextInput
          placeHolder="Enter Your Email..."
          update={setEmail}
          value={email}
          type="email"
          key={""}
        />
        <button
          onClick={handleQuestionSubmit}
          type="button"
          aria-label="submit question"
          className="self-center rounded-md px-2 py-1 border-2 font-display"
        >
          <p className="text-lg self-end">{loading ? "Loading" : "SUBMIT"}</p>
        </button>
      </Modal>
    ),
    [opened, close, email, handleQuestionSubmit, loading]
  );

  return (
    <div className="w-full m-auto flex justify-center pb-10">
      <div className="w-11/12 md:w-8/12">
        <input
          id="question"
          type="text"
          value={question}
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
          placeholder="Any questions..."
          className="text-onPrimaryContainer focus:outline-none text-4xl md:text-5xl border-b-2 font-display placeholder:text-onPrimaryContainer self-center w-full bg-transparent m-auto px-5 pt-2 mt-10"
        />
        <div className="flex justify-between mt-2">
          <p className="text-sm">
            We love to help! If there is anything we can do, please reach out.
          </p>
          <button
            aria-roledescription="button for submitting question"
            aria-describedby="submit question"
            aria-label="submit question"
            onClick={() => {
              if (user.email) askQuestion(user.email, question);
              else open();
            }}
            type="button"
            className="self-end rounded-md px-2 py-1 border-2 font-display"
          >
            <p className="text-lg self-end">
              {isLoading ? "Loading..." : "SUBMIT"}
            </p>
          </button>
        </div>
      </div>
      {memoizedModal}
    </div>
  );
}

async function askQuestion(email: string, question: string) {
  const response = await fetchPostJSON("/api/analytics/ask_a_question", {
    email,
    question,
  });

  logEvent(analytics, "Question has been asked", {});

  if (response.success) {
    toast.success("Question Sent");
  } else {
    toast.error("Something Went Wrong");
  }
}
