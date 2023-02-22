import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeBuyOrder, makeSellOrder } from "../../store/interactions";

const Order = () => {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [choice, setChoice] = useState();
  const provider = useSelector((state) => state.provider.connection);
  const tokens = useSelector((state) => state.tokens.contracts);
  const exchange = useSelector((state) => state.exchange.contract);
  const dispatch = useDispatch();

  const buyHandler = () => {
    makeBuyOrder(provider, exchange, tokens, { amount, price }, dispatch);
    console.log("buy....");
  };

  const sellHandler = () => {
    makeSellOrder(provider, exchange, tokens, { amount, price }, dispatch);
    console.log("sell...");
  };

  const setBuyOrder = () => {
    setChoice(1);
  };

  const setSellOrder = () => {
    setChoice(2);
  };

  const orderHandler = (e) => {
    if (choice === 1) {
      e.preventDefault();
      buyHandler();
      setAmount(0);
      setPrice(0);
    }
    if (choice === 2) {
      e.preventDefault();
      sellHandler();
      setAmount(0);
      setPrice(0);
    }
  };

  return (
    <div>
      <h2 className="text-slate-300 text-md mb-2">New Order</h2>

      <form onSubmit={orderHandler}>
        <p className="text-slate-300 text-sm">Amount</p>
        <input
          type="text"
          id="amount"
          placeholder="0.0000"
          onChange={(e) => setAmount(e.target.value)}
          value={amount === 0 ? "" : amount}
          className="bg-slate-900 w-full px-5 py-1.5 outline-none rounded-xl mt-2 text-sm mb-4"
        />
        <p className="text-slate-300 text-sm">Price</p>
        <input
          type="text"
          id="price"
          placeholder="0.0000"
          onChange={(e) => setPrice(e.target.value)}
          value={price === 0 ? "" : price}
          className="bg-slate-900 w-full px-5 py-1.5 outline-none rounded-xl mt-2 text-sm"
        />
        <div className="w-full flex justify-around items-center text-sm mt-4">
          <button
            onClick={setBuyOrder}
            className="hover:bg-teal-900 text-teal-700 hover:text-slate-300 py-1.5 rounded-xl border-2 border-teal-900 px-11"
          >
            Buy
          </button>
          <button
            onClick={setSellOrder}
            className="hover:bg-rose-900 text-rose-700 hover:text-slate-300 py-1.5 rounded-xl border-2 border-rose-900 px-11"
          >
            Sell
          </button>
        </div>
      </form>
    </div>
  );
};

export default Order;
