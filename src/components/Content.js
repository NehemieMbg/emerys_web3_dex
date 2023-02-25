import React from "react";
import LeftSide from "./UI/LeftSide";
import RightSide from "./UI/RightSide";

const Content = () => {
  return (
    <div>
      <div className="bg-gray-900 h-screen py-8 p-16 pt-2 flex justify-center gap-3">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
};

export default Content;
