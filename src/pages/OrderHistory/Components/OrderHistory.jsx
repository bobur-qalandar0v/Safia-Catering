import React, { useContext } from "react";
import PDFIcon from "../../../assets/icons/PDFIcon";
import { BasketContext } from "../../../context/basketContext";
import { LangContext } from "../../../context/LanguageContext";
import useLanguage from "../../../hooks/useLanguage";

function OrderHistory() {
  const { orderHistory } = useContext(BasketContext);

  const { language } = useContext(LangContext);
  const { t } = useLanguage();

  return (
    <div className="order_history">
      <div className="container">
        <div className="order_history__wrap">
          <h2 className="order_history__title">{t("OrderHistory")}</h2>
          <div className="order_history__banner">
            {orderHistory.map((item) => (
              <div className="order__banner-wrap" key={item.id}>
                <div className="order__banner-top">
                  <img
                    className="order__banner-img"
                    src="/AboutUs.png"
                    alt="img"
                  />
                  <p>
                    {language == "uz"
                      ? item.name_uz
                      : language == "ru"
                      ? item.name_ru
                      : item.name_eng}
                  </p>
                </div>
                <hr />
                <div className="order__banner-bottom">
                  <div className="order__banner-count display-flex">
                    <span className="color-same">№</span>
                    <p className="font-same">{item.order_id}</p>
                  </div>
                  <div className="order__banner-date display-flex">
                    <span className="color-same">{t("date")}</span>
                    <p className="font-same">
                      {item?.order_date} - {item?.order_time}
                    </p>
                  </div>
                  <div className="order__banner-price display-flex">
                    <span className="color-same">{t("summa")}</span>
                    <p className="font-same">
                      {item?.price?.toLocaleString()} {t("sum")}
                    </p>
                  </div>
                </div>
                <hr />
                <button className="order_history-button">
                  <PDFIcon />
                  {t("CommercialOffer")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
