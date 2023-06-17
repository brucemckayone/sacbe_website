import React from "react";
import Image from "next/image";
import { QuizBody, QuizBodyProps } from "./QuizBody";
import quizPods from "@/public/quiz_cacao_pods.png";
import stripe from "@/lib/stripe/stripe";
import { Toaster } from "react-hot-toast";
function getQuiz() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        title: "Cacoa Quiz",
        questions: [
          {
            question:
              "What best discribes what you are looking for out of life, and cacoa?, select more than one",
            type: "What Drives You, Multi-Select",
            endpoint: "drives",
          },
          {
            question: "How often do you drink cacao",
            type: "Select-Single",
            endpoint: "analytics/cacao/usage",
            awnsers: [
              "Daily",
              "A few times a week",
              "A few times a month",
              "I have never tried cacao",
            ],
          },
          {
            question:
              "What gender do you identify as? (so we can use the correct pronouns)",
            type: "Select-Single",
            endpoint: "analytics/user/gender",
            awnsers: [
              "Male",
              "Female",
              "Trans female",
              "Trans male",
              "I prefer not to say",
            ],
          },
          {
            question:
              "What are you passionate about? (select as many as you like)",
            type: "Multi-Select",
            endpoint: "passions",
            awnsers: [
              "Health",
              "Fitness",
              "Spirituality",
              "Nature",
              "Creativity",
              "Community",
              "Family",
              "Travel",
              "Adventure",
              "Learning",
              "Growth",
              "I dont know",
            ],
          },
          {
            question:
              "What is holding you back from living your best life? how can we support you? (select as many as you like)",
            type: "Multi-Select",
            endpoint: "problems",
            awnsers: [
              "I dont know",
              "time",
              "money",
              "energy",
              "motivation",
              "support",
              "knowledge",
              "confidence",
              "self love",
              "self belief",
              "self worth",
              "self esteem",
              "self respect",
              "self care",
              "self compassion",
              "self acceptance",
              "self forgiveness",
              "self awareness",
              "self discipline",
              "self control",
              "self regulation",
              "self management",
              "self expression",
              "self actualization",
              "I dont know what I want",
            ],
          },
          {
            question:
              "What is holding you back from living your best life? how can we support you? (select as many as you like)",
            type: "Multi-Select",
            endpoint: "problems",
            awnsers: [
              "I dont know",
              "time",
              "money",
              "energy",
              "motivation",
              "support",
              "knowledge",
              "confidence",
              "self love",
              "self belief",
              "self worth",
              "self esteem",
              "self respect",
              "self care",
              "self compassion",
              "self acceptance",
              "self forgiveness",
              "self awareness",
              "self discipline",
              "self control",
              "self regulation",
              "self management",
              "self expression",
              "self actualization",
              "I dont know what I want",
            ],
          },
          {
            question:
              "What would you like to hear about? (select as many as you like)",
            type: "Multi-Select",
            endpoint: "email_me_about",
            awnsers: [
              "Free Events",
              "Educational Content",
              "Guided Meditations",
              "Recipes & How To's",
              "Cacao Ceremonies",
              "Cacao Retreats",
              "Cacao Facilitator Trainings",
              "Cacao Products",
              "Cacao Wholesale",
              "Cacao Affiliate Program",
              "Discounts & Promotions",
            ],
          },
          {
            question: "How can we support you",
            type: "completion",
            awnsers: [],
            endpoint: "analytics/user/identity",
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

async function Quiz({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const quiz = (await getQuiz()) as QuizBodyProps;
  const session = await stripe.checkout.sessions.retrieve(
    searchParams!.session_id as string
  );

  console.log(session);

  return (
    <main className="w-screen h-screen flex flex-col md:flex-row bg-sacbeBrandColor">
      <Image
        src={quizPods}
        alt="quiz image cacao pods"
        className="w-full h-2/6 md:h-screen object-cover"
        placeholder="blur"
      />
      <QuizBody
        quiz={quiz}
        email={session.customer_details?.email}
        customerDetails={session.customer_details!}
      />
    </main>
  );
}

export default Quiz;
