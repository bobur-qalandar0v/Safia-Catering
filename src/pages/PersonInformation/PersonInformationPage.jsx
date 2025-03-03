import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { API } from "../../api";
import { urls } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import LoadingAniamte from "../../assets/icons/LoadingAnimate";
import useLanguage from "../../hooks/useLanguage";
// import FloatingInputLabel from "./FloatingIinputLabel";

function PersonInformationPage() {
  const [form] = Form.useForm();
  const storedId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);

  const { t } = useLanguage();

  const navigate = useNavigate();

  const getUserData = async () => {
    const { data } = await API.get(`${urls.auth.user}/${storedId}`);
    setUserData(data);
  };

  const handleSave = (values) => {
    API.patch(urls.user.edit(storedId), values).then((res) => {
      if (res.status === 200) {
        message.open({ type: "success", content: "Изменено успешно" });
        navigate("/userdata");
      }
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue(userData);
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="container">
        <div className="wrap">
          <LoadingAniamte />
        </div>
      </div>
    );
  }

  return (
    <div className="person-page">
      <div className="container">
        <div className="person-page__wrap">
          <div className="person-page__title">
            <h2>{t("personalInformation")}</h2>
          </div>
          <Form
            form={form}
            className="person-page__inputs"
            onFinish={handleSave}
          >
            <div className="person-page__form-wrap">
              <div className="form-item__wrap">
                <span className="form__span-tel">{t("Number")}</span>
                <p className="person-page__tel">
                  +998 {userData?.tel.slice(0, 2)} {userData?.tel.slice(2, 5)}{" "}
                  {userData?.tel.slice(5, 7)} {userData?.tel.slice(7, 9)}
                </p>
              </div>
              <div className="form-item__wrap add">
                <span className="form__span-name">{t("yourName")}</span>
                <Form.Item
                  className="person-page__form"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: `${t("message")}`,
                    },
                  ]}
                >
                  <Input type="text" className="input__name" />
                </Form.Item>
              </div>
              <div className="form-item__wrap">
                <span className="form__span-surname">{t("yourSurname")}</span>
                <Form.Item
                  name="surname"
                  className="person-page__form"
                  rules={[
                    {
                      required: true,
                      message: `${t("message")}`,
                    },
                  ]}
                >
                  <Input type="text" className="input__surname" />
                </Form.Item>
              </div>
              <div className="save__button-wrap">
                <Form.Item>
                  <Button className="save__button-item" htmlType="submit">
                    {t("Save")}
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PersonInformationPage;
