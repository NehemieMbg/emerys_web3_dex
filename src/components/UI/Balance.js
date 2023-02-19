import React from "react";
import { useSelector } from "react-redux";

const Balance = () => {
  const balance = useSelector((state) => state.provider.balance);

  return (
    <div>
      <div className="bg-slate-900 w-fit px-6 py-2.5 rounded-xl mb-5">
        {balance ? (
          <div>
            <span className="text-slate-200">Balance: </span>
            {Number(balance).toFixed(4) + " Eth"}
          </div>
        ) : (
          <div>
            <span className="text-slate-300">Balance:</span> 0.0000 Eth
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
