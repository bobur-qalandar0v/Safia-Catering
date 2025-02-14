import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { API } from "../../api";
import { urls } from "../../constants/urls";
import LoadingAnimate from "../../assets/icons/LoadingAnimate";
import { BasketContext } from "../../context/basketContext";
import { LangContext } from "../../context/LanguageContext";
import useLanguage from "../../hooks/useLanguage";

function DashboardPage() {
  const [food, setFood] = useState([]);
  const [loading, setLoadiing] = useState(true);

  const { addItemToCart } = useContext(BasketContext);
  const { language } = useContext(LangContext);

  const { t } = useLanguage();

  const getFood = () => {
    API.get(urls.sets.get).then((res) => {
      setFood(res.data);
      setLoadiing(false);
    });
  };

  const handleClick = (data, id) => {
    addItemToCart(data);
    localStorage.setItem("cardId", id);
  };

  useEffect(() => {
    getFood();
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
    <div className="container">
      <div className="dashboard__page">
        <div className="swiper__wrap">
          <Swiper
            style={{
              width: "100%",
              padding: "15px 0px",
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {food.map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  style={{
                    borderTopRightRadius: "35px",
                    borderBottomLeftRadius: "35px",
                  }}
                  src={item.image}
                  alt="img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="food__wrap">
          <h2>{t("sets")}</h2>
          {food.map((item) => (
            <div className="card" key={item.id}>
              <div className="card__top">
                <div className="card__top-left">
                  <img
                    className="card__top-left_image"
                    src={item.image}
                    alt="set_img"
                  />
                </div>
                <div className="card__top-right">
                  <span className="card__top-right_text">
                    {language == "uz"
                      ? item.title_uz
                      : language == "ru"
                      ? item.title_ru
                      : item.title_eng}
                  </span>
                  <div className="card__top-right_image">
                    <img className="img" src="/Star.png" alt="Start" />
                    <img className="img" src="/Star.png" alt="Star" />
                    <img className="img" src="/Star.png" alt="Star" />
                    <img className="img" src="/Star.png" alt="Star" />
                    <img className="img" src="/Star.png" alt="Star" />
                  </div>
                </div>
              </div>
              <div className="card__bottom">
                <h4 className="card__bottom-title">
                  {language == "uz"
                    ? item.name_uz
                    : language == "ru"
                    ? item.name_ru
                    : item.name_eng}
                </h4>
                <div className="card__bottom_all">
                  <span className="card__bottom_price">
                    {item?.price?.toLocaleString()} {t("sum")}
                  </span>
                  <Link to={`/order_itempage/${item.id}`}>
                    <button
                      className="card__bottom_button"
                      onClick={() => handleClick(item.foods, item.id)}
                    >
                      {t("podborne")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className="div">
            <Link to="/order" className="global__btn">
              {t("order")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
