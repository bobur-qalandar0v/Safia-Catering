import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/scss/main.scss";
import { BasketProvider } from "./context/basketContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LangProvider } from "./context/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <LangProvider>
    <AuthProvider>
      <BasketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BasketProvider>
    </AuthProvider>
  </LangProvider>
);
