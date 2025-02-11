import { useContext } from "react";
import { LangContext } from "../context/LanguageContext";
import { translateData } from "../utils/translateData";

function useLanguage() {
  const { language } = useContext(LangContext);

  const res = (key) => {
    return translateData[key][language];
  };

  return { t: res };
}

export default useLanguage;
