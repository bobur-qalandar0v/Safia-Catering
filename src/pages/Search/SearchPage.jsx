import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import { API } from "../../api";
import { urls } from "../../constants/urls";
import { LangContext } from "../../context/LanguageContext";
import useLanguage from "../../hooks/useLanguage";
import { Link } from "react-router-dom";
import { BasketContext } from "../../context/basketContext";

function SearchPage() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { addItemToCart } = useContext(BasketContext);

  const { language } = useContext(LangContext);

  const { t } = useLanguage();

  const handleClick = (data, id) => {
    addItemToCart(data);
    localStorage.setItem("cardId", id);
  };

  // const handleSearchClick = () => {
  //   const filterBySearch = products.filter((item) => {
  //     if (
  //       language == "ru"
  //         ? item?.name_ru
  //             ?.toLowerCase()
  //             ?.includes(searchValue?.toLocaleLowerCase())
  //         : language == "uz"
  //         ? item?.name_uz
  //             ?.toLowerCase()
  //             ?.includes(searchValue?.toLocaleLowerCase())
  //         : item?.name_eng
  //             ?.toLowerCase()
  //             ?.includes(searchValue?.toLocaleLowerCase())
  //     ) {
  //       return item;
  //     }
  //   });
  //   setProducts(filterBySearch);
  // };

  useEffect(() => {
    API.get(urls.sets.get)
      .then((res) => {
        setOriginalProducts(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setProducts(originalProducts);
    } else {
      const filteredResults = originalProducts.filter((item) => {
        const name =
          language == "uz"
            ? item?.name_uz
            : language == "ru"
            ? item.name_ru
            : item.name_eng;

        const price = item?.price;
        return name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setProducts(filteredResults);
    }
  }, [searchValue, originalProducts, language]);

  return (
    <div className="container">
      <div className="search__page">
        <div className="search__page-wrap">
          <div className="search__page-content">
            <div className="search__page-input">
              <span>
                <SearchIcon />
              </span>
              <input
                className="input"
                placeholder="Поиск"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </div>
            <div className="set__wrap">
              <div className="set__items">
                <h2>{t("qidiruv_natija")}</h2>
                {products.length > 0 ? (
                  products.map((item) => {
                    return (
                      <div className="card" key={item.id}>
                        <div className="card__top">
                          <div className="card__top-left">
                            <img
                              className="card__top-left_img"
                              src={item.image}
                              alt="set_img"
                            />
                          </div>
                          <div className="card__top-right">
                            <span className="card__top-right_text">
                              {language == "uz"
                                ? item?.title_uz
                                : language == "ru"
                                ? item.title_ru
                                : item.title_eng}
                            </span>
                            <div className="card__top-right_image">
                              <img className="img" src="/Star.png" alt="Star" />
                              <img className="img" src="/Star.png" alt="Star" />
                              <img className="img" src="/Star.png" alt="Star" />
                              <img className="img" src="/Star.png" alt="Star" />
                              <img className="img" src="/Star.png" alt="Star" />
                            </div>
                          </div>
                        </div>
                        <div className="card__bottom">
                          <h4 className="card__bottom-title">
                            {language == "uz"
                              ? item.name_uz
                              : language == "ru"
                              ? item.name_ru
                              : item.name_eng}
                          </h4>
                          <div className="card__bottom_all">
                            <span className="card__bottom_price">
                              {item?.price?.toLocaleString()} {t("sum")}
                            </span>
                            <Link to={`/order_itempage/${item.id}`}>
                              <button
                                className="card__bottom_button"
                                onClick={() => handleClick(item.foods, item.id)}
                              >
                                {t("podborne")}
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="search__page-empty">
                    <img
                      className="search__page-img"
                      src="/Logo.png"
                      alt="Logo"
                    />
                    <div className="search__page-empty_text">
                      <h3>{t("topilmadi")}</h3>
                      <p>{t("sorov")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
