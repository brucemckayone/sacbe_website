"use client";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

export function FeelsProgressBar(props: any) {
  return (
    <ProgressBar
      completed={props.percentage}
      customLabel={props.name}
      bgColor="#FF932F"
      className="shadow-lg rounded-full"
    ></ProgressBar>
  );
}
