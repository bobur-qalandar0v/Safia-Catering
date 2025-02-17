import React, { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import { useNavigate } from "react-router-dom";

function RestartPage() {
  const { setSelectedCard, setCard, setBasket, setOrderHistory } =
    useContext(BasketContext);

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    setBasket([]);
    setSelectedCard([]);
    setCard([]);
    setOrderHistory([]);
    navigate("/home");
    window.location.reload();
  };
  return (
    <div className="container">
      <div className="restart__page">
        <div className="restart__page-wrap">
          <h2 style={{textAlign: "center"}}>Serverda nosozlik! Iltimos hammasini boshidan boshlang 👇</h2>
          <button className="global__btn restart" onClick={handleClick}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestartPage;
