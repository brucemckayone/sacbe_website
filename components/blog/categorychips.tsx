import React from "react";

export default function Categorychip(props: { title: string }) {
  return (
    <p
      className="mx-1 bg-tertiaryContainer shadow rounded-md px-2"
      key={`${props.title} category key`}
    >
      {props.title}
    </p>
  );
}
