import {
  BasketPage,
  LoginPage,
  AboutUs,
  BasketOrder,
  BasketCount,
  DashboardPage,
  LanguagePage,
  UserData,
  History,
  OrderButton,
  OrderButton2,
  OrderButton3,
  OrderButton3Item,
  OrderItemPage,
  PersonInformationPage,
  SearchPage,
  ToWorkPage,
} from "../pages";

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
  {
    id: 17,
    path: "/search",
    element: <SearchPage />,
  },
];
