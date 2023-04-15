import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import store from "./redux/store";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundaries/Error";
const darkTheme = createTheme({
  type: "dark",
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>

  <Provider store={store}>
    <BrowserRouter>
        <NextUIProvider theme={darkTheme}>
          <App />
        </NextUIProvider>
    </BrowserRouter>
  </Provider>
  </ErrorBoundary>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
