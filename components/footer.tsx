import React from "react";
import Link from "next/link";
import menuItems from "@/lib/constants/menu";
function Footer() {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-900 pt-10 bg-primaryContainer border-t">
      <div className="md:flex md:justify-between w-full">
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 w-full">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Resources
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
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
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Follow us
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
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
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
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
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
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
