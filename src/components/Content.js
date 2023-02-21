import React from "react";
import LeftSide from "./UI/LeftSide";
import RightSide from "./UI/RightSide";

const Content = () => {
  return (
    <div className="bg-gray-900 h-screen py-8 p-16 pt-0">
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default Content;
