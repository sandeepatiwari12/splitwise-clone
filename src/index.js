import React from "react";

import store from "./store";
import { Provider } from "react-redux";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Used CreateRoot instead of old ReactDom.render, since i've used react 18
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
