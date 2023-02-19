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
    <div>
      <div className="flex justify-between mb-6 gap-2">
        <img src={eth} alt="eth logo" className="h-6" />

        {chainId && (
          <select
            name="networks"
            id="networks"
            className="bg-transparent w-full outline-none text-sm"
            value={config[chainId] ? `Ox${chainId.toString(16)}` : `0`}
            onChange={networkHandler}
          >
            <option value="0" disabled>
              Select Network
            </option>
            <option value="0x1337">Localhost</option>
            <option value="0x5">Goerli</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default Networks;
