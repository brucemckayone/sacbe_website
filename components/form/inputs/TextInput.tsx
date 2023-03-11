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
function TextInput({ value, placeHolder, update, key, label }: Props) {
  return (
    <div className="mb-6" key={key}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-body">
          <h5>{label}</h5>
        </label>
      )}
      <input
        className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-sacbeBrandColor focus:border-sacbeBrandColor block w-full p-2.5 hover:scale-105 duration-200 font-body"
        type=""
        value={value}
        placeholder={placeHolder}
        onChange={(event) => {
          console.log(event.target.value);
          update(event.target.value);
        }}
      />
    </div>
  );
}

export default TextInput;
