import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBookSelector } from "../../store/selectors";
import { fillOrder } from "../../store/interactions";

const OrderBook = () => {
  const provider = useSelector((state) => state.provider.connection);
  const exchange = useSelector((state) => state.exchange.contract);
  const symbols = useSelector((state) => state.tokens.symbols);
  const orderBook = useSelector(orderBookSelector);
  const dispatch = useDispatch();

  const fillOrderHandler = (order) => {
    fillOrder(provider, exchange, order, dispatch);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-slate-400 text-md font-medium">Order Book</h2>
      </div>

      <div className="flex gap-4">
        <div className="flex-col w-[50%]">
          {!orderBook || orderBook.buyOrders.length === 0 ? (
            <p>No Buy Orders</p>
          ) : (
            <table className="w-full">
              <caption className="text-slate-300 font-semibold mb-4 text-left">
                Buying
              </caption>

              <thead>
                <tr className="flex justify-between text-xs text-slate-400 font-extralight mb-4">
                  <th>{symbols && symbols[0]}</th>
                  <th>
                    {symbols && symbols[0]} / {symbols && symbols[1]}
                  </th>
                  <th>{symbols && symbols[1]}</th>
                </tr>
              </thead>
              <tbody>
                {orderBook &&
                  orderBook.buyOrders.map((order, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => fillOrderHandler(order)}
                        className={`flex justify-between w-full cursor-pointer text-teal-700
                          ${
                            index % 2 === 0
                              ? "bg-gray-900 hover:bg-teal-900 hover:text-slate-300 px-2 py-1 rounded-xl"
                              : "hover:bg-teal-900 hover:text-slate-300 px-2 py-1 rounded-xl"
                          }`}
                      >
                        <td className="text-slate-300">{order.token0Amount}</td>
                        <td className="">{order.tokenPrice}</td>
                        <td className="text-slate-300">{order.token1Amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>

        <div className="w-[50%] h-full">
          {!orderBook || orderBook.sellOrders.length === 0 ? (
            <p>No Sell Orders</p>
          ) : (
            <table className="w-full">
              <caption className="text-slate-300 font-semibold mb-4 text-right">
                Selling
              </caption>
              <thead>
                <tr className="flex justify-between text-xs text-slate-400 font-extralight mb-4">
                  <th>{symbols && symbols[1]}</th>
                  <th>
                    {symbols && symbols[1]} / {symbols && symbols[0]}
                  </th>
                  <th>{symbols && symbols[0]}</th>
                </tr>
              </thead>
              <tbody>
                {orderBook &&
                  orderBook.sellOrders.map((order, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => fillOrderHandler(order)}
                        className={`flex justify-between w-full cursor-pointer text-rose-700
                        ${
                          index % 2 !== 0
                            ? "bg-gray-900 hover:bg-rose-900 hover:text-slate-300 px-2 py-1 rounded-xl"
                            : "hover:bg-rose-900 hover:text-slate-300 px-2 py-1 rounded-xl"
                        }`}
                      >
                        <td className="text-slate-300">{order.token1Amount}</td>
                        <td className="">{order.tokenPrice}</td>
                        <td className="text-slate-300">{order.token0Amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
