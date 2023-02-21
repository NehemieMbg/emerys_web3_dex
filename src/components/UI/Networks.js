import React from "react";
import { useSelector } from "react-redux";
import eth from "../../images/eth.svg";
import config from "../../config.json";

const Networks = () => {
  const chainId = useSelector((state) => state.provider.chainId);

  // Switches network
  const networkHandler = async (e) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: e.target.value }],
    });
  };

  return (
    <div className="flex justify-between mb-6 gap-2 hover:text-teal-400 cursor-pointer items-center">
      <img src={eth} alt="eth logo" className="h-6" />

      {chainId && (
        <select
          name="networks"
          id="networks"
          className="bg-transparent w-full outline-none text-md text-slate-300"
          value={config[chainId] ? `Ox${chainId.toString(16)}` : `0`}
          onChange={networkHandler}
        >
          <option value="0" disabled>
            Select Network
          </option>
          <option value="0x1">Localhost</option>
          {/* <option value="0x5">Goerli</option> */}
        </select>
      )}
    </div>
  );
};

export default Networks;
