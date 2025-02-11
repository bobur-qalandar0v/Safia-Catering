import { Popconfirm, message } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Request({ children }) {
  const navigate = useNavigate();
  const { users } = useContext(AuthContext);

  const handleCancel = () => {
    if (users === null) {
      message.open({
        type: "warning",
        content: "Вы должны сначала зарегистрироваться",
      });
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  const handleConfirm = () => {
    navigate("/register");
  };

  return (
    <Popconfirm
      placement="bottomRight"
      description="Зарегистрируйтесь или войдите"
      okText="Зарегистрироваться"
      cancelText="Войти"
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    >
      {children}
    </Popconfirm>
  );
}

export default Request;
