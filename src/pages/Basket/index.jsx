import React, { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import BasketCart from "./components/BasketCart";
import EmptyBasket from "./components/EmptyBasket";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function BasketPage() {
  const { basket } = useContext(BasketContext);
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div className="basket-page">
      <div className="container">
        {token ? (
          basket.length > 0 ? (
            <BasketCart />
          ) : (
            <EmptyBasket />
          )
        ) : (
          navigate("/login")
        )}
      </div>
    </div>
  );
}

export default BasketPage;
