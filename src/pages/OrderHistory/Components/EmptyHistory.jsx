import React from "react";
import useLanguage from "../../../hooks/useLanguage";

function EmptyHistory() {
  const { t } = useLanguage();
  return (
    <div className="history__empty">
      <div className="history__item">
        <div className="history__logo">
          <img src="/Logo.png" alt="Logo" />
        </div>
        <div className="history__empty-title">
          <h2>{t("emptyOrder")}</h2>
        </div>
      </div>
    </div>
  );
}

export default EmptyHistory;
