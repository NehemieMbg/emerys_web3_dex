import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import config from "./config.json";

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadToken,
} from "./store/interactions";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    await loadAccount(dispatch);

    // Connect Ether to the blockchain
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);

    // Emerys Smart Contract
    await loadToken(provider, config[chainId].EMRS.address, dispatch);
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
