import React, { useContext, useEffect, useState } from "react";
import { API } from "../../api";
import { urls } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import LoadingAnimate from "../../assets/icons/LoadingAnimate";
import { BasketContext } from "../../context/basketContext";
import { LangContext } from "../../context/LanguageContext";
import useLanguage from "../../hooks/useLanguage";
import { message } from "antd";

function OrderButton() {
  const [modal, setModal] = useState([]);
  const [loading, setLoadiing] = useState(true);

  const { selectedCard, setSelectedCard } = useContext(BasketContext);

  const navigate = useNavigate();

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
    if (selectedCard === null || selectedCard.length == 0) {
      message.open({ type: "warning", content: "Please select one" });
    } else {
      navigate("/order2");
    }
  };

  useEffect(() => {
    const savedCard = JSON.parse(localStorage.getItem("selectedCard"));
    if (savedCard) {
      setSelectedCard(savedCard);
    }
    getProducts();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      localStorage.removeItem("selectedCard");
      setSelectedCard(null);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setSelectedCard]);

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
            <h2>{t("SelectAService")}</h2>
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
        {/* <Link
          className="sss"
          to={selectedCard == null ? () => handleClick() : "/order2"}
          onClick={() => handleClick()}
        > */}
        <div className="btn__wrap">
          <button className="global__btn sss" onClick={() => handleClick()}>
            {t("next")}
          </button>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default OrderButton;
