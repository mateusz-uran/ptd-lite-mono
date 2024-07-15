import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store.js";
import { Provider } from "react-redux";
import "./i18n.js";
import { BrowserRouter } from "react-router-dom";
import UpdateCheckWrapper from "./features/updates/components/UpdateCheckWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <UpdateCheckWrapper>
          <App />
        </UpdateCheckWrapper>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
