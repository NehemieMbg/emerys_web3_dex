import React from "react";
import OrderBook from "./OrderBook";

const LeftSide = () => {
  return (
    <div className="flex w-full h-[840px] py-4 px-8 rounded-2xl text-slate-100 bg-slate-800 border-[1px] border-gray-500/50 mb-2">
      <OrderBook />
    </div>
  );
};

export default LeftSide;
