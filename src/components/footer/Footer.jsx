import { Link } from "react-router-dom";
import { Logo } from "../index";

export default function Footer() {
  return (
    <footer className="w-screen overflow-x-hidden py-10 bg-white dark:bg-[#131315] dark:border-t-[1px] dark:border-[#2b2b2e]">
      <div className=" mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-base font-nunito-sans font-semibold uppercase text-gray-600 dark:text-slate-400">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-base font-nunito-sans font-semibold uppercase text-gray-600 dark:text-slate-400">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-base font-nunito-sans font-semibold uppercase text-gray-600 dark:text-slate-400">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium font-inter text-gray-900 dark:text-slate-300 hover:text-gray-700 dark:hover:opacity-75"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
