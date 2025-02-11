import React, { useContext } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import UserIcon from "../../../assets/icons/UserIcon";
import NextIcon from "../../../assets/icons/NextIcon";
import PromacodeIcon from "../../../assets/icons/PromacodeIcon";
import HistoryOrderIcon from "../../../assets/icons/HistoryOrderIcon";
import AboutUseIcon from "../../../assets/icons/AboutUsIcon";
import LanguageIcon from "../../../assets/icons/LanguageIcon";
import ToWorkIcon from "../../../assets/icons/ToWorkIcon";
import PublicOfferIcon from "../../../assets/icons/PublicOfferIcon";
import useLanguage from "../../../hooks/useLanguage";
import { AuthContext } from "../../../context/AuthContext";

function UserData() {
  const { t } = useLanguage();
  const { setToken } = useContext(AuthContext);

  const handleClick = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div className="container">
      <div className="userdata">
        <div className="userdata__page">
          <div className="userdata__wrap">
            <Link to="/information" className="person__information">
              <div className="userdata__content">
                <UserIcon />
                {t("personalInformation")}
              </div>
              <span>
                <NextIcon />
              </span>
            </Link>

            <Link className="person__information">
              <div className="userdata__content">
                <PromacodeIcon />
                {t("MyPromoCodes")}
              </div>
              <span>
                <NextIcon />
              </span>
            </Link>

            <Link className="person__information" to="/order_history">
              <div className="userdata__content">
                <HistoryOrderIcon />
                {t("OrderHistory")}
              </div>
              <span>
                <NextIcon />
              </span>
            </Link>

            <Link className="person__information" to="/aboutUs">
              <div className="userdata__content">
                <AboutUseIcon />
                {t("aboutUs")}
              </div>
              <span>
                <NextIcon />
              </span>
            </Link>

            <Link className="person__information" to="/language">
              <div className="userdata__content">
                <LanguageIcon />
                {t("Language")}
              </div>
              <span>
                <NextIcon />
              </span>
            </Link>

            <Link className="person__information" to="/towork">
              <div className="userdata__content">
                <ToWorkIcon />
                {t("IWantToWork")}
              </div>
              <span>
                <NextIcon />
              </span>
            </Link>

            <Link className="person__information-last">
              <div className="userdata__content">
                <PublicOfferIcon />
                {t("PublicOffering")}
              </div>
              <span>
                <NextIcon />
              </span>
            </Link>
          </div>
          <Link className="global__btn add" to="/login" onClick={handleClick}>
            {t("exit")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserData;
