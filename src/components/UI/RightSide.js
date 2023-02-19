import React from "react";
import Networks from "./Networks";
import Balance from "./Balance";
import Markets from "./Markets";

const RightSide = () => {
  return (
    <div>
      <div className="py-4 px-8 w-80 rounded-2xl text-slate-100 bg-slate-800 border-[1px] border-gray-500/50 ">
        <Networks />
        <Balance />
        <Markets />
      </div>
    </div>
  );
};

export default RightSide;
