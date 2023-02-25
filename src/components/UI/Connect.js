import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Blockies from "react-blockies";
import { loadAccount } from "../../store/interactions";

function Connect() {
  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);

  const dispatch = useDispatch();

  const connectHandler = async () => {
    // Load account
    await loadAccount(provider, dispatch);
  };

  return (
    <div>
      <div class="text-white font-medium text-sm cursor-pointer bg-teal-700 hover:bg-teal-900  rounded-md border-slate-400/20 border-[1px]">
        {account ? (
          <div className="flex gap-4 items-center px-10 py-2.5">
            {account.slice(0, 5) + "..." + account.slice(38, 42)}
            <Blockies
              seed={account}
              size={10}
              scale={3}
              color="2187D0"
              bgColor="#F1F2F9"
            />
          </div>
        ) : (
          <button className="px-10 py-3.5" onClick={connectHandler}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default Connect;
