import React from "react";
import config from "../../config.json";
import { loadTokens } from "../../store/interactions";
import { useSelector, useDispatch } from "react-redux";

const Markets = () => {
  const provider = useSelector((state) => state.provider.connection);
  const chainId = useSelector((state) => state.provider.chainId);
  const dispatch = useDispatch();

  const marketHandler = async (e) => {
    loadTokens(provider, e.target.value.split(","), dispatch);
  };

  return (
    <div>
      <div>
        <h2 className="text-sm mb-1 text-slate-300">Select Market</h2>
      </div>

      {chainId && config[chainId] ? (
        <div>
          <select
            className="bg-transparent w-full outline-none text-xs "
            name="markets"
            onChange={marketHandler}
          >
            <option
              value={`${config[chainId].EMRS.address},${config[chainId].WRG.address}`}
            >
              EMRS / WRG
            </option>
            <option
              value={`${config[chainId].EMRS.address},${config[chainId].MOON.address}`}
            >
              EMRS / MOON
            </option>
          </select>
        </div>
      ) : (
        <div>
          <p className="text-sm">Not Deployed</p>
        </div>
      )}
    </div>
  );
};

export default Markets;
