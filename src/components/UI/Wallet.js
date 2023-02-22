import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadBalances, transferTokens } from "../../store/interactions";

const Wallet = () => {
  const [token1TransferAmount, setToken1TransferAmount] = useState("");
  const [token2TransferAmount, setToken2TransferAmount] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  // const [isWithdraw, setIsWithdraw] = useState(false);

  const dispatch = useDispatch();
  const exchange = useSelector((state) => state.exchange.contract);
  const tokens = useSelector((state) => state.tokens.contracts);
  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);
  const symbols = useSelector((state) => state.tokens.symbols);
  const tokenBalances = useSelector((state) => state.tokens.balances);
  const exchangeBalances = useSelector((state) => state.exchange.balances);
  const transferInProgress = useSelector(
    (state) => state.exchange.transferInProgress
  );

  const switchToDeposit = () => {
    if (isDeposit === false) {
      setIsDeposit(true);
    } else setIsDeposit(false);
  };

  const amountHandler = (e, token) => {
    if (token.address === tokens[0].address) {
      setToken1TransferAmount(e.target.value);
    } else {
      setToken2TransferAmount(e.target.value);
    }
  };

  const depositHandler = (e, token) => {
    e.preventDefault();
    if (token.address === tokens[0].address) {
      transferTokens(
        provider,
        exchange,
        "Deposit",
        token,
        token1TransferAmount,
        dispatch
      );
      setToken1TransferAmount("");
    }
    if (token.address === tokens[1].address) {
      transferTokens(
        provider,
        exchange,
        "Deposit",
        token,
        token2TransferAmount,
        dispatch
      );
      setToken2TransferAmount(0);
    }
  };

  const withdrawHandler = (e, token) => {
    e.preventDefault();
    if (token.address === tokens[0].address) {
      transferTokens(
        provider,
        exchange,
        "Withdraw",
        token,
        token1TransferAmount,
        dispatch
      );
      setToken1TransferAmount(0);
    } else {
      transferTokens(
        provider,
        exchange,
        "Withdraw",
        token,
        token2TransferAmount,
        dispatch
      );
      setToken2TransferAmount(0);
    }
    console.log("withdraw tokens");
  };

  useEffect(() => {
    if (exchange && tokens[0] && tokens[1] && account) {
      loadBalances(exchange, tokens, account, dispatch);
    }
  }, [exchange, tokens, account, transferInProgress]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md text-slate-300">Wallet</h2>

        <div>
          <label
            for="Toggle3"
            className="inline-flex items-center p-1 rounded-2xl cursor-pointer  text-sm bg-slate-900"
          >
            <input id="Toggle3" type="checkbox" className="hidden peer" />
            <span
              className="px-2 py-0.5 rounded-xl dark:bg-teal-700/80 dark:text-slate-200 peer-checked:dark:bg-gray-900 text-xs"
              onClick={switchToDeposit}
            >
              deposit
            </span>
            <span
              className="px-2 py-0.5 rounded-xl dark:bg-gray-900 peer-checked:dark:bg-teal-700/80 text-slate-200 text-xs"
              onClick={switchToDeposit}
            >
              withdraw
            </span>
          </label>
        </div>
      </div>

      <div className="pb-4">
        <div className="pb-4 text-slate-200 flex justify-between">
          <div>
            <p className="text-xs text-slate-400">Token</p>
            <div className="text-sm">{symbols && symbols[0]}</div>
          </div>
          <div>
            <p className="text-xs text-slate-400">Wallet</p>
            <div className="text-sm">
              {tokenBalances && Number(tokenBalances[0]).toFixed(4)}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400">Exchange</p>
            <div className="text-sm">
              {exchangeBalances && Number(exchangeBalances[0]).toFixed(4)}
            </div>
          </div>
        </div>

        <form
          onSubmit={
            isDeposit
              ? (e) => depositHandler(e, tokens[0])
              : (e) => withdrawHandler(e, tokens[0])
          }
        >
          <label htmlFor="token0" className="text-sm">
            {symbols && symbols[0]} amount
          </label>
          <input
            type="text"
            id="token0"
            placeholder="0.0000"
            value={token1TransferAmount === "" ? "" : token1TransferAmount}
            className="bg-slate-900 w-full px-5 py-1.5 outline-none rounded-xl mt-2 text-sm"
            onChange={(e) => amountHandler(e, tokens[0])}
          />

          <button
            className="button flex justify-center items-center w-full mt-4
            hover:bg-teal-900 text-teal-700 hover:text-slate-300 py-1.5 rounded-xl border-2 border-teal-900 text-sm"
            type="submit"
          >
            {isDeposit ? <span>Deposit</span> : <span>Withdraw</span>}
          </button>
        </form>
      </div>

      <div>
        <div className="pb-4 text-slate-200 flex justify-between">
          <div>
            <p className="text-xs text-slate-400">Token</p>
            <div className="text-sm">{symbols && symbols[1]}</div>
          </div>
          <div>
            <p className="text-xs text-slate-400">Wallet</p>
            <div className="text-sm">
              {tokenBalances && Number(tokenBalances[1]).toFixed(4)}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400">Exchange</p>
            <div className="text-sm">
              {exchangeBalances && Number(exchangeBalances[1]).toFixed(4)}
            </div>
          </div>
        </div>

        <form
          onSubmit={
            isDeposit
              ? (e) => depositHandler(e, tokens[1])
              : (e) => withdrawHandler(e, tokens[1])
          }
        >
          <label htmlFor="token1" className="text-sm">
            {symbols && symbols[1]} amount
          </label>
          <input
            type="text"
            id="token1"
            placeholder="0.0000"
            onChange={(e) => amountHandler(e, tokens[1])}
            value={token2TransferAmount === 0 ? "" : token2TransferAmount}
            className="bg-slate-900 w-full px-5 py-1.5 outline-none rounded-xl mt-2 text-sm"
          />
          <button
            className="button flex justify-center items-center w-full mt-4
            hover:bg-teal-900 text-teal-700 hover:text-slate-300 py-1.5 rounded-xl border-2 border-teal-900 text-sm"
            type="submit"
          >
            {isDeposit ? <span>Deposit</span> : <span>Withdraw</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Wallet;
