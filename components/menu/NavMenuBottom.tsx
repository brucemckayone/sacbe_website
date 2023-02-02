import React from "react";
import menuItems from "@/lib/constants/menu";
import Link from "next/link";
function NavMenuBottom() {
  return (
    <div>
      <menu>
        <div className="flex justify-around border-onSecondaryContainer border-b-4 border-t-4 my-2">
          {menuItems.map((item) => (
            <Link className="my-3" href={item.link}>
              <h1>{item.text}</h1>
            </Link>
          ))}
        </div>
      </menu>
    </div>
  );
}

export default NavMenuBottom;
