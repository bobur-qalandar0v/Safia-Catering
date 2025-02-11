import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { urls } from "../../../constants/urls";
import { AuthContext } from "../../../context/AuthContext";
import LoadingAnimate from "../../../assets/icons/LoadingAnimate";

function RegisterPage() {
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState(null);

  const { users, addUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const formatPhoneNumber = (value) => {
    let numbers = value.replace(/\D/g, "");

    if (numbers.startsWith("998")) {
      numbers = numbers.slice(3);
    }

    let formatted = numbers
      .slice(0, 9)
      .replace(/(\d{2})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4");

    return formatted;
  };

  const handleChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  // const getLoginData = () => {
  //   API.get(urls.auth.user).then((res) => console.log(res.data));
  // };

  const postLogin = (data) => {
    setLoading(false);
    API.post(`${urls.auth.user}`, data).then((res) => {
      if (res.status === 201) {
        addUser(res.data.id);
        message.open({
          type: "success",
          content: "Регистрация прошла успешно",
        });
        navigate("/login");
      } else {
        message.error("Регистрация не удалась");
      }
    });
  };

  const onFinish = (data) => {
    postLogin(data);
    addUser(data);
  };

  useEffect(() => {
    // getLoginData();
  }, []);

  if (!loading) {
    return (
      <div className="container">
        <div className="wrap">
          <LoadingAnimate />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="login-page">
        <Form
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
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите свое имя пользователя!",
                  },
                ]}
              >
                <Input className="input__name" placeholder="Ваше имя" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите свой пароль!",
                  },
                ]}
              >
                <Input.Password
                  className="input__password"
                  type="password"
                  placeholder="Пароль"
                />
              </Form.Item>
              <Form.Item
                name="tel"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите свой номер телефона!",
                  },
                  {
                    pattern: /^\d{9}$/,
                    message: "Номер телефона указан в неправильном формате",
                  },
                ]}
              >
                <Input
                  className="input__tel"
                  type="tel"
                  addonBefore="+998"
                  onChange={handleChange}
                  placeholder="__ __ __ __"
                  value={phone}
                />
              </Form.Item>
              <div className="checkbox__div">
                <Form.Item>
                  <Checkbox type="checkbox" />
                </Form.Item>
                <span>
                  Согласен с условиями Пользовательского соглашения и Политики
                  конфидециальности
                </span>
              </div>
            </div>
          </div>
          <div className="next__button-wrap">
            <Form.Item>
              <Button htmlType="submit" className="next__button-item">
                Зарегистрироваться
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
