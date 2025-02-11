import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { urls } from "../../constants/urls";
import { BasketContext } from "../../context/basketContext";
import { LangContext } from "../../context/LanguageContext";
import useLanguage from "../../hooks/useLanguage";

function BasketCount() {
  const {
    card,
    setCard,
    incrementItem,
    decrementItem,
    restoreItem,
    deleteItem,
    deleteAllItems,
    restoreAllItems,
  } = useContext(BasketContext);

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

  const handleRestore = (id) => {
    restoreItem(id);
  };

  const handleDeleteAllItems = (id) => {
    deleteAllItems(id);
  };

  const handleRestoreAllItems = (id) => {
    restoreAllItems(id);
  };

  const handleChange = () => {
    const updateData = card.map((item) => {
      const changedItems = item?.items?.filter((i) => i.removed !== undefined);
      return {
        id: item.id,
        name_ru: item.name_ru,
        name_eng: item.name_eng,
        name_uz: item.name_uz,
        items: changedItems,
      };
    });

    API.patch(`${urls.card.edit(cardId)}`, { foods: updateData })
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
          <div className="basket__top">
            {card.map((item) => {
              if (item?.id == changedId) {
                return (
                  <div
                    key={item.id}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 className="basket__title">
                      {language == "uz"
                        ? item?.name_uz
                        : language == "ru"
                        ? item?.name_ru
                        : item?.name_eng}
                    </h3>
                    {item?.items?.every((i) => i.removed === true) ? (
                      <button
                        className="basket__restore-button"
                        onClick={() => handleRestoreAllItems(item?.id)}
                      >
                        {t("Restore")}
                      </button>
                    ) : (
                      <button
                        className="basket__delete-button"
                        onClick={() => handleDeleteAllItems(item?.id)}
                      >
                        {t("DeleteAll")}
                      </button>
                    )}
                  </div>
                );
              }
            })}
          </div>
          {card.map((item) => {
            if (item?.id == changedId) {
              return (
                <div style={{ marginTop: "20px" }} key={item.id}>
                  {item?.items?.map((i) => (
                    <div className="basket__main" key={i.id}>
                      <div className="basket__main-top">
                        <span
                          className="basket__main-title"
                          style={{
                            opacity: i.removed === true ? 0.5 : 1,
                            fontSize: "18px",
                          }}
                        >
                          {language === "uz"
                            ? i?.name_uz
                            : language === "ru"
                            ? i?.name_ru
                            : i?.name_eng}
                        </span>
                        <span
                          className="basket__main-subtitle"
                          style={{
                            opacity: i.removed === true ? 0.5 : 1,
                            fontSize: "18px",
                          }}
                        >
                          {i.count} {t("sht")}
                        </span>
                      </div>
                      <div className="basket__main-button">
                        <div
                          className="basket__main-btn1"
                          style={{
                            opacity: i.removed === true ? 0.5 : 1,
                          }}
                        >
                          <button
                            className="increment"
                            onClick={() => handleDecrement(i.id)}
                            disabled={i.removed === true}
                            style={{
                              cursor:
                                i.removed === true ? "not-allowed" : "pointer",
                            }}
                          >
                            -
                          </button>
                          <span className="raqam">{i.count}</span>
                          <button
                            className="decrement"
                            onClick={() => handleIncrement(i.id)}
                            disabled={i.removed === true}
                            style={{
                              cursor:
                                i.removed === true ? "not-allowed" : "pointer",
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "10px" }}>
                          {i.removed === true ? (
                            <button
                              className="Восстановить"
                              onClick={() => handleRestore(i.id)}
                            >
                              {t("Recovery")}
                            </button>
                          ) : (
                            <button
                              className="Удалить"
                              onClick={() => handleDelete(i.id)}
                            >
                              {t("delete")}
                            </button>
                          )}
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
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
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default BasketCount;
