import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Blockies from "react-blockies";
import { loadAccount } from "../store/interactions";
import MoonLogo from "../images/moon-logo.svg";

function Navbar() {
  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);

  const dispatch = useDispatch();

  const connectHandler = async () => {
    // Load account
    await loadAccount(provider, dispatch);
  };
  return (
    <div className="bg-gray-900 h-full flex justify-between items-center px-16 py-6 pb-16">
      <div className="text-white font-semibold flex items-center gap-1">
        <img src={MoonLogo} className="h-12" alt="logo" />
        <h1 className="text-2xl">emrs</h1>
      </div>

      <div>
        <div class="text-white font-medium text-sm cursor-pointer bg-slate-700 hover:bg-teal-700  rounded-md border-slate-400/20 border-[1px]">
          {account ? (
            <a href="none" className="flex gap-4 items-center px-10 py-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>

              {account.slice(0, 5) + "..." + account.slice(38, 42)}
              <Blockies
                seed={account}
                size={10}
                scale={3}
                color="2187D0"
                bgColor="#F1F2F9"
              />
            </a>
          ) : (
            <button className="px-10 py-3.5" onClick={connectHandler}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
