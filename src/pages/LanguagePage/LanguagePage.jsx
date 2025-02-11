import React, { useContext, useState } from "react";
import { LangContext } from "../../context/LanguageContext";
import useLanguage from "../../hooks/useLanguage";
function LanguagePage() {
  const { language, setLanguage } = useContext(LangContext);

  const { t } = useLanguage();

  const handleChange = (e) => {
    localStorage.setItem("lang", e.target.value);
    setLanguage(e.target.value);
  };
  return (
    <div className="langauge__page">
      <div className="container">
        <h2 className="language__page-title">{t("Language")}</h2>
        <form className="language__page-form">
          <label className="form__label">
            <input
              className="radio"
              type="radio"
              name="language"
              value="uz"
              checked={language === "uz"}
              onChange={(e) => handleChange(e)}
            />
            O'zbekcha
          </label>
          <label className="form__label">
            <input
              type="radio"
              name="language"
              value="ru"
              checked={language === "ru"}
              onChange={(e) => handleChange(e)}
            />
            Русский
          </label>
          <label className="form__label">
            <input
              type="radio"
              name="language"
              value="eng"
              checked={language === "eng"}
              onChange={(e) => handleChange(e)}
            />
            English
          </label>
        </form>
      </div>
    </div>
  );
}

export default LanguagePage;
