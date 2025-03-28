import React, { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../../context/basketContext";
import { Button, DatePicker, Form, Input } from "antd";
import DateIcon from "../../../assets/icons/DateIcon";
import PromacodeIcon from "../../../assets/icons/PromacodeIcon";
import { useForm } from "antd/es/form/Form";
import { API } from "../../../api";
import { urls } from "../../../constants/urls";
import LoadingAnimate from "../../../assets/icons/LoadingAnimate";
import { LangContext } from "../../../context/LanguageContext";
import useLanguage from "../../../hooks/useLanguage";
import { useNavigate } from "react-router-dom";

function BasketCart() {
  const [form] = useForm();
  const storedId = localStorage.getItem("userId");
  const userData = JSON.parse(localStorage.getItem("tel"));
  // const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const { language } = useContext(LangContext);
  const { t } = useLanguage();

  const {
    basket,
    setBasket,
    increment,
    decrement,
    deleteBasket,
    setLocaleOrderHistory,
  } = useContext(BasketContext);

  const handleIncrementBasket = (id) => {
    increment(id);
  };

  const handleDecrementBasket = (id) => {
    decrement(id);
  };

  const handleDeleteItem = (id) => {
    deleteBasket(id);
  };

  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()}`;
  const formattedTime = `${now.toLocaleTimeString()}`;

  const handleSave = (values) => {
    const existingOrders =
      JSON.parse(localStorage.getItem("order_history")) || [];

    const lastOrderId =
      existingOrders.length > 0
        ? Math.max(...existingOrders.map((order) => order.order_id))
        : 0;

    const newOrderId = lastOrderId + 1;

    const newOrders = basket.map((item) => ({
      ...item,
      order_id: newOrderId,
      order_date: formattedDate,
      order_time: formattedTime,
      date: values.input_date,
    }));

    const updatedOrders = [...existingOrders, ...newOrders];

    localStorage.setItem("order_history", JSON.stringify(updatedOrders));
    setLocaleOrderHistory(updatedOrders);

    if (values?.input_date) {
      navigate("/basket_order");
    }

    if (location.pathname === "/basket_order") {
      setBasket([]);
    }
  };

  // const getUserData = async () => {
  //   const { data } = await API.get(`${urls.auth.user}/${storedId}`);
  //   setUserData(data);
  // };

  // useEffect(() => {
  //   getUserData();
  // }, []);

  // useEffect(() => {
  //   if (userData) {
  //     form.setFieldsValue(userData);
  //   }
  // }, [userData]);

  let sum = null;

  basket.map((item) => (sum += item.price * item.qty));

  if (!userData) {
    return (
      <div className="wrap">
        <LoadingAnimate />
      </div>
    );
  }

  return (
    <div className="order__page">
      <div className="order__page-wrap">
        <div className="order__page-title">
          <h3>{t("YourOrder")}</h3>
        </div>
        {basket.map((item) => (
          <div className="order__page-banner" key={item.id}>
            <div className="banner__wrap">
              <div className="banner__left">
                <img src={item.image} alt="img" />
              </div>
              <div className="banner__right">
                <div className="banner__title">
                  <p>
                    {language == "ru"
                      ? item.name_ru
                      : language == "uz"
                      ? item.name_uz
                      : item.name_eng}
                  </p>
                </div>
                <div className="banner__count">
                  <p>{t("OrderNumber")}</p>
                  <div>
                    <button onClick={() => handleDecrementBasket(item.id)}>
                      -
                    </button>
                    <p>{item.qty}</p>
                    <button onClick={() => handleIncrementBasket(item.id)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="banner__sum-and__btn">
                  <p>
                    {item?.price?.toLocaleString()} {t("sum")}
                  </p>
                  <button
                    className="banner__btn"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    {t("delete")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Form form={form} onFinish={handleSave}>
          <div className="birthday__input">
            <h3>{t("TheDate")}</h3>
            <span className="dateicon">
              <DateIcon />
            </span>
            <Form.Item
              className="form__item"
              name="input_date"
              rules={[
                {
                  required: true,
                  message: "пожалуйста, введите дату и время",
                },
              ]}
            >
              <DatePicker
                format="YY-MM-DD"
                className="datepicker"
                picker="date"
                placeholder={t("yil")}
              />
            </Form.Item>
          </div>

          <div className="enter__promakod">
            <h3>{t("EnterThePromoCode")}</h3>
            <span className="promacodeicon">
              <PromacodeIcon />
            </span>
            <Form.Item className="form__item" name="promacode">
              <Input placeholder={t("promacode")} />
            </Form.Item>
          </div>

          {/* <div className="personinformation__input">
            <h3>{t("YourDetails")}</h3>
            <div className="name__input">
              <span>{t("yourName")}</span>
              <Form.Item className="form__name" name="username">
                <Input
                  style={{ paddingTop: "20px", paddingLeft: "14px" }}
                  disabled
                />
              </Form.Item>
            </div>
            <div className="number__input">
              <span>{t("Number")}</span>
              <Form.Item className="form__tel" name="tel">
                <Input
                  addonBefore="+998"
                  style={{ paddingTop: "3px", width: "100%", height: "20px" }}
                  disabled
                />
              </Form.Item>
            </div>
          </div> */}
          <div className="order__btn-wrap">
            <div className="order__btn-promacode">
              <span>{t("promacode")}</span>
              <span>0 {t("sum")}</span>
            </div>
            <div className="order__btn-sum">
              <span>{t("FinalPrice")}</span>
              <span>
                {sum?.toLocaleString()} {t("sum")}
              </span>
            </div>
            <Form.Item className="order__btn-item">
              <Button className="order__button" htmlType="submit">
                {t("PlaceAnOrder")}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default BasketCart;
