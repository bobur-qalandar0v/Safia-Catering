import { Button, Form, Input, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { API } from "../../api";
import { urls } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import LoadingAniamte from "../../assets/icons/LoadingAnimate";
import { useCompactItemContext } from "antd/es/space/Compact";
import { LangContext } from "../../context/LanguageContext";
import useLanguage from "../../hooks/useLanguage";

function PersonInformationPage() {
  const [form] = Form.useForm();
  const storedId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);

  const { language } = useContext(LangContext);

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
            <div className="form-item__wrap">
              <span className="form__span">{t("yourName")}</span>
              <Form.Item
                className="person-page__form"
                name="username"
                rules={[
                  {
                    required: true,
                    // message: "Пожалуйста, введите свое имя пользователя!",
                    message: "",
                  },
                ]}
              >
                {/* <span className="form__span">Ваше имя</span> */}
                <Input type="text" className="input__name" />
              </Form.Item>
              <span className="form__span-tel">{t("Number")}</span>
              <Form.Item
                className="person-page__form-tel"
                name="tel"
                hasFeedback={false}
                validateTrigger="onSubmit"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                  {
                    pattern: /^\d{9}$/,
                    message: "",
                  },
                ]}
              >
                {/* <span className="form__span">Номер</span> */}
                <Input addonBefore="+998" className="input__tel" />
              </Form.Item>
            </div>
            <div className="save__button-wrap">
              <Form.Item>
                <Button className="save__button-item" htmlType="submit">
                  {t("Save")}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PersonInformationPage;
