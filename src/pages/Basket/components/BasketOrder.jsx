import React from "react";
import PDFIcon from "../../../assets/icons/PDFIcon";
import { Link } from "react-router-dom";
import useLanguage from "../../../hooks/useLanguage";

function BasketOrder() {
  const { t } = useLanguage();

  const handleClick = () => {
    localStorage.removeItem("basket");
    localStorage.removeItem("basketCount");
    localStorage.removeItem("cardId");
  };

  return (
    <div className="basket__order">
      <div className="container">
        <div className="basket__order-wrap">
          <div className="basket__order-content">
            <img className="basket__order-top" src="/Logo.png" alt="Logo" />
            <div className="basket__order-center">
              <h3>{t("rahmat")}</h3>
              <div>
                <p style={{ fontSize: "18px" }}>{t("raqam")}</p>
                <h3>548648</h3>
              </div>
              <p style={{ fontSize: "18px", textAlign: "center" }}>
                {t("operator")}
              </p>
            </div>
            <div className="basket__order-bottom">
              <button className="order_history-button add">
                {t("CommercialOffer")}
                <PDFIcon />
              </button>
              <Link to="/" className="global__btn" onClick={handleClick}>
                {t("asosiyBet")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketOrder;
