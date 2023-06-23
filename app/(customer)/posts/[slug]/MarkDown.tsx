import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { QuickQuestion } from "../../QuickQuestion";
import Link from "next/link";

export function MarkDown(props: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: "h2",
        h2: ({ node, ...props }) => (
          <h3 className="text-3xl md:text-5xl mt-8 text-primary" {...props} />
        ),
        h3: "h4",
        h5: "h6",
        img: function ({ ...props }) {
          const substrings = props.alt?.split("{{")!;
          const alt = substrings[0].trim();
          return (
            <div className="relative w-full h-96 rounded-lg my-10">
              {" "}
              <Image
                src={props.src!}
                alt={alt}
                fill
                className="rounded-lg shadow-2xl"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          );
        },
        p: ({ node, ...props }) => (
          <p className="text-lg md:text-2xl my-5" {...props} />
        ),
      }}
    >
      {props.content}
    </ReactMarkdown>
  );
}

export function TestMarkdown(props: { testContent: any }) {
  return props.testContent.map((e: any) => {
    switch (e.type) {
      case "text":
        return <MarkDown content={e.value} />;
      case "CallToAction":
        return (
          <CallToAction
            link={e.value.link}
            text={e.value.text}
            image={e.value.image}
          />
        );
      case "question":
        console.log(e.value);

        return (
          <QuickQuestion
            answers={e.value.awnser}
            endpoint={e.value.endpoint}
            key={e.value.question}
            question={e.value.question}
          />
        );
      case "ImageWithContent":
        return (
          <ImageWithContent
            content={e.value.content}
            image={e.value.image}
            imageOnLeft={e.value.imageOnLeft}
          />
        );
      case "Image":
        return <LargeImage image={e.value} />;
      default:
        return <div></div>;
    }
  });
}

function LargeImage(props: { image: string }) {
  return (
    <div className="relative w-full h-96 rounded-lg my-10">
      {" "}
      <Image
        src={props.image!}
        alt={"props.alt"}
        fill
        className="rounded-lg shadow-2xl"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}

function ImageWithContent(props: {
  image: string;
  content: string;
  imageOnLeft?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${
        !props.imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"
      } justify-items-stretch  my-10`}
    >
      <div className="w-full md:w-1/2 flex flex-col ">
        <Image
          src={props.image}
          alt=""
          width={1000}
          height={1000}
          style={{ width: "100%", height: "100%" }}
          className="rounded-lg drop-shadow-sm h-fit object-cover"
        />
      </div>
      <div className="w-[50px]" />
      <div className="w-full md:w-1/2">
        <MarkDown content={props.content} />
      </div>
    </div>
  );
}

function CallToAction(props: { image?: string; text: string; link: string }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="w-11/12 md:w-1/2">
        {props.image && (
          <Image
            src={props.image}
            alt=""
            width={500}
            height={500}
            className="rounded-lg drop-shadow-sm w-full h-1/2"
          />
        )}
      </div>
      <div className="w-[50px]" />
      <div className="w-11/12 md:w-1/2 ">
        <MarkDown content={props.text} />
        <div className="px-4 py-2 bg-transparent border-2 rounded-lg my-3 w-1/2">
          <Link href={props.link} className="no-underline">
            <p className="text-2xl no-underline text-center">Learn More</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
