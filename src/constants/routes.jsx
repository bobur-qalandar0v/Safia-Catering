import { BasketPage, LoginPage } from "../pages";
import AboutUs from "../pages/AboutUs/AboutUs";
import BasketOrder from "../pages/Basket/components/BasketOrder";
import BasketCount from "../pages/BasketCount/BasketCount";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import LanguagePage from "../pages/LanguagePage/LanguagePage";
import UserData from "../pages/Login/UserData/UserData";
import History from "../pages/OrderHistory";
import OrderButton from "../pages/OrderItem/OrderButton";
import OrderButton2 from "../pages/OrderItem/OrderButton2";
import OrderButton3 from "../pages/OrderItem/OrderButton3";
import OrderButton3Item from "../pages/OrderItem/OrderButton3Item";
import OrderItemPage from "../pages/OrderItem/OrderItemPage";
import PersonInformationPage from "../pages/PersonInformation/PersonInformationPage";
import ToWorkPage from "../pages/ToWork/ToWorkPage";

const getToken = localStorage.getItem("token");

export const routes = [
  {
    id: 1,
    path: "/",
    element: <DashboardPage />,
  },
  {
    id: 2,
    path: "/basket",
    element: <BasketPage />,
  },
  {
    id: 3,
    path: "/userdata",
    element: <UserData />,
  },
  {
    id: 4,
    path: "/information",
    element: <PersonInformationPage />,
  },
  {
    id: 5,
    path: "/aboutUs",
    element: <AboutUs />,
  },
  {
    id: 6,
    path: "/towork",
    element: <ToWorkPage />,
  },
  {
    id: 7,
    path: "/order_itempage/:id",
    element: <OrderItemPage />,
  },
  {
    id: 8,
    path: "/basket_count",
    element: <BasketCount />,
  },
  {
    id: 9,
    path: "/order",
    element: <OrderButton />,
  },
  {
    id: 10,
    path: "/order2",
    element: <OrderButton2 />,
  },
  {
    id: 11,
    path: "/order3",
    element: <OrderButton3 />,
  },
  {
    id: 12,
    path: "/order3-item",
    element: <OrderButton3Item />,
  },
  {
    id: 13,
    path: "/language",
    element: <LanguagePage />,
  },
  {
    id: 14,
    path: "/order_history",
    element: <History />,
  },
  {
    id: 15,
    path: "/basket_order",
    element: <BasketOrder />,
  },
  {
    id: 16,
    path: "/login",
    element: <LoginPage />,
  },
];
