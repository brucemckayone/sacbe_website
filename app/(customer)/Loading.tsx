import React from "react";

import Image from "next/image";
function Loading() {
  return (
    <div className="m-auto w-11/12 md:w-6/12 h-[1000px] align-middle bg-surface animate-zoom_in_fade ">
      <Image
        src={"/cacao_pod_floating.png"}
        width={300}
        height={300}
        alt="loading floating cacao pod image"
        className="m-auto"
      ></Image>
    </div>
  );
}

export default Loading;
