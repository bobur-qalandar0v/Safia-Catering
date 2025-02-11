import React from "react";
import useLanguage from "../../hooks/useLanguage";

function ToWorkPage() {
  const { t } = useLanguage();
  return (
    <div className="towork-page">
      <div className="container">
        <div className="towork-page__wrap">
          <div className="towork-page__title">
            <h2>{t("IWantToWork")}</h2>
          </div>
          <div className="towork-page__main">
            <div className="towork-page__img">
              <img className="towork-page__logo" src="/Logo.png" alt="Logo" />
              <img className="towork-page__set" src="/AboutUs.png" alt="img" />
            </div>
            <div className="towork-page__content">
              <div className="join-team">
                <h3 className="join-team__title">{t("JoinTheTeam")}</h3>
                <p className="join-team__content">{t("faol")}</p>
              </div>
              <div className="we-looking-for">
                <h3 className="we-looking-for__title">{t("looking")}</h3>
                <ul className="towork-page__ul">
                  <li>{t("qas")}</li>
                  <li>{t("fgh")}</li>
                  <li>{t("dfgj")}</li>
                </ul>
              </div>
              <div className="we-offer">
                <h3 className="we-offer__title">{t("taklif")}</h3>
                <ul className="towork-page__ul">
                  <li>{t("l1")}</li>
                  <li>{t("l2")}</li>
                  <li>{t("l3")}</li>
                  <li>"{t("l4")}"</li>
                  <li>{t("l5")}</li>
                </ul>
              </div>
              <div className="last">
                <h3 className="last__title">{t("birQismi")}</h3>
                <ul>
                  <li>{t("silka")}</li>
                  <li>https://mssg.me/safiacatering/recruit</li>
                  <li>{t("boldim")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToWorkPage;
