import React from "react";
import menuItems from "@/lib/constants/menu";
import Link from "next/link";
function NavMenuBottom() {
  return (
    <nav>
      <menu>
        <div className="flex justify-around border-onSecondaryContainer border-b-4 border-t-4 py-2 -z-10">
          {menuItems.map((item) => (
            <Link
              key={item.link + "link" + item.text}
              className="my-3"
              href={item.link}
            >
              <h4 className="text-sm md:text-xl">{item.text.toUpperCase()}</h4>
            </Link>
          ))}
        </div>
      </menu>
    </nav>
  );
}

export default NavMenuBottom;
