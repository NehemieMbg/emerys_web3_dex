import React from "react";
import LeftSide from "./UI/LeftSide";
import RightSide from "./UI/RightSide";

const Content = () => {
  return (
    <div class="bg-gray-900 h-screen py-8 px-16">
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default Content;
