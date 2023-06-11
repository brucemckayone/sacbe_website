"use client";
import React, { useState } from "react";
import { quiz } from "./page";

export interface QuizBodyProps {
  questions: {
    question: string;
    type: "multi" | "single";
    awnsers: MultiAwnser[];
  }[];
}

export function QuizBody(props: { quiz: QuizBodyProps }) {
  const [currentQuestion, setQuestionQuestion] = useState("");
  const [currentindex, setCurrentIndex] = useState(0);

  function nextQuestion() {
    if (currentindex != props.quiz.questions.length - 1) {
      setCurrentIndex(currentindex + 1);
    }
  }

  return (
    <div className="w-6/12 h-screen bg-sacbeBrandColor flex-col justify-center items-center p-20">
      <h3>Quiz Question 1</h3>
      <div className="flex flex-col">
        <p>Quiz body</p>
        <div className="flex-col justify-between">
          <p>{props.quiz.questions[currentindex].question}</p>
          <div className="flex flex-row  justify-between">
            {generateQuestion()}
          </div>
        </div>
      </div>
    </div>
  );

  function generateQuestion() {
    if (props.quiz.questions[currentindex].type == "single") {
      return (
        <SingleSelect
          awnsers={props.quiz.questions[currentindex].awnsers}
          nextQuestion={nextQuestion}
        ></SingleSelect>
      );
    } else {
      return (
        <MultiSelect
          awnsers={props.quiz.questions[currentindex].awnsers}
          nextQuestion={nextQuestion}
        ></MultiSelect>
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
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <div className="flex flex-col">
        {props.awnsers.map((awnser) => (
          <div
            className={`flex flex-row justify-between ${
              selected ? "bg-sacbeBrandColor" : "bg-surface"
            } p-2 rounded-md my-3 border shadow-lg hover:bg-primaryContainer duration-200`}
            key={awnser.text}
          >
            <p>{awnser.text}</p>
            <input
              type="radio"
              checked={awnser.selected}
              onClick={() => {
                setSelected(true);
                props.nextQuestion();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MultiAwnserCard(props: {
  awnser: string;
  addToSelected: (awnser: string) => void;
}) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`flex flex-row justify-between ${
        selected ? "bg-sacbeBrandColor" : "bg-surface"
      } p-2 rounded-md my-3 border shadow-lg hover:bg-primaryContainer duration-200`}
      onClick={() => {
        setSelected(!selected);
      }}
    >
      <p>{props.awnser}</p>
      <input type="checkbox" checked={selected} />
    </div>
  );
}

function MultiSelect(props: MutliSelectProps) {
  const [selectedList, setSelectedList] = useState([] as string[]);
  function addToSelected(awnser: string) {
    setSelectedList([...selectedList, awnser]);
  }
  return (
    <div>
      <div className="flex flex-col">
        {props.awnsers.map((awnser) => (
          <MultiAwnserCard
            awnser={awnser.text}
            addToSelected={addToSelected}
            key={awnser.text}
          ></MultiAwnserCard>
        ))}
        <button
          onClick={() => {
            props.nextQuestion();
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
