import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { UserProvider } from "./context/UserContext";
import { NextUIProvider,createTheme } from '@nextui-org/react';
import store from './redux/store';
import { Provider } from 'react-redux';
const darkTheme = createTheme({
  type: 'dark',
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <UserProvider>
  <BrowserRouter>
    <NextUIProvider theme={darkTheme}>
    <App />
    </NextUIProvider>
  </BrowserRouter>,
  </UserProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
