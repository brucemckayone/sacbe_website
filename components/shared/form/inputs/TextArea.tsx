"use client";
import React from "react";

interface Props {
  placeHolder: string;
  value: string;
  update: (value: string) => void;
  key: string;
  label?: string;
  type?: string;
}
function TextArea({ value, placeHolder, update, key, label }: Props) {
  return (
    <div className="mb-6" key={key}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <textarea
        className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-sacbeBrandColor focus:border-sacbeBrandColor block w-full p-2.5 hover:scale-105 duration-200 h-52"
        value={value}
        placeholder={placeHolder}
        onChange={(event) => {
          update(event.target.value);
        }}
      />
    </div>
  );
}

export default TextArea;
