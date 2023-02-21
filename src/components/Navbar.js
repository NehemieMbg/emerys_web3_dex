import React from "react";
import MoonLogo from "../images/moon-logo.svg";
import EmrsLogo from "../images/emerys-teal.svg";
import Connect from "./UI/Connect";
import Network from "./UI/Networks";

function Navbar() {
  return (
    <div className="bg-gray-900 h-full flex justify-between items-center px-16 py-6">
      <div>
        <div className=" flex items-center gap-1">
          <img src={EmrsLogo} className="h-10 mr-1 " alt="logo" />
          <h1 className="text-2xl mr-28 text-white font-semibold">emrs</h1>
          <div className="mt-1 flex gap-8 text-slate-300 font-medium">
            <div className="hover:text-teal-400">
              <a
                href="https://github.com/NehemieMbg/emerys_web3_dex"
                target="_blank"
                className="flex gap-1"
              >
                Github
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=" h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
            <div className="hover:text-teal-400 cursor-pointer">Us</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-12">
        <Network />
        <Connect />
      </div>
    </div>
  );
}

export default Navbar;
