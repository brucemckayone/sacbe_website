"use client";
import { type } from "os";
import React from "react";

interface Props {
  placeHolder: string;
  value: string;
  update: (value: string) => void;

  label?: string;
  type?: string;
  className?: string;
}
function TextInput({
  value,
  placeHolder,
  update,
  type,
  label,
  className,
}: Props) {
  return (
    <div className="mb-3" key={label + placeHolder} id={type}>
      {label && (
        <label className="">
          <h6 className="">{label}</h6>
        </label>
      )}
      <input
        key={`input key ${label + placeHolder}`}
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:outline-sacbeBrandColor focus:border-sacbeBrandColor block w-full p-2.5 hover:scale-105 duration-200 font-body ${className}`}
        type={type}
        value={value}
        placeholder={placeHolder}
        autoComplete={type}
        onChange={(event) => {
          console.log(event.target.value);
          update(event.target.value);
        }}
      />
    </div>
  );
}

export default TextInput;
