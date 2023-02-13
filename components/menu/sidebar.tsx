import Link from "next/link";
import React from "react";
import menuItems from "@/lib/constants/menu";
function SideBar() {
  return (
    <menu className="sticky bg-sacbeBrandColor w-[30%] p-10 ">
      {menuItems.map((item) => (
        <Link key={`${item.text}link`} href={item.link}>
          <li key={`${item.text}menubar`} className="p-3">
            <h1>{item.text}</h1>
          </li>
        </Link>
      ))}
    </menu>
  );
}

export default SideBar;
