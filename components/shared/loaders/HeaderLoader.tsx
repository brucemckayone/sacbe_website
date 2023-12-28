import React from "react";

function HeaderLoader() {
  return (
    <div role="status" className="animate-pulse my-10">
      <div className="h-2.5 bg-secondaryContainer rounded-full dark:bg-primaryContainer max-w-[640px] mb-2.5 mx-auto"></div>
      <div className="h-2.5 mx-auto bg-secondaryContainer rounded-full dark:bg-primaryContainer max-w-[540px]"></div>
      <div className="flex items-center justify-center mt-4">
        <svg
          className="w-10 h-10 mr-2 text-tertiaryContainer dark:text-primaryContainer"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div className="w-20 h-2.5 bg-tertiaryContainer rounded-full dark:bg-primaryContainer mr-3"></div>
        <div className="w-24 h-2 bg-tertiaryContainer rounded-full dark:bg-primaryContainer"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default HeaderLoader;
