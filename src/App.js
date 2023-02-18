import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import config from "./config.json";

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadExchange,
} from "./store/interactions";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    // Connect Ether to the blockchain
    const provider = loadProvider(dispatch);

    // Fetch current network's chainId (e.g. hardhat 1337, kovan:42)
    const chainId = await loadNetwork(provider, dispatch);

    // Fetch current account & balance from Metamask
    await loadAccount(provider, dispatch);

    // Load tokens Smart Contract
    const EMRS = config[chainId].EMRS;
    const WRG = config[chainId].WRG;

    await loadTokens(provider, [EMRS.address, WRG.address], dispatch);

    // Load exchange smart contract
    const exchangeConfig = config[chainId].exchange;
    await loadExchange(provider, exchangeConfig.address, dispatch);
  };

  useEffect(() => {
    loadBlockchainData();
  });

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
