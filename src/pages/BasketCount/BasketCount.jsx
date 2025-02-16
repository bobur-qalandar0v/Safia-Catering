import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { urls } from "../../constants/urls";
import { BasketContext } from "../../context/basketContext";
import { LangContext } from "../../context/LanguageContext";
import useLanguage from "../../hooks/useLanguage";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import MinusIcon from "../../assets/icons/MinusIcon";
import PlusIcon from "../../assets/icons/PlusIcon";

function BasketCount() {
  const { card, setCard, incrementItem, decrementItem, deleteItem } =
    useContext(BasketContext);

  const { language } = useContext(LangContext);

  const { t } = useLanguage();

  const cardId = localStorage.getItem("cardId");
  const changedId = localStorage.getItem("changedId");

  const navigate = useNavigate();

  const handleIncrement = (id) => {
    incrementItem(id);
  };

  const handleDecrement = (id) => {
    decrementItem(id);
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  const selectedCategory = card.find(
    (food) => food?.id === parseInt(changedId)
  );

  const items = selectedCategory ? selectedCategory?.items : [];

  const handleChange = () => {
    const updateData = card.map((item) => {
      return {
        id: item.id,
        name_ru: item.name_ru,
        name_eng: item.name_eng,
        name_uz: item.name_uz,
        items: item?.items,
      };
    });

    API.patch(`${urls.sets.edit(cardId)}`, { foods: updateData })
      .then((res) => {
        if (res.status == 200) {
          navigate(-1);
          localStorage.removeItem("changedId");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCancel = () => {
    navigate(-1);
    localStorage.removeItem("changedId");
  };

  useEffect(() => {
    const handlePopState = () => {
      localStorage.removeItem("changedId");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setCard]);

  return (
    <div className="container">
      <div className="basket">
        <div className="basket__warp">
          {card.map((item) => {
            if (item?.id === parseInt(changedId)) {
              return (
                <h2 key={item.id}>
                  {language == "uz"
                    ? item.name_uz
                    : language == "ru"
                    ? item.name_ru
                    : item.name_eng}
                </h2>
              );
            }
          })}
          <div className="basket__main">
            {items.map((i) => (
              <div className="basket__main-content" key={i.id}>
                <img
                  className="basket__main-img"
                  src={i?.image}
                  alt="category"
                />
                <p className="basket__main-name">
                  {language == "uz"
                    ? i?.name_uz
                    : language == "ru"
                    ? i?.name_ru
                    : i?.name_eng}
                </p>
                <div className="basket__main-text">
                  <div className="basket__main-control">
                    <button
                      className="decrement"
                      onClick={() => handleDecrement(i?.id)}
                    >
                      <MinusIcon />
                    </button>
                    <p className="basket__main-count">{i?.count}</p>
                    <button
                      className="increment"
                      onClick={() => handleIncrement(i?.id)}
                    >
                      <PlusIcon />
                    </button>
                    <button
                      className="delete__icon"
                      onClick={() => handleDelete(i?.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="basket__btns">
            <button
              className="basket__cancel-btn"
              onClick={() => handleCancel()}
            >
              {t("Cancel")}
            </button>
            <button
              className="basket__confirm-btn"
              onClick={() => handleChange()}
            >
              {t("Confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketCount;
