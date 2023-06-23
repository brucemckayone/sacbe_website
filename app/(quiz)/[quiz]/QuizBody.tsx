"use client";
import { analytics } from "@/lib/firebase/firebase";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { logEvent } from "firebase/analytics";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Stripe from "stripe";

export interface QuizBodyProps {
  questions: {
    question: string;
    type:
      | "Multi-Select"
      | "Select-Single"
      | "What Drives You, Multi-Select"
      | "completion";
    awnsers: string[];
    endpoint: string;
  }[];
}

export function QuizBody(props: {
  quiz: QuizBodyProps;
  email?: string | null;
  customerDetails?: Stripe.Checkout.Session.CustomerDetails;
}) {
  const [currentindex, setCurrentIndex] = useState(0);
  useEffect(() => {
    logEvent(analytics, "quiz_start", {
      ...props.customerDetails,
      email: props.email,
    });
  }, [props.customerDetails, props.email]);

  function nextQuestion() {
    if (currentindex != props.quiz.questions.length - 1) {
      setCurrentIndex(currentindex + 1);
    }
  }

  return (
    <div className="px-4 m-auto md:w-6/12  md:h-screen bg-sacbeBrandColor flex-col justify-center items-center md:p-20">
      {props.quiz.questions[currentindex].type != "completion" && (
        <ol className="list-disc ml-5">
          <li>
            <h3 className="text-xl md:text-3xl my-5">
              {props.quiz.questions[currentindex].question}
            </h3>
          </li>
        </ol>
      )}
      <div className="flex flex-col">
        {props.quiz.questions[currentindex].type != "completion" && (
          <p>{props.quiz.questions[currentindex].type}</p>
        )}
        <div className="flex-col justify-start md:justify-between">
          <div className="flex flex-row  justify-between">
            <GenerateQuestion />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );

  function GenerateQuestion() {
    if (props.quiz.questions[currentindex].type == "Select-Single") {
      return (
        <SingleSelect
          awnsers={props.quiz.questions[currentindex].awnsers}
          nextQuestion={nextQuestion}
          question={props.quiz.questions[currentindex].question}
          email={props.email ?? "no email"}
          endpoint={props.quiz.questions[currentindex].endpoint}
        />
      );
    } else if (
      props.quiz.questions[currentindex].type == "What Drives You, Multi-Select"
    ) {
      return (
        <EmailPreferences
          nextQuestion={nextQuestion}
          email={props.email ?? "No Email Given"}
          question={props.quiz.questions[currentindex].question}
          endpoint={props.quiz.questions[currentindex].endpoint}
        />
      );
    } else if (props.quiz.questions[currentindex].type == "completion") {
      return (
        <Completion
          email={props.email ?? ""}
          address={props.customerDetails?.address}
          name={props.customerDetails?.name ?? ""}
          phone={props.customerDetails?.phone ?? ""}
        />
      );
    } else {
      return (
        <MultiSelect
          question={props.quiz.questions[currentindex].question}
          awnsers={props.quiz.questions[currentindex].awnsers}
          nextQuestion={nextQuestion}
          email={props.email ?? "no email"}
          endpoint={props.quiz.questions[currentindex].endpoint}
        />
      );
    }
  }
}

interface MutliSelectProps {
  awnsers: string[];
  question: string;
  nextQuestion: () => void;
  email?: string;
  endpoint: string;
}

interface SingleSelectProps {
  question: string;
  awnsers: string[];
  nextQuestion: () => void;
  email?: string;
  endpoint: string;
}

function SingleSelect(props: SingleSelectProps) {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="flex flex-wrap animate-slide_in_right_fade">
        {props.awnsers.map((awnser) => (
          <div
            onClick={() => {
              console.log("called");
              setSelected(awnser);
            }}
            className={`flex flex-row justify-betwee ${
              selected != awnser
                ? "bg-sacbeBrandColor border-2 drop-shadow-lg"
                : "bg-surface drop-shadow-md hover:bg-tertiaryContainer cursor-auto"
            } rounded-lg m-2 p-2`}
            key={awnser}
          >
            <p
              onClick={() => {
                console.log("called");
                setSelected(awnser);
              }}
            >
              {awnser}
            </p>
          </div>
        ))}
      </div>
      <button
        className="bg-sacbeBrandColor border-2 drop-shadow-lg rounded-lg m-2 p-2 w-full"
        onClick={async () => {
          if (selected != "") {
            setLoading(true);
            await fetchPostJSON(`/api/${props.endpoint}`, {
              question: props.question,
              awnser: selected,
              email: props.email,
            });
            setLoading(false);
            props.nextQuestion();
          } else toast.error("Please select at least one option");
        }}
      >
        {!loading ? "NEXT" : "Loading..."}
      </button>
    </div>
  );
}

export function MultiAwnserCard(props: {
  awnser: string;
  addToSelected: (awnser: string[]) => void;
  selected: string[];
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-row justify-between animate-slide_in_right_fade ${
        !props.selected.includes(props.awnser)
          ? "bg-transparent border-2 drop-shadow-lg"
          : "bg-surface drop-shadow-md hover:bg-tertiaryContainer cursor-auto"
      } rounded-lg m-2 ${!props.compact ? "p-1" : "p-2"}`}
      onClick={() => {
        props.addToSelected([...props.selected, props.awnser]);
      }}
    >
      <p className={"" + !props.compact && "text-sm"}>{props.awnser}</p>
    </div>
  );
}

function MultiSelect(props: MutliSelectProps) {
  const [selectedList, setSelectedList] = useState([] as string[]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap animate-slide_in_right_fade overflow-scroll h-72 md:h-fit ">
        {props.awnsers.map((awnser) => (
          <MultiAwnserCard
            awnser={awnser}
            addToSelected={setSelectedList}
            selected={selectedList}
            key={awnser}
          />
        ))}
      </div>
      <button
        className="bg-sacbeBrandColor border-2 drop-shadow-lg rounded-lg m-2 p-2 w-full"
        onClick={() => {
          if (selectedList.length > 0) {
            fetchPostJSON(`/api/analytics/multi`, {
              question: props.question,
              awnser: selectedList,
              endpoint: props.endpoint,
              email: props.email,
            });
            props.nextQuestion();
          } else toast.error("Please select at least one option");
        }}
      >
        {loading ? "Loading..." : "NEXT"}
      </button>
    </div>
  );
}

function EmailPreferences(props: {
  nextQuestion: () => void;
  question: string;
  email: string;
  endpoint: string;
}) {
  const [selected, setSelected] = useState([] as string[]);

  const groups = [
    "Sprituality",
    "Mental & Emotional Health",
    "Tradition & Culture",
    "Creativity",
    "Sexuality",
    "Physical Health & Preformance",
    "Personal Optimization",
    "Relationships",
    "Career",
    "Family",
    "Community",
    "Travel & Adventure",
    "Personal Growth",
    "Life Purpose",
  ];

  return (
    <div>
      <div className="flex flex-wrap animate-slide_in_right_fade">
        {groups.map((group) => {
          return (
            <div
              key={group}
              onClick={() => {
                if (!selected.includes(group)) {
                  setSelected([...selected, group]);
                } else {
                  setSelected(selected.filter((item) => item != group));
                }
              }}
              className={`${
                selected.includes(group)
                  ? "bg-surface drop-shadow-md hover:bg-tertiaryContainer cursor-auto"
                  : "bg-sacbeBrandColor border-2 drop-shadow-lg"
              } rounded-lg m-2 p-2 `}
            >
              {group}
            </div>
          );
        })}
      </div>
      <button
        className="bg-sacbeBrandColor border-2 drop-shadow-lg rounded-lg m-2 p-2 w-full"
        onClick={() => {
          if (selected.length > 0) {
            fetchPostJSON(`/api/analytics/multi`, {
              awnser: selected,
              endpoint: props.endpoint,
              email: props.email,
            });
            props.nextQuestion();
          } else toast.error("Please select at least one option");
        }}
      >
        NEXT
      </button>
    </div>
  );
}

function Completion(props: {
  email?: string | null;
  phone?: string;
  name?: string;
  address?: any;
}) {
  const [formEmail, setEmail] = useState(props.email ?? "");
  const [loading, setLoading] = useState(false);

  return (
    <div className="animate-slide_in_right_fade">
      <h5>Where should we send your gift...🎁</h5>
      <input
        type="email"
        className="text-xl bg-transparent border-b-2  w-full focus:outline-none my-5 placeholder:text-outline uppercase font-display"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="Enter Your Preffered Email"
        itemType="email"
        value={formEmail}
      />

      <p>
        We want to help however we can really be it, financially, creativity, or
        emotionally. By completing this quiz we are opening up a two way
        conversion with you. We will send you a confirmation email with a little
        gift in it for you, and a list of resources taylored from your
        responses, we hope that helps. But what we really care about is what you
        have to say. we LOVE IT when you reply to emails so please do even if it
        just to say hi!.
      </p>
      <button
        className="bg-sacbeBrandColor border-2 drop-shadow-lg rounded-lg m-2 p-2 w-full"
        onClick={async () => {
          setLoading(true);
          const response = await fetchPostJSON(`/api/mailing/signup`, {
            name: props.name,
            email: props.email,
            address: props.address,
            phone: props.phone,
          });

          setLoading(false);
          if (response.success == true) {
            toast.success(
              response.message ?? "Thanks for signing up for our mailing list"
            );

            logEvent(analytics, "newsletter_signup");
          } else {
            const json = JSON.parse(response.message.response.text);
            toast.error(
              `${json["title"] ?? ""} There was some error signing you up`
            );
            window.location.href = "/";
          }
        }}
      >
        {loading ? "Loading..." : "Lets Start A Conversation"}
      </button>
    </div>
  );
}
