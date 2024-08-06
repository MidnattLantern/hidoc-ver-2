import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import { CurrentUserProvider } from './contexts/currentUserContext';
import { ResponsiveWindowProvider } from "./contexts/responsiveWindowContext";
import { AccountDataProvider } from './contexts/AccountDataContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CurrentUserProvider>
        <AccountDataProvider>
          <ResponsiveWindowProvider>
            <App />
          </ResponsiveWindowProvider>
        </AccountDataProvider>
      </CurrentUserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
