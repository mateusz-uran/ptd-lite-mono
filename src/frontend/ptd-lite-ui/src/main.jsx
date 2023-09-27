import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store.js";
import { Provider } from "react-redux";
import Auth0Wrapper from "./features/auth/Auth0Wrapper.jsx";
import "./i18n.js";
import Auth0ProviderWithNavigate from "./Auth0ProviderWithNavigate.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <React.StrictMode>
        <Provider store={store}>
          <Auth0Wrapper>
            <App />
          </Auth0Wrapper>
        </Provider>
      </React.StrictMode>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);
