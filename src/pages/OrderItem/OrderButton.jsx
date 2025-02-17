import React, { useContext, useEffect, useState } from "react";
import { API } from "../../api";
import { urls } from "../../constants/urls";
import { Link } from "react-router-dom";
import LoadingAnimate from "../../assets/icons/LoadingAnimate";
import { BasketContext } from "../../context/basketContext";
import { LangContext } from "../../context/LanguageContext";
import useLanguage from "../../hooks/useLanguage";
import { message } from "antd";

function OrderButton() {
  const [modal, setModal] = useState([]);
  const [loading, setLoadiing] = useState(true);

  const { selectedCard, setSelectedCard } = useContext(BasketContext);

  const { language } = useContext(LangContext);
  const { t } = useLanguage();

  const getProducts = () => {
    API.get(urls.card_icons.get).then((res) => {
      setModal(res.data);
      setLoadiing(false);
    });
  };

  const handleCardClick = (data) => {
    const cardData = { ...data, count: null };
    localStorage.setItem("selectedCard", JSON.stringify(cardData));
    setSelectedCard(cardData);
  };

  const handleClick = () => {
    if (selectedCard == null) {
      message.open({ type: "warning", content: "Please select one" });
    }
  };

  useEffect(() => {
    const savedCard = JSON.parse(localStorage.getItem("selectedCard"));
    if (savedCard) {
      setSelectedCard(savedCard);
    }
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div
          style={{
            width: "100%",
            height: "97vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoadingAnimate />
        </div>
      </div>
    );
  }
  return (
    <div className="zaqas">
      <div className="container">
        <div className="zaqas__wrap">
          <div className="zaqas__top">
            <div className="zaqas__top-line"></div>
            <div className="lines">
              <h3 className="zaqas__all zaqas__one">1</h3>
              <h3 className="zaqas__all zaqas__two">2</h3>
              <h3 className="zaqas__all zaqas__three">3</h3>
            </div>
          </div>
          <div className="zaqas__cards">
            <h3>{t("SelectAService")}</h3>
            <div className="zaqas__card">
              {modal.map((item) => (
                <div
                  className={`zaqas__card-item ${
                    selectedCard?.id === item?.id ? "active" : ""
                  }`}
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                >
                  <img src={item.icon} alt="" className="zaqas__card-img" />
                  <span className="zaqas__card-text">
                    {language == "uz"
                      ? item?.name_uz
                      : language == "ru"
                      ? item?.name_ru
                      : item.name_eng}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Link
          className="sss"
          to={selectedCard == null ? () => handleClick() : "/order2"}
          onClick={() => handleClick()}
        >
          <button className="global__btn sss">{t("next")}</button>
        </Link>
      </div>
    </div>
  );
}

export default OrderButton;
