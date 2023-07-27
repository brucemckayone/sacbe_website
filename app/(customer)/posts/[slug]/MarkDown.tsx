import React from "react";
import dynamic from "next/dynamic";
import { CallToAction } from "./CallToAction";
import { QuickQuestion } from "../../QuickQuestion";
import { BuyCacaoLink } from "./BuyCacaoLink";

export function TestMarkdown(props: { testContent: any }) {
  const MarkDown = dynamic(() =>
    import("./MarkDown.1").then((res) => res.MarkDown)
  );

  const ImageWithContent = dynamic(() =>
    import("./ImageWithContent").then((res) => res.ImageWithContent)
  );

  const LargeImage = dynamic(() =>
    import("./LargeImage").then((res) => res).then((res) => res.LargeImage)
  );

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
            isImageLeft={e.value.isImageLeft}
          />
        );
      case "Image":
        return <LargeImage image={e.value} />;

      case "buySacbeCallToAction":
        return (
          <BuyCacaoLink isSubscription={e.isSubscription} text={e.value.text} />
        );
      default:
        return <div></div>;
    }
  });
}
