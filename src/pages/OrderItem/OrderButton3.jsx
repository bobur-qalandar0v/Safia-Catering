import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BasketContext } from "../../context/basketContext";
import useLanguage from "../../hooks/useLanguage";
import { LangContext } from "../../context/LanguageContext";
import CheckMarkIcon from "../../assets/icons/CheckMarkIcon";

function OrderButton3() {
  const { selectedCard } = useContext(BasketContext);

  const navigate = useNavigate();

  const { t } = useLanguage();
  const { language } = useContext(LangContext);

  const handleClick = () => {
    navigate(-2);
  };

  return (
    <div className="container">
      <div className="zaqas__paket">
        <div className="zaqas__top">
          <div className="lines">
            <div className="zaqas__top-line2"></div>
            <h3 className="zaqas__all zaqas__one">1</h3>
            <h3 className="zaqas__all zaqas__two1">2</h3>
            <div className="zaqas__top-line4"></div>
            <h3 className="zaqas__all zaqas__three1">3</h3>
          </div>
        </div>
        <div className="zaqas__paket-warp">
          <div className="zaqas__paket-title">
            <h3>{t("Packages")}</h3>
            <div className="all">
              <Link to={"/order3"}>
                <img
                  src="/right.png"
                  alt=""
                  className="zaqas__paket-right_btn"
                />
              </Link>
              <Link to={"/order3-item"}>
                <img
                  src="/left.png"
                  alt=""
                  className="zaqas__paket-right_btn"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="zaqas__paket-bottom">
          <div className="zaqas__paket-bottom_title">
            <h3>
              {language == "uz"
                ? selectedCard.name_uz
                : language == "ru"
                ? selectedCard.name_ru
                : selectedCard.name_eng}{" "}
              M {selectedCard?.count}
            </h3>
            <button className="ekonomniy">{t("Economical")}</button>
          </div>
          <div className="summa">
            <span>1 500 000 {t("sum")}</span>
            <span className="opacity">2 000 000 {t("sum")}</span>
          </div>
          <hr />
          <div className="dhhh">
            <div className="texts__all">
              <CheckMarkIcon />
              <span>{t("food")}</span>
            </div>
            <div className="texts__text">
              <span>{t("DefaultMenu")}</span>
              <span>{t("Exclusive")}</span>
            </div>
            <div className="texts__all">
              <CheckMarkIcon />
              <span>{t("Field")}</span>
            </div>
            <div className="texts__text">
              <span>{t("Bartenders")}</span>
              <span>{t("Waiters")}</span>
              <span>{t("Grill")}</span>
              <span>{t("Pastry")}</span>
              <span>{t("manager")}</span>
            </div>
            <div className="texts__all">
              <CheckMarkIcon />
              <span>{t("Kitchenware")}</span>
            </div>
            <div className="texts__text">
              <span>Essenza</span>
              <span>Asa</span>
              <span>Tognana</span>
              <span>Easy life</span>
            </div>
          </div>
          <hr />
          <button className="global__btn2" onClick={handleClick}>
            {t("Choose")}
          </button>
        </div>
        <button className="global__btn tibi__btn">{t("Please")}</button>
      </div>
    </div>
  );
}

export default OrderButton3;
