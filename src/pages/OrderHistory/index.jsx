import React, { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import OrderHistory from "./Components/OrderHistory";
import EmptyHistory from "./Components/EmptyHistory";

function History() {
  const { orderHistory } = useContext(BasketContext);
  return (
    <div className="history__page">
      <div className="container">
        {orderHistory.length > 0 ? <OrderHistory /> : <EmptyHistory />}
      </div>
    </div>
  );
}

export default History;
