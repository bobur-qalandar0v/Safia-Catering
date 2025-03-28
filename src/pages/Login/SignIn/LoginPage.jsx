import { Button, Checkbox, Form, Input, InputNumber, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { API } from "../../../api";
import { urls } from "../../../constants/urls";
import InputTel from "./InputTel";

function LoginPage() {
  const [form] = Form.useForm();

  const [isSmsSend, setIsSmsSend] = useState(false);

  const { setUserToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const getSmsCode = () => {
    const phone = form.getFieldValue("tel");

    if (!phone) {
      message.warning("Telefon raqamingizni kiriting!");
      return;
    } else {
      setIsSmsSend(true);
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 12) {
      message.warning("Telefon raqamingizni to'liq kiriting!");
      return;
    }

    if (phone && cleanPhone.length === 12) {
      message.success("Sms kod muvaffaqiyatli yuborildi");
    }
  };

  const postLogin = (data) => {
    navigate("/");
    // API.post(`${urls.auth.login}`, data)
    //   .then((res) => {
    //     if (res.status == 201) {
    //       navigate("/");
    //       message.open({ type: "success", content: "Вход успешен" });
    //       setUserToken(res.data.token);
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response.data.error === "Unauthorized") {
    //       message.error("Имя пользователя или пароль неверны");
    //     }
    //   });
  };

  const onFinish = (data) => {
    // postLogin(data);
    localStorage.setItem("tel", JSON.stringify(data));
    navigate("/");
    message.success("Kirish muvoffaqiyatli bajarildi");
  };

  return (
    <div className="container">
      <div className="login-page">
        <marquee behavior="" direction="">
          Hozirda saytni backend qismi yo'q
        </marquee>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="login-page__wrap"
        >
          <div className="form__wrap">
            <div className="login-page__logo">
              <img src="/Logo.png" alt="Logo" />
            </div>
            <div className="login-page__inputs">
              <Form.Item
                name="tel"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <InputTel />
              </Form.Item>
              {/* <div className="input__sms-wrap">
                <Form.Item
                  className="input__sms-item"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Input
                    className="input__sms"
                    type="number"
                    placeholder="0000"
                    disabled={!isSmsSend}
                  />
                </Form.Item>
                <Button onClick={getSmsCode}>Получить СМС код</Button>
              </div> */}
            </div>
          </div>
          <div className="next__button-wrap">
            <Form.Item>
              <Button htmlType="submit" className="next__button-item">
                Войти
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
