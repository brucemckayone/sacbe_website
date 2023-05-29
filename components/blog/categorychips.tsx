import React from "react";

export default function Categorychip(props: { title: string }) {
  return (
    <p
      className="text-md md:text-lg mx-1 bg-surface shadow rounded-md px-2 mt-2"
      key={`${props.title} category key`}
    >
      {props.title}
    </p>
  );
}
