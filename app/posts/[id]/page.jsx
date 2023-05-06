import React from "react";
import Image from "next/image";

import ReactMarkdown from "react-markdown";
async function getPost(uid) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer d5227425eebf78bd468e423320ea40583e4cf4fcb5a996c6db0cf959fafb36f554b71561385dadea3f05bec716625f6814641200015e69e5008b7192a77beb8b157612edca62178f57152ad7a1f55fb670ce7f1d0a81343850460889fdc753ea3cc04b9790d351282c1ef52d605ab582bbb28634c5eab24559379d37634dc121"
  );

  var raw = JSON.stringify({
    status: "pending",
    userId: "28wL0HMd7959AiWpRW8r",
  });

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    next: { revalidate: 0 },
  };

  const res = await fetch(
    `http://127.0.0.1:1337/api/blog-posts?filters[uid][$eq]=${uid}&populate=*`,
    requestOptions
  );
  console.log(res.status);
  if (res.ok) {
    const json = await res.json();
    return json;
  }
}

export default async function Page({ params, searchParams }) {
  const data = await getPost(params.id);
  const post = data.data[0];
  console.log(data);
  return (
    <main className="grid grid-cols-1 place-items-center">
      <div className="sm:w-full sm:mx-3 md:w-8/12 lg:w-7/12 xl:w-6/12 my-10 ">
        <Image
          src={`http://127.0.0.1:1337${data.data[0].attributes.Image.data.attributes.url}`}
          width={900}
          height={400}
          alt={"blog header post "}
          className="rounded-lg"
        />
        <div className="p-20">
          <h1 className="mb-10">{data.data[0].attributes.Title}</h1>
          <ReactMarkdown
            children={data.data[0].attributes.Content}
            components={{
              h1: "h2",
              h2: ({ node, ...props }) => (
                <h3
                  style={{
                    color: "black",
                    padding: "30px 0px 010px 0px",
                    fontSize: "3.5rem",
                    lineHeight: "4rem",
                  }}
                  {...props}
                />
              ),
              h3: "h4",
              h5: "h6",
              img: ({ node, ...props }) => (
                <Image
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png"
                  }
                  width={200}
                  height={200}
                  alt={"alt text"}
                  {...props}
                />
              ),

              p: ({ node, ...props }) => (
                <p style={{ fontSize: "1.3rem" }} {...props} />
              ),
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, "")}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
