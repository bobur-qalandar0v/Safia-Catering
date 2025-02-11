import React, { useContext } from "react";
import useLanguage from "../../../hooks/useLanguage";

function EmptyBasket() {
  const { t } = useLanguage();
  return (
    <div className="basket__empty">
      <div className="basket__item">
        <div className="basket__logo">
          <img src="public/Logo.png" alt="Logo" />
        </div>
        <div className="basket__empty-title">
          <h2>{t("CartIsEmpty")}</h2>
        </div>
      </div>
    </div>
  );
}

export default EmptyBasket;
