"use client";
import { toast } from "react-hot-toast";
import { fetchGetJSON, fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { generateSlug } from "@/utils/url/formater";
import dynamic from "next/dynamic";

type QuickQuestionProps = {
  endpoint?: string;
  question?: string;
  answers?: string[];
};

export function QuickQuestion(props: QuickQuestionProps) {
  const [data, setData] = useState<{
    question: string;
    answers: string[];
    endpoint: string;
  }>({
    question: "",
    answers: [],
    endpoint: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("");

  const [selectedAnswer, setAnswer] = useState("");

  const [total, setTotal] = useState(0);
  const [results, setResults] = useState<{ [key: string]: number }>({});

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

  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Interested in cacao points",
  ]);

  const [opened, { open, close }] = useDisclosure(false);
  const session = useSession();

  const ProgressBar = dynamic(() =>
    import("@ramonak/react-progress-bar").then((res) => res.default)
  );

  const ConfettiExplosion = dynamic(() =>
    import("react-confetti-explosion").then((res) => res.default)
  );

  const PrimaryButton = dynamic(() =>
    import("@/components/buttons/primaryButton").then((res) => res.default)
  );

  const TextInput = dynamic(() =>
    import("@/components/form/inputs/TextInput").then((res) => res.default)
  );

  const MultiAwnserCard = dynamic(() =>
    import("../(quiz)/[quiz]/QuizBody").then((res) => res.MultiAwnserCard)
  );

  const TextLoader = dynamic(() =>
    import("@/components/loaders/TextLoader").then((res) => res.default)
  );

  const Modal = dynamic(() => import("@mantine/core").then((res) => res.Modal));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!props.answers || !props.question || !props.endpoint) {
        if (!props.question) {
          setData(await fetchGetJSON("/api/analytics/quick_question"));
        } else {
          setData({
            answers: props.answers!,
            question: props.question,
            endpoint: generateSlug(props.endpoint!),
          });
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [props.answers, props.question, props.endpoint]);

  useEffect(() => {
    let total = 0;
    for (const [key, value] of Object.entries(results)) {
      total += value;
    }
    setTotal(total);
  }, [results]);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <TextLoader />
      </div>
    );

  return (
    <div className={!props.question ? `bg-tertiaryContainer` : ""}>
      {selectedAnswer ? (
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
                  await signUp(session.data.user.email);
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
          <div>
            {results &&
              Object.entries(results).map(([answer, value]) => {
                return (
                  <div
                    key={answer + "progress bar"}
                    className="p-2 m-2 animate-zoom_in"
                  >
                    <ProgressBar
                      completed={(value / total) * 100 * 1.3}
                      customLabel={`${answer} ${value}`}
                      labelAlignment="right"
                      labelColor="white"
                      bgColor="#FF932F"
                      height="30px"
                      className="shadow-lg rounded-full"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h5 className="text-center text-xl">{data.question}</h5>
          <div className="flex flex-wrap mt-1 mx-5">
            {data.answers &&
              data.answers.map((answer) => {
                return (
                  <div
                    key={answer}
                    onClick={async () => {
                      if (selectedAnswer !== answer) {
                        setIsLoading(true);
                        setAnswer(answer);
                        await fetchPostJSON("/api/analytics/single", {
                          answer: answer,
                          endpoint: generateSlug(data.endpoint),
                          email: session.data?.user?.email || null,
                        });
                        setResults(
                          await fetchGetJSON(
                            `/api/analytics/single/${generateSlug(
                              data.endpoint
                            )}`
                          )
                        );

                        toast.success("Thank you for your feedback!");
                        setIsLoading(false);
                      }
                    }}
                    className={`${
                      selectedAnswer === answer ? "bg-sacbeBrandColor" : ""
                    } rounded-md border-2 px-2 py-1 m-0.5 md:m-2 cursor-pointer`}
                    role="button"
                    tabIndex={0}
                    aria-label={answer}
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
  );

  async function signUp(givenEmail: string) {
    setIsSending(true);
    const resp = await fetchPostJSON("api/mailing/signup", {
      email: givenEmail,
      tags: [...selectedTags, selectedAnswer],
    });
    console.log(resp);

    setIsSending(false);
    if (resp.success === true) {
      toast.success(
        `${resp.message} - Thanks for signing up, we will notify you when this feature is available`
      );
      close();
    } else {
      toast.error(`There was some error signing you up`);
    }
  }
}
