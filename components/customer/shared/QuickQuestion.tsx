"use client";
import { fetchPostJSON } from "@/utils/http/fetchPostJson";
import { fetchGetJSON } from "@/utils/http/fetchGetJSON";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { generateSlug } from "@/utils/url/formater";
import dynamic from "next/dynamic";
import PrimaryButton from "@/components/shared/buttons/primaryButton";
import TextInput from "@/components/shared/form/inputs/TextInput";
import { MultiAwnserCard } from "../../../app/(quiz)/[quiz]/QuizBody";
import api from "@/lib/apiSchema/apiSchema";

export function QuickQuestion(props: {
  endpoint?: string;
  question?: string;
  awnsers?: string[];
}) {
  const [data, setData] = useState(
    {} as { question: string; awnsers: string[]; endpoint: string }
  );

  const ConfettiExplosion = dynamic(() =>
    import("react-confetti-explosion").then((res) => res.default)
  );

  const TextLoader = dynamic(() =>
    import("@/components/shared/loaders/TextLoader").then((res) => res.default)
  );

  const ProgressBar = dynamic(() => import("@ramonak/react-progress-bar"));

  const Modal = dynamic(() => import("@mantine/core").then((res) => res.Modal));

  const [opened, { open, close }] = useDisclosure(false);
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("");

  const [selectedAwnser, setAwnser] = useState("");

  const [total, setTotal] = useState(0);
  const [results, setResults] = useState({} as { [key: string]: number });

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
      if (!data.awnsers || !data.question || !data.endpoint)
        if (!props.question) {
          setData(await fetchGetJSON("/api/analytics/quick_question"));
        } else {
          setData({
            awnsers: props.awnsers!,
            question: props.question,
            endpoint: generateSlug(props.endpoint!)!,
          });
        }
      setIsLoading(false);
    };
    fetchData();
  }, [props.awnsers, props.question, props.endpoint]);

  useEffect(() => {
    let total = 0;
    for (const [key, value] of Object.entries(results)) {
      total += value;
    }
    setTotal(total);
  }, [results, props.awnsers, props.question, props.endpoint]);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <TextLoader />
      </div>
    );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={!props.question ? ` pt-10 pb-10 border-black ` : ""}>
        {selectedAwnser ? (
          <div>
            <div className="flex flex-col items-center justify-center">
              <h5>Thank you for your feedback!</h5>
              <ConfettiExplosion />
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
                />
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
            <div className="flex flex-wrap bg- py-10">
              {results && !isLoading && (
                <div className="bg-surface border border-black rounded p-5 w-11/12 md:w-[450px] m-auto drop-shadow-md">
                  <h6>Results</h6>
                  {data.awnsers.map((answer: string) => {
                    return (
                      <div
                        key={answer + "progress bar"}
                        className="p-1 animate-zoom_in w-[340px] md:w-[400px] m-auto drop-shadow-md  rounded-lg"
                      >
                        <ProgressBar
                          completed={
                            (results[answer]
                              ? results[answer]
                              : 0 / total
                              ? total
                              : 0) *
                            100 *
                            1.3
                          }
                          customLabel={`${answer} ${results[answer]}`}
                          labelAlignment="outside"
                          labelColor="black"
                          labelSize="12px"
                          bgColor="#FF932F"
                          height="25px"
                          className="rounded-full"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h5 className="text-center text-xl">{data.question}</h5>
            <div className="flex flex-wrap justify-center mt-1 mx-5">
              {data.awnsers &&
                data.awnsers.map((answer) => {
                  return (
                    <div
                      key={answer}
                      onClick={async () => {
                        if (selectedAwnser != answer) {
                          setIsLoading(true);
                          setAwnser(answer);
                          await fetchPostJSON("/api/analytics/single", {
                            answer: answer,
                            endpoint: generateSlug(data.endpoint!),
                            email: session.data?.user?.email ?? null,
                          });
                          setResults(
                            await fetchGetJSON(
                              `/api/analytics/single/${generateSlug(
                                data.endpoint!
                              )}`
                            )
                          );
                          const toast = await (
                            await import("react-hot-toast")
                          ).toast;
                          toast.success("Thank you for your feedback!");
                          setIsLoading(false);
                        }
                      }}
                      className={`${
                        selectedAwnser == answer && "bg-sacbeBrandColor"
                      } rounded-md border-2 border-black px-2 py-1 m-0.5 md:m-2 cursor-pointer`}
                    >
                      <p className="text-sm md:text-lg">{answer}</p>
                    </div>
                  );
                })}
            </div>
            <p className="text-sm">
              Make a choice to see what other readers think...
            </p>
          </div>
        )}
      </div>
    </Suspense>
  );

  async function signUp(givenEmail: string) {
    setIsSending(true);
    const response = await api.mailing.signUp.post({
      data: {
        email: givenEmail,
        tags: [...selectedTags, selectedAwnser],
      },
    });
    setIsSending(false);

    const toast = (await import("react-hot-toast")).toast;
    if (response?.ok == true) {
      toast.success(
        `${response.message} - Thanks for signing up, we will notify you when this feature is available`
      );
      close();
    } else {
      toast.error(`There was some error signing you up`);
    }
  }
}
