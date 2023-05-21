import Link from "next/link";
import React, { ReactNode } from "react";

export function DashboardSideBarListTile(props: {
  text: string;
  iconUrl?: string;
  update: React.Dispatch<React.SetStateAction<JSX.Element>>;
  mainBody: JSX.Element;
  toggleBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <li>
      <div
        onClick={() => {
          props.update(props.mainBody);
          props.toggleBar(false);
        }}
        className="text-xl no-underline flex items-center p-2 text-onTertiaryContainer bg-primaryContainer rounded-lg hover:bg-surface duration-300"
      >
        <svg
          aria-hidden="true"
          className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
        <span className="ml-3">{props.text.toLocaleUpperCase()}</span>
      </div>
    </li>
  );
}
