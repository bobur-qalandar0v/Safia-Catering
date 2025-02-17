import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BasketContext } from "../../context/basketContext";
import useLanguage from "../../hooks/useLanguage";
import { message } from "antd";

function OrderButton2() {
  const { selectedCard, setSelectedCard } = useContext(BasketContext);
  const { t } = useLanguage();

  const navigate = useNavigate();

  const [PersonCount, setPersonCount] = useState(false);

  const handlePersonCount = (data) => {
    const updateCard = { ...selectedCard, count: data };
    localStorage.setItem("selectedCard", JSON.stringify(updateCard));
    setSelectedCard(updateCard);
  };

  const handleClick = () => {
    if (selectedCard?.count == null) {
      message.open({ type: "warning", content: `${t("selectOne")}` });
    } else {
      navigate("/order3");
    }
  };

  const togglePersonCount = () => {
    setPersonCount(!PersonCount);
  };

  const baseCounts =
    selectedCard?.person_count
      ?.filter((item) => item?.count <= 100)
      ?.map((item) => item.count) || [];

  const extraCount =
    selectedCard?.person_count
      ?.filter((item) => item.count > 100)
      ?.map((item) => item?.count) || [];

  useEffect(() => {
    const savedCard = JSON.parse(localStorage.getItem("selectedCard"));
    if (savedCard) {
      setSelectedCard(savedCard);
    }
  }, []);

  return (
    <div className="container">
      <div className="zaqas__number">
        <div className="zaqas__top">
          <div className="lines">
            <div className="zaqas__top-line2"></div>
            <h3 className="zaqas__all zaqas__one">1</h3>
            <h3 className="zaqas__all zaqas__two1">2</h3>
            <div className="zaqas__top-line3"></div>
            <h3 className="zaqas__all zaqas__three">3</h3>
          </div>
        </div>
        <h2 className="asd">{t("NumberOfPersons")}</h2>
        <div className="zaqas__number-wrap">
          {baseCounts.map((item) => (
            <div
              className={`zaqas__number-item ${
                selectedCard?.count === item ? "active" : ""
              }`}
              key={item}
              onClick={() => handlePersonCount(item)}
            >
              <h3>{item}</h3>
            </div>
          ))}

          {!PersonCount ? (
            <div className="zaqas__number-item" onClick={togglePersonCount}>
              <h3>100 +</h3>
            </div>
          ) : (
            extraCount.map((item) => (
              <div
                className={`zaqas__number-item ${
                  selectedCard?.count === item ? "active" : ""
                }`}
                key={item}
                onClick={() => handlePersonCount(item)}
              >
                <h3>{item}</h3>
              </div>
            ))
          )}
        </div>
        {/* <Link
          className="zaqas__number-link"
          to={selectedCard?.count == null ? () => handleClick() : "/order3"}
          onClick={() => handleClick()}
        > */}
      </div>
      <div className="btn__wrap">
        <button className="zaqas2__btn" onClick={() => handleClick()}>
          {t("next")}
        </button>
      </div>
      {/* </Link> */}
    </div>
  );
}

export default OrderButton2;
