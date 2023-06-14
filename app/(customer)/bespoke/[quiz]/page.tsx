import React from "react";
import Image from "next/image";
import { QuizBody, QuizBodyProps } from "./QuizBody";
import yellwocacaoPods from "@/public/yellow_cacao_pods.jpg";
import stripe from "@/lib/stripe/stripe";
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
              {
                text: "Daily",
              },
              {
                text: "A few times a week",
              },
              {
                text: "A few times a month",
              },
              {
                text: "I have never tried cacao",
              },
            ],
          },
          {
            question:
              "What gender do you identify as? (so we can use the correct pronouns)",
            type: "Select-Single",
            endpoint: "analytics/user/gender",
            awnsers: [
              {
                text: "Male",
              },
              {
                text: "Female",
              },
              {
                text: "Non-binary",
              },
              {
                text: "Trans female",
              },
              {
                text: "Trans male",
              },
              {
                text: "I prefer not to say",
              },
            ],
          },
          {
            question:
              "What are you passionate about? (select as many as you like)",
            type: "Multi-Select",
            endpoint: "passions",
            awnsers: [
              {
                text: "Health",
              },
              {
                text: "Fitness",
              },
              {
                text: "Spirituality",
              },
              {
                text: "Nature",
              },
              {
                text: "Creativity",
              },
              {
                text: "Community",
              },
              {
                text: "Family",
              },
              {
                text: "Travel",
              },
              {
                text: "Adventure",
              },
              {
                text: "Learning",
              },
              {
                text: "Growth",
              },
              {
                text: "I dont know",
              },
            ],
          },
          {
            question:
              "What is holding you back from living your best life? how can we support you? (select as many as you like)",
            type: "Multi-Select",
            endpoint: "problems",
            awnsers: [
              {
                text: "I dont know",
              },
              {
                text: "time",
              },
              {
                text: "money",
              },
              {
                text: "energy",
              },
              {
                text: "motivation",
              },
              {
                text: "support",
              },
              {
                text: "knowledge",
              },
              {
                text: "confidence",
              },
              {
                text: "self love",
              },
              {
                text: "self belief",
              },
              {
                text: "self worth",
              },
              {
                text: "self esteem",
              },
              {
                text: "self respect",
              },
              {
                text: "self care",
              },
              {
                text: "self compassion",
              },
              {
                text: "self acceptance",
              },
              {
                text: "self forgiveness",
              },
              {
                text: "self awareness",
              },
              {
                text: "self discipline",
              },
              {
                text: "self control",
              },
              {
                text: "self regulation",
              },
              {
                text: "self management",
              },
              {
                text: "self expression",
              },
              {
                text: "self actualization",
              },
              {
                text: "I dont know what I want",
              },
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
  const { email, name, phone, address } = session.customer_details!;
  console.log(session);

  return (
    <body className="w-screen h-screen flex flex-col md:flex-row bg-sacbeBrandColor">
      <Image
        src={yellwocacaoPods}
        alt="quiz image cacao pods"
        className="w-full h-2/6 md:h-screen object-cover"
      />
      <QuizBody quiz={quiz} email={session.customer_details?.email}></QuizBody>
    </body>
  );
}

export default Quiz;
