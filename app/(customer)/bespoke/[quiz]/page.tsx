import React from "react";
import Image from "next/image";
import { QuizBody, QuizBodyProps } from "./QuizBody";
function getQuiz() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        title: "Cacoa Quiz",
        questions: [
          {
            question: "What is the name of the tree that produces cacao?",
            type: "single",
            awnsers: [
              {
                text: "Cacao",
                selected: false,
              },
              {
                text: "Cocoa",
                selected: false,
              },
              {
                text: "Theobroma cacao",
                selected: false,
              },
            ],
          },
          {
            question: "What is the name of the tree that produces cacao?",
            type: "multi",
            awnsers: [
              {
                text: "Cacao",
                selected: false,
              },
              {
                text: "Cocoa",
                selected: false,
              },
              {
                text: "Theobroma cacao",
                selected: false,
              },
            ],
          },
        ],
      } as QuizBodyProps);
    }, 2000);
  });
}

//generate return type for get quiz

type question = {
  question: string;
  awnsers: awnser[];
};
type awnser = {
  text: string;
  isCorrect: boolean;
};
export type quiz = {
  title: string;
  questions: question[];
};

async function Quiz() {
  const quiz = (await getQuiz()) as QuizBodyProps;

  return (
    <div className="w-screen h-screen flex">
      <div>
        <Image
          src={"/yellow_cacao_pods.jpg"}
          height={500}
          width={500}
          alt="quiz image cacao pods"
          className="w-full h-screen object-cover"
        />
      </div>
      <QuizBody quiz={quiz}></QuizBody>
    </div>
  );
}

export default Quiz;
