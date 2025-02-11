import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const local = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  const localUser = localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId"))
    : null;

  const [token, setToken] = useState(local);
  const [isAuth, setIsAuth] = useState([]);
  const [users, setLocalUsers] = useState(localUser);

  const setUserToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const setUserData = (data) => {
    localStorage.setItem("userId", JSON.stringify(data));
    setLocalUsers(data);
  };

  const addUser = (data) => {
    setUserData(data);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        setUserToken,
        setLocalUsers,
        users,
        setUserData,
        addUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
