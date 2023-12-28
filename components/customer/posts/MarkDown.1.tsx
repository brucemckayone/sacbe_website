import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

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
          <p className="text-lg md:text-xl my-5 ml-1" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol
            className="text-lg md:text-xl my-5 ml-3 list-decimal"
            {...props}
          />
        ),
        ul: ({ node, ...props }) => (
          <ul className="text-lg md:text-xl my-5 ml-3 list-disc" {...props} />
        ),
      }}
    >
      {props.content}
    </ReactMarkdown>
  );
}
