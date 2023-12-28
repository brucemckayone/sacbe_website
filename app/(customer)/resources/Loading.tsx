import ImageHeaderLoader from "@/components/shared/loaders/ImageHeaderLoader";
import TextLoader from "@/components/shared/loaders/TextLoader";
import React from "react";

function ResourceLoader() {
  return (
    <div>
      <div className="mt-10">
        <ImageHeaderLoader />
        <div className="grid grid-cols-1 place-content-center place-items-center">
          <TextLoader />
          <TextLoader />
        </div>
      </div>
      <div className="mt-10">
        <ImageHeaderLoader />
        <div className="grid grid-cols-1 place-content-center place-items-center">
          <TextLoader />
          <TextLoader />
        </div>
      </div>
    </div>
  );
}

export default ResourceLoader;
