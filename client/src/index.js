import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import reducers from "./reducers";
import App from "./components/App";
import axios from "axios";
window.axios = axios;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
