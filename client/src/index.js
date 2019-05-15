import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// Materialize css
import "materialize-css/dist/css/materialize.min.css";

import App from "./components/App";

// Reducers
import reducers from "./reducers";

// Redux store
const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
