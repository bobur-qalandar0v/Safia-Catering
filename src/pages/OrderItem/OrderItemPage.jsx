import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../api";
import { urls } from "../../constants/urls";
import LoadingAnimate from "../../assets/icons/LoadingAnimate";
import { Collapse } from "antd";
import EditIcon from "../../assets/icons/EditIcon";
import { BasketContext } from "../../context/basketContext";
import { LangContext } from "../../context/LanguageContext";
import useLanguage from "../../hooks/useLanguage";

const { Panel } = Collapse;

function OrderItemPage() {
  const { addItemToBasket, setCard, basket } = useContext(BasketContext);
  const [zaqas, setZaqas] = useState([]);
  const [loading, setLoading] = useState(true);

  const { language } = useContext(LangContext);

  const { t } = useLanguage();

  const { id } = useParams();

  const navigate = useNavigate();

  const getProduct = () => {
    API.get(`${urls.sets.get}/${id}`).then((res) => {
      setZaqas(res.data);
      setLoading(false);
    });
  };

  const handleEdit = (data) => {
    localStorage.setItem("changedId", data.id);
    navigate("/basket_count");
  };

  const handleOrder = () => {
    addItemToBasket(zaqas);
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      localStorage.removeItem("basketCount");
      localStorage.removeItem("cardId");
      setCard([]);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setCard]);

  if (loading) {
    return (
      <div className="container">
        <div
          className="wrap"
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
    <div className="container">
      <div className="zaqas__item">
        <img src={zaqas?.image} alt="order_img" className="zaqas__item-img" />
        <span className="zaqas__item-position">
          {language == "uz"
            ? zaqas.title_uz
            : language == "ru"
            ? zaqas.title_ru
            : zaqas.title_eng}
        </span>
        <div className="zaqas__item-bottom">
          <h3>
            {language == "uz"
              ? zaqas.name_uz
              : language == "ru"
              ? zaqas.name_ru
              : zaqas.name_eng}
          </h3>
          <br />
          <div className="qwerty">
            <span className="zaqas__item-title">
              {zaqas?.price?.toLocaleString()} {t("sum")}
            </span>
            <div>
              <img className="img" src="/Star.png" alt="" />
              <img className="img" src="/Star.png" alt="" />
              <img className="img" src="/Star.png" alt="" />
              <img className="img" src="/Star.png" alt="" />
              <img className="img" src="/Star.png" alt="" />
            </div>
          </div>
        </div>
        <div className="select">
          <Collapse accordion>
            {zaqas?.foods?.map((category) => (
              <Panel
                header={
                  language === "uz"
                    ? category?.name_uz
                    : language === "ru"
                    ? category?.name_ru
                    : category?.name_eng
                }
                key={category.id}
              >
                <button
                  className="collapse__link"
                  onClick={() => handleEdit(category)}
                >
                  <EditIcon />
                  {t("Change")}
                </button>
                {category?.items?.map((item) => (
                  <div className="bottom" key={item.id}>
                    <div className="allq">
                      <p>
                        {language == "uz"
                          ? item?.name_uz
                          : language == "ru"
                          ? item?.name_ru
                          : item?.name_eng}
                      </p>
                      <span style={{ whiteSpace: "nowrap" }}>
                        {item.count} {t("sht")}
                      </span>
                    </div>
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>
        </div>
        <div className="bottom">
          <div className="bottom__item">
            <span>{t("Recount")}</span>
            <span>-200 000 {t("sum")}</span>
          </div>
          <div className="bottom__item">
            <span>{t("Pricing")}</span>
            <span>
              {zaqas?.price?.toLocaleString()} {t("sum")}
            </span>
          </div>
          <div className="bottom__item">
            <span className="bottom__item-text">{t("FinalPrice")}</span>
            <span className="bottom__item-summa">
              {(zaqas?.price - 200000)?.toLocaleString()} {t("sum")}
            </span>
          </div>
          {basket && basket.length == 0 ? (
            <button className="global__btn" onClick={handleOrder}>
              {t("AddToCart")}
            </button>
          ) : basket.some((item) => item.id === zaqas.id) ? (
            <Link
              style={{ textDecoration: "none", fontSize: "20px" }}
              to="/basket"
              className="global__btn"
            >
              {t("GoToCart")}
            </Link>
          ) : (
            <Link style={{ textDecoration: "none" }}>
              <button className="global__btn" onClick={handleOrder}>
                {t("AddToCart")}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderItemPage;
