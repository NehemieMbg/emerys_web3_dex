import React from "react";
import { useSelector } from "react-redux";
import eth from "../../images/eth.svg";
import config from "../../config.json";

const RightSide = () => {
  const balance = useSelector((state) => state.provider.balance);
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
      <div class="py-4 px-8 w-80 rounded-2xl text-slate-100 bg-slate-800 border-[1px] border-gray-500/50 ">
        <div class="flex justify-between mb-6 gap-2">
          <img src={eth} alt="eth logo" class="h-6" />

          {chainId && (
            <select
              name="networks"
              id="networks"
              class="bg-transparent w-full outline-none"
              value={config[chainId] ? `Ox${chainId.toString(16)}` : `0`}
              onChange={networkHandler}
            >
              <option value="0" disabled>
                Select Network
              </option>
              <option value="0x7A69">Localhost</option>
              <option value="0x5">Goerli</option>
            </select>
          )}
        </div>

        <div class="bg-slate-900 w-fit px-6 py-2.5 rounded-xl">
          {balance ? (
            <div>
              <span class="text-slate-200">Balance: </span>
              {Number(balance).toFixed(4) + " Eth"}
            </div>
          ) : (
            <div>
              <span class="text-slate-300">Balance:</span> 0 Eth
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
