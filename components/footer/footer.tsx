import React from "react";
import Link from "next/link";
import menuItems from "@/lib/constants/menu";
function Footer() {
  return (
    <footer className="p-4  sm:p-6  pt-10 bg-primaryContainer border-t">
      <div className="md:flex md:justify-between w-full">
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 w-full">
          <div>
            <h2 className="mb-6 text-sm font-semibold  uppercase">Resources</h2>
            <ul className="">
              <li>
                <Link
                  href="https://skyeonearth.com/cacaofacilitation"
                  className="hover:underline"
                >
                  Cacao Facilitator Training
                </Link>
              </li>
              {menuItems.map((e) => {
                return (
                  <li key={e.subTitle}>
                    <Link href={e.link} className="hover:underline">
                      {e.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold  uppercase ">
              Follow us
            </h2>
            <ul className=" ">
              <li className="mb-4">
                <Link
                  href="https://www.instagram.com/sacbe.cacao/?hl=en"
                  className="hover:underline "
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold  uppercase ">Legal</h2>
            <ul className="">
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 sm:mx-auto  lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm  sm:text-center">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            Sacbe Cacao™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
