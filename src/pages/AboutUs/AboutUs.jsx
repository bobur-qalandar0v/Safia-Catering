import React from "react";
import useLanguage from "../../hooks/useLanguage";

function AboutUs() {
  const { t } = useLanguage();
  return (
    <div className="aboutUs-page">
      <div className="container">
        <div className="aboutUs-page__wrap">
          <div className="aboutUs-page__title">
            <h2>{t("aboutUs")}</h2>
          </div>
          <div className="aboutUs-page__main">
            <div className="aboutUs-page__img">
              <img className="aboutUs-page__logo" src="/Logo.png" alt="Logo" />
              <img className="aboutUs-page__set" src="/AboutUs.png" alt="img" />
            </div>
            <div className="aboutUs-page__content">
              <p>{t("Aboutus")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
