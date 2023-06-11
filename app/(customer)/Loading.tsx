import React from "react";

import Image from "next/image";
function SacbePodLoadingImage() {
  return (
    <div className="w-full flex justify-center h-screen items-center align-middle bg-surface ">
      <Image
        src={"/cacao_pod_floating.png"}
        width={300}
        height={300}
        alt="loading floating cacao pod image"
        className="m-auto w-11/12 md:w-6/12 self-center h-[300px] align-middle object-contain animate-zoom_in_fade "
      ></Image>
    </div>
  );
}

export default SacbePodLoadingImage;
