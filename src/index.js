import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/modern-normalize/modern-normalize.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./mainstyle/theme";
import { App } from "./components/App";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
			<ToastContainer position="top-center" autoClose={3000} />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
