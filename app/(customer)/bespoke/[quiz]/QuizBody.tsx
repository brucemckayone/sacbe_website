"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface QuizBodyProps {
  questions: {
    question: string;
    type:
      | "Multi-Select"
      | "Select-Single"
      | "What Drives You, Multi-Select"
      | "completion";
    awnsers: MultiAwnser[];
  }[];
}

export function QuizBody(props: {
  quiz: QuizBodyProps;
  email?: string | null;
}) {
  const [currentindex, setCurrentIndex] = useState(0);

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
    </div>
  );

  function GenerateQuestion() {
    if (props.quiz.questions[currentindex].type == "Select-Single") {
      return (
        <SingleSelect
          awnsers={props.quiz.questions[currentindex].awnsers}
          nextQuestion={nextQuestion}
        />
      );
    } else if (
      props.quiz.questions[currentindex].type == "What Drives You, Multi-Select"
    ) {
      return <EmailPreferences nextQuestion={nextQuestion} />;
    } else if (props.quiz.questions[currentindex].type == "completion") {
      return <Completion email={props.email ?? ""}></Completion>;
    } else {
      return (
        <MultiSelect
          awnsers={props.quiz.questions[currentindex].awnsers}
          nextQuestion={nextQuestion}
        />
      );
    }
  }
}

type MultiAwnser = {
  text: string;
  selected: boolean;
};

interface MutliSelectProps {
  awnsers: MultiAwnser[];
  nextQuestion: () => void;
}
interface SingleSelectProps {
  awnsers: MultiAwnser[];
  nextQuestion: () => void;
}

function SingleSelect(props: SingleSelectProps) {
  const [selected, setSelected] = useState("");

  return (
    <div>
      <div className="flex flex-wrap animate-slide_in_right_fade">
        {props.awnsers.map((awnser) => (
          <div
            onClick={() => {
              console.log("called");
              setSelected(awnser.text);
            }}
            className={`flex flex-row justify-betwee ${
              selected != awnser.text
                ? "bg-sacbeBrandColor border-2 drop-shadow-lg"
                : "bg-surface drop-shadow-md hover:bg-tertiaryContainer cursor-auto"
            } rounded-lg m-2 p-2`}
            key={awnser.text}
          >
            <p
              onClick={() => {
                console.log("called");
                setSelected(awnser.text);
              }}
            >
              {awnser.text}
            </p>
          </div>
        ))}
      </div>
      <button
        className="bg-sacbeBrandColor border-2 drop-shadow-lg rounded-lg m-2 p-2 w-full"
        onClick={() => {
          if (selected != "") props.nextQuestion();
          else toast.error("Please select at least one option");
        }}
      >
        NEXT
      </button>
    </div>
  );
}

function MultiAwnserCard(props: {
  awnser: string;
  addToSelected: (awnser: string[]) => void;
  selected: string[];
}) {
  return (
    <div
      className={`flex flex-row justify-between animate-slide_in_right_fade ${
        !props.selected.includes(props.awnser)
          ? "bg-sacbeBrandColor border-2 drop-shadow-lg"
          : "bg-surface drop-shadow-md hover:bg-tertiaryContainer cursor-auto"
      } rounded-lg m-2 p-2`}
      onClick={() => {
        props.addToSelected([...props.selected, props.awnser]);
      }}
    >
      <p>{props.awnser}</p>
    </div>
  );
}

function MultiSelect(props: MutliSelectProps) {
  const [selectedList, setSelectedList] = useState([] as string[]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap animate-slide_in_right_fade overflow-scroll h-72 ">
        {props.awnsers.map((awnser) => (
          <MultiAwnserCard
            awnser={awnser.text}
            addToSelected={setSelectedList}
            selected={selectedList}
            key={awnser.text}
          ></MultiAwnserCard>
        ))}
      </div>
      <button
        className="bg-sacbeBrandColor border-2 drop-shadow-lg rounded-lg m-2 p-2 w-full"
        onClick={() => {
          if (selectedList.length > 0) {
            props.nextQuestion();
          } else toast.error("Please select at least one option");
        }}
      >
        NEXT
      </button>
    </div>
  );
}
function EmailPreferences(props: { nextQuestion: () => void }) {
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
          if (selected.length > 0) props.nextQuestion();
          else toast.error("Please select at least one option");
        }}
      >
        NEXT
      </button>
    </div>
  );
}

function Completion(props: { email?: string | null }) {
  const [formEmail, setEmail] = useState(props.email ?? "");

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
      <h6></h6>
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
        onClick={() => {
          ///TODO: complete the sign up process and process all the information from the quiz
          //TODO: redirect to the homepage
        }}
      >
        Lets Start A Conversation
      </button>
    </div>
  );
}
