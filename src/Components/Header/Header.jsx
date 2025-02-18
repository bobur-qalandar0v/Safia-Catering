import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import SearchIconActive from "../../assets/icons/SearchIconActive";
import LoginIcon from "../../assets/icons/LoginIcon";
import LoginIconActive from "../../assets/icons/LoginIconActive";
import BasketIcon from "../../assets/icons/BasketIcon";
import BasketIconActive from "../../assets/icons/BasketIconActive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BasketContext } from "../../context/basketContext";
import { AuthContext } from "../../context/AuthContext";

function HeaderPart() {
  const [activeButton, setActiveButton] = useState(null);

  const { basket, setSelectedCard } = useContext(BasketContext);
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();
  const Location = useLocation();

  const userId = localStorage.getItem("userId");

  const handleClick = () => {
    localStorage.removeItem("basketCount");
    localStorage.removeItem("changedId");
    localStorage.removeItem("cardId");
    localStorage.removeItem("selectedCard");
    setSelectedCard([]);
  };

  const handleButtonClick = (item) => {
    setActiveButton(item);
  };

  const toggleButton = (buttonId) => {
    setActiveButton((prev) => (prev === buttonId ? null : buttonId));
  };

  useEffect(() => {
    switch (Location.pathname) {
      case "/search":
        setActiveButton(1);
        break;
      case "/basket":
        setActiveButton(2);
        break;
      case "/register":
        setActiveButton(3);
        break;
      case "/userdata":
        setActiveButton(4);
        break;
      default:
        setActiveButton(null);
        break;
    }

    if (
      [
        "/information",
        "/aboutUs",
        "/towork",
        "/language",
        "/order_history",
      ].includes(Location.pathname)
    ) {
      setActiveButton(4);
    }
  }, [Location.pathname]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrap">
          <div className="header__left">
            <Link onClick={handleClick} to="/">
              <img className="header__logo" src="/Logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="header__right">
            <Link
              to="/search"
              className={`header__button ${activeButton === 1 ? "active" : ""}`}
              onClick={() => {
                handleButtonClick(1);
              }}
            >
              {activeButton === 1 ? <SearchIconActive /> : <SearchIcon />}
            </Link>
            <Link
              to={token && userId ? "/basket" : userId ? "/login" : "/register"}
              className={`header__button header__basket ${
                activeButton === 2 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(2)}
            >
              {activeButton === 2 ? <BasketIconActive /> : <BasketIcon />}
              <span
                className={`basket__count ${
                  activeButton === 2 && basket.length > 0
                    ? "activeButton"
                    : basket.length > 0
                    ? "active"
                    : ""
                }`}
              >
                {basket.length === 0 ? "" : basket.length}
              </span>
            </Link>
            {
              token ? (
                <button
                  className={`header__button ${
                    activeButton === 4 ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveButton(4);
                    navigate("/userdata");
                  }}
                >
                  {activeButton === 4 ? <LoginIconActive /> : <LoginIcon />}
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`header__button ${
                    activeButton === 3 ? "active" : ""
                  }`}
                >
                  {activeButton === 3 ? <LoginIconActive /> : <LoginIcon />}
                </Link>
              )
              // (
              //   <Request>
              //     <button
              //       className={`header__button ${
              //         activeButton === 3 ? "active" : ""
              //       }`}
              //       onClick={() => {
              //         toggleButton(3);
              //       }}
              //     >
              //       {activeButton === 3 ? <LoginIconActive /> : <LoginIcon />}
              //     </button>
              //   </Request>
              // )
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderPart;
