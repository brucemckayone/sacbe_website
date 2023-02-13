import React from "react";
import menuItems from "@/lib/constants/menu";
import Link from "next/link";
function NavMenuBottom() {
  return (
    <div>
      <menu>
        <div className="flex justify-around border-onSecondaryContainer border-b-4 border-t-4 py-2">
          {menuItems.map((item) => (
            <Link key={item.link + "link"} className="my-3" href={item.link}>
              <h4 className="text-lg md:text-xl">{item.text.toUpperCase()}</h4>
            </Link>
          ))}
        </div>
      </menu>
    </div>
  );
}

export default NavMenuBottom;
