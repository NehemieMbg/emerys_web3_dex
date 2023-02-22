import React from "react";
import Balance from "./Balance";
import Markets from "./Markets";
import BlockComponent from "./BlockComponent";
import Wallet from "./Wallet";
import Order from "./Order";

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

      <BlockComponent>
        <Order />
      </BlockComponent>
    </div>
  );
};

export default RightSide;
