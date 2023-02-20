import React from "react";
import Networks from "./Networks";
import Balance from "./Balance";
import Markets from "./Markets";
import BlockComponent from "./BlockComponent";
import Wallet from "./Wallet";

const RightSide = () => {
  return (
    <div>
      <BlockComponent>
        <Networks />
        <Balance />
      </BlockComponent>

      <BlockComponent>
        <Markets />
      </BlockComponent>

      <BlockComponent>
        <Wallet />
      </BlockComponent>
    </div>
  );
};

export default RightSide;
