import React from "react";
import "../../app/globals.css";
import { RxHamburgerMenu } from "react-icons/rx";
function ProfileButton() {
  return (
    <div className="group transition duration-1000 ease-out">
      <button
        className="transition  ease-out bg-primaryContainer p-2 rounded-lg group-hover:bg-secondary "
        onClick={goToProfile}
      >
        <RxHamburgerMenu className="transition  ease-out text-onPrimaryContainer group-hover:text-onSecondary  " />
      </button>
    </div>
  );
}

function goToProfile() {}
export default ProfileButton;
