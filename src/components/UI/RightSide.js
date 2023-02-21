import React from "react";
import Balance from "./Balance";
import Markets from "./Markets";
import BlockComponent from "./BlockComponent";
import Wallet from "./Wallet";

const RightSide = () => {
  return (
    <div>
      <BlockComponent>
        <Balance />
        <Markets />
      </BlockComponent>

      <BlockComponent>
        <Wallet />
      </BlockComponent>
    </div>
  );
};

export default RightSide;
