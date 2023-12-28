import React from "react";
import SeconadaryButton from "../buttons/secondaryButton";

function SecondaryCard() {
  return (
    <div className="inline-flex  bg-tertiaryContainer m-10 p-5 rounded-xl">
      Seconadary Card
      <SeconadaryButton
        text="second button "
        onClick={() => {}}
      ></SeconadaryButton>
    </div>
  );
}

export default SecondaryCard;
