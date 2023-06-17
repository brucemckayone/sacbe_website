"use client";
import { useUser } from "@/components/auth/affiliate_auth_context";
import TextInput from "@/components/form/inputs/TextInput";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export function AskAQuestion() {
  const user = useUser();
  const [opened, { open, close }] = useDisclosure(false);

  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  return (
    <div className="w-full bg-primaryContainer m-auto flex justify-center">
      <div className="w-8/12">
        <input
          type="text"
          value={question}
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
          placeholder="Any questions..."
          className="text-onPrimaryContainer focus:outline-none text-5xl border-b-2 font-display placeholder:text-onPrimaryContainer self-center w-full  bg-transparent m-auto px-5 pt-2 mt-10 "
        />
        <div className="flex justify-between mt-2">
          <p className="text-sm">
            We love to help if there is anything we can do please reach out
          </p>
          <button
            onClick={() => {
              if (user.user.email) {
                fetchPostJSON("/api/question", {
                  email: user.user.email,
                  question: question,
                });
              } else {
                open();
              }
            }}
            type="button"
            className="self-end rounded-md px-2 py-1 border-2 font-display"
          >
            <p className="text-lg self-end">
              {user.isLoading ? "Loading.." : "SUBMIT"}
            </p>
          </button>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="We Need An Email"
        size="md"
        shadow="md"
      >
        <TextInput
          placeHolder="Enter Your Email..."
          update={setEmail}
          value={email}
          type="email"
          key={""}
        />
        <button
          onClick={() => {
            fetchPostJSON("/api/question", {
              email: email,
              question: question,
            });
          }}
          type="button"
          className="self-center rounded-md px-2 py-1 border-2 font-display"
        >
          <p className="text-lg self-end">SUBMIT</p>
        </button>
      </Modal>
    </div>
  );
}
