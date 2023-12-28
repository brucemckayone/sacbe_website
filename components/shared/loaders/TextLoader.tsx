import React from "react";

function TextLoader() {
  return (
    <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
      <div className="flex items-center w-full space-x-2">
        <div className="h-2.5 bg-secondaryContainer rounded-full w-32"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-24"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[480px]">
        <div className="h-2.5 bg- rounded-full w-full"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-full"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full dark:bg-gray-600 w-24"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[400px]">
        <div className="h-2.5 bg-secondaryContainer rounded-full w-full"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-80"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[480px]">
        <div className="h-2.5 bg-secondaryContainer rounded-full w-full"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-full"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-24"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[440px]">
        <div className="h-2.5 bg-secondaryContainer rounded-full w-32"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-24"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[360px]">
        <div className="h-2.5 bg-secondaryContainer rounded-full w-full"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-80"></div>
        <div className="h-2.5 bg-secondaryContainer rounded-full w-full"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default TextLoader;
