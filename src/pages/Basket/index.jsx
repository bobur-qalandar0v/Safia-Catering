import React, { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import BasketCart from "./components/BasketCart";
import EmptyBasket from "./components/EmptyBasket";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function BasketPage() {
  const { basket } = useContext(BasketContext);
  const { token } = useContext(AuthContext);
  const tel = JSON.parse(localStorage.getItem("tel"));

  const navigate = useNavigate();
  return (
    <div className="basket-page">
      <div className="container">
        {tel ? (
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
