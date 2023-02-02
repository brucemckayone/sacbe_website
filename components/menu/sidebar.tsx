import Link from "next/link";
import React from "react";
import menuItems from "@/lib/constants/menu";
function SideBar() {
  return (
    <menu className="sticky bg-sacbeBrandColor w-[30%] p-10 ">
      {menuItems.map((item) => (
        <Link href={item.link}>
          <li className="p-3">
            <h1>{item.text}</h1>
          </li>
        </Link>
      ))}
    </menu>
  );
}

export default SideBar;
