import { createContext, useState } from "react";

export const BasketContext = createContext(null);

export function BasketProvider({ children }) {
  let localeInitatial = localStorage.getItem("basketCount")
    ? JSON.parse(localStorage.getItem("basketCount"))
    : [];

  let localeBasket = localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket"))
    : [];

  let localeOrderHistory = localStorage.getItem("order_history")
    ? JSON.parse(localStorage.getItem("order_history"))
    : [];

  const getLocaleItem = JSON.parse(localStorage.getItem("selectedCard"));

  const [selectedCard, setSelectedCard] = useState(getLocaleItem);
  const [card, setCard] = useState(localeInitatial);
  const [basket, setBasket] = useState(localeBasket);
  const [orderHistory, setOrderHistory] = useState(localeOrderHistory);

  function setLocaleCart(data) {
    localStorage.setItem("basketCount", JSON.stringify(data));
    setCard(data);
  }

  //////////////////////////
  // BASKET FUNCTIONS

  function setLocaleOrderHistory(data) {
    localStorage.setItem("order_history", JSON.stringify(data));
    setOrderHistory(data);
  }

  function setLocaleBasket(data) {
    localStorage.setItem("basket", JSON.stringify(data));
    setBasket(data);
  }

  const addItemToBasket = (data) => {
    setLocaleBasket([...basket, { ...data, qty: 1 }]);
    // setLocaleOrderHistory([...orderHistory, data]);
  };

  const addToOrderHistory = (data) => {
    setLocaleOrderHistory(
      orderHistory.map((item) => ({
        ...item,
        data,
      }))
    );
    // basket.map((item) => ({
    //   ...item,
    //   date: data.date,
    //   username: data.username,
    //   promacode: data.promacode,
    //   tel: data.tel,
    // }))
    console.log(data);
  };

  const increment = (id) => {
    setLocaleBasket(
      basket.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setLocaleBasket(
      basket.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty === 1 ? 1 : item.qty - 1 }
          : item
      )
    );
  };

  const deleteBasket = (id) => {
    const updateBasket = basket.filter((item) => item.id !== id);
    setLocaleBasket(updateBasket);
  };

  ////////////////////////
  // BASKET_COUNT FUNCTIONS

  const addItemToCart = (data) => {
    setLocaleCart([...data]);
  };

  function incrementItem(id) {
    setLocaleCart(
      card.map((item) => {
        return {
          ...item,
          items: item?.items?.map((i) =>
            i?.id === id ? { ...i, count: i.count + 1 } : i
          ),
        };
      })
    );
  }

  function decrementItem(id) {
    setLocaleCart(
      card.map((item) => {
        return {
          ...item,
          items: item?.items?.map((i) =>
            i?.id === id ? { ...i, count: i.count > 1 ? i.count - 1 : 1 } : i
          ),
        };
      })
    );
  }

  function deleteItem(id) {
    setLocaleCart(
      card.map((item) => {
        return {
          ...item,
          items: item?.items?.map((i) =>
            i?.id === id ? { ...i, removed: true } : i
          ),
        };
      })
    );
  }

  function restoreItem(id) {
    setLocaleCart(
      card.map((item) => {
        return {
          ...item,
          items: item?.items?.map((i) =>
            i?.id === id ? { ...i, removed: false } : i
          ),
        };
      })
    );
  }

  function deleteAllItems(id) {
    setLocaleCart(
      card.map((item) => {
        if (item?.id === id) {
          return {
            ...item,
            items: item?.items?.map((i) => ({
              ...i,
              removed: true,
            })),
          };
        }
        return item;
      })
    );
  }

  function restoreAllItems(id) {
    setLocaleCart(
      card.map((item) => {
        if (item?.id === id) {
          return {
            ...item,
            items: item?.items?.map((i) => ({
              ...i,
              removed: false,
            })),
          };
        }
        return item;
      })
    );
  }
  return (
    <BasketContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        card,
        setCard,
        basket,
        setBasket,
        orderHistory,
        setOrderHistory,
        setLocaleOrderHistory,
        addToOrderHistory,
        increment,
        decrement,
        deleteBasket,
        incrementItem,
        decrementItem,
        addItemToCart,
        addItemToBasket,
        deleteItem,
        restoreItem,
        deleteAllItems,
        restoreAllItems,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
