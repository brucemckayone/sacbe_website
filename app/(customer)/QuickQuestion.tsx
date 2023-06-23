"use client";
import PrimaryButton from "@/components/buttons/primaryButton";
import { fetchGetJSON, fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { log } from "console";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MultiAwnserCard } from "../(quiz)/[quiz]/QuizBody";
import TextInput from "@/components/form/inputs/TextInput";
export function QuickQuestion(props: {
  endpoint?: string;
  question?: string;
  answers?: string[];
}) {
  //fetch data from api
  const [data, setData] = useState(
    {} as { question: string; answers: string[]; endpoint: string }
  );

  const [opened, { open, close }] = useDisclosure(false);
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("");

  const [selectedAwnser, setAwnser] = useState("");

  const tags = [
    "Ceremony",
    "Cacao",
    "Recipes",
    "Health",
    "Spirituality",
    "fitness",
    "Preforance",
    "Focus",
  ];
  const [selectedTags, setSelectedTags] = useState([
    "Interested in cacao points",
  ] as string[]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!props.question) {
        setData(await fetchGetJSON("/api/analytics/quick_question"));
      } else {
        setData({
          answers: props.answers!,
          question: props.question,
          endpoint: props.endpoint!,
        });
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) return <></>;

  return (
    <div className={!props.question ? `bg-tertiaryContainer` : ""}>
      {selectedAwnser ? (
        <div className="flex flex-col items-center justify-center">
          <h5>Thank you for your feedback!</h5>
          <p className="text-sm text-center">
            Soon you will be able earn cacao points for your feedback? get
            notified when this feature is available.
          </p>
          <PrimaryButton
            onClicked={async () => {
              if (session.data?.user?.email) {
                await signUp(session.data?.user?.email);
              } else {
                open();
              }
            }}
            text={isSending ? "Loading" : "Get Notified"}
            isPrimary={false}
          />
          <Modal opened={opened} onClose={close} title="Get Notified">
            <TextInput
              placeHolder="Enter Email..."
              update={setEmail}
              value={email}
              type="email"
              key="email"
            ></TextInput>
            <div className="flex flex-wrap">
              {tags.map((tag) => {
                return (
                  <MultiAwnserCard
                    key={tag}
                    addToSelected={setSelectedTags}
                    awnser={tag}
                    selected={selectedTags}
                  />
                );
              })}
            </div>
            <PrimaryButton
              onClicked={async () => {
                await signUp(email);
              }}
              text={isSending ? "Loading" : "Get Notified"}
              isPrimary={false}
            />
          </Modal>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h5>{data.question}</h5>
          <div className="flex flex-wrap mt-1 mx-5">
            {data.answers.map((answer) => {
              return (
                <div
                  key={answer}
                  onClick={async () => {
                    if (selectedAwnser != answer) {
                      setAwnser(answer);

                      await fetchPostJSON("/api/analytics/single", {
                        answer: answer,
                        endpoint: data.endpoint,
                        email: session.data?.user?.email ?? null,
                      });
                      toast.success("Thank you for your feedback!");
                      setIsLoading(false);
                    }
                  }}
                  className={`${
                    selectedAwnser == answer && "bg-sacbeBrandColor"
                  } rounded-md border-2 px-2 py-1 m-0.5 md:m-2 cursor-pointer`}
                >
                  <p className="text-sm md:text-lg">{answer}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  async function signUp(givenEmail: string) {
    setIsSending(true);
    const resp = await fetchPostJSON("api/mailing/signup", {
      email: givenEmail,
      tags: [...selectedTags, selectedAwnser],
    });
    console.log(resp);

    setIsSending(false);
    if (resp.success == true) {
      toast.success(
        `${resp.message} - Thanks for signing up, we will notify you when this feature is available`
      );
      close();
    } else {
      toast.error(`There was some error signing you up`);
    }
  }
}
