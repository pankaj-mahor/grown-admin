import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import "./main.scss";
import { store } from "./store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<React.StrictMode>
			<Provider store={store}>
				<App />
				<ToastContainer position="top-center" />
			</Provider>
		</React.StrictMode>
	</React.StrictMode>
);
