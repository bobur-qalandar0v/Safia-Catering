import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "../../constants/routes";
import { LoginPage, RegisterPage } from "../../pages";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import HeaderPart from "../Header/Header";

function Main() {
  const location = useLocation();
  const { token, setToken } = useContext(AuthContext);

  const isAuthPage =
    location.pathname === "/register" || location.pathname === "/login";

  if (token && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const hnadleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", hnadleStorageChange);

    return () => {
      window.removeEventListener("storage", hnadleStorageChange);
    };
  }, []);

  return isAuthPage ? (
    location.pathname === "/register" ? (
      <RegisterPage />
    ) : (
      <LoginPage />
    )
  ) : (
    <>
      <HeaderPart />
      <main className="main">
        <Routes>
          {routes.map((item) => (
            <Route path={item.path} element={item.element} key={item.id} />
          ))}
        </Routes>
      </main>
    </>
  );
}

export default Main;
