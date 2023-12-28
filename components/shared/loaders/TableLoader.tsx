import React from "react";

function TableLoader() {
  return (
    <div
      role="status"
      className="m-auto w-full my-10 p-4 space-y-4 border border-primaryContainer divide-y divide-primaryContainer rounded shadow animate-pulse dark:divide-primaryContainer md:p-6 dark:border-primaryContainer"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-tertiaryContainer rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-full h-2 bg-primaryContainer rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-tertiaryContainer rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-tertiaryContainer rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-full h-2 bg-primaryContainer rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-tertiaryContainer rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-tertiaryContainer rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-full h-2 bg-primaryContainer rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-tertiaryContainer rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-tertiaryContainer rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-full h-2 bg-primaryContainer rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-tertiaryContainer rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-tertiaryContainer rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-primaryContainer rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-tertiaryContainer rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default TableLoader;
