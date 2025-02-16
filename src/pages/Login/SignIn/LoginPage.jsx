import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { API } from "../../../api";
import { urls } from "../../../constants/urls";

function LoginPage() {
  const { setUserToken, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const postLogin = (data) => {
    API.post(`${urls.auth.login}`, data)
      .then((res) => {
        if (res.status == 201) {
          message.open({ type: "success", content: "Вход успешен" });
          setUserToken(res.data.token);
          navigate("/home");
        }
      })
      .catch((err) => {
        if (err.response.data.error === "Unauthorized") {
          message.error("Имя пользователя или пароль неверны");
        }
      });
  };

  const onFinish = (data) => {
    postLogin(data);
  };

  useEffect(() => {
    if (token) {
      navigate("/userdata");
    }
  }, [token]);

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
                    message: "Please input your username!",
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
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  className="input__password"
                  type="password"
                  placeholder="Пароль"
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
