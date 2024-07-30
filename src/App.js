import React from "react";
import styles from "./App.module.css";
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./pages/authentication/SignUpForm";
import SignInForm from "./pages/authentication/SignInForm";
import SignOutPage from "./pages/authentication/SignOutPage";
import HomePage from "./pages/home_page/HomePage";
import HomePageAlt from "./pages/home_page/HomePageAlt";
import './api/axiosDefaults';
import { ResponsiveWindowProvider } from "./contexts/responsiveWindowContext";

function App() {

  return (
    <ResponsiveWindowProvider>
      <div>
        <div className={styles.MainViewPosition}>
          <div className={styles.MainViewContainer}>
            <Switch>
              <Route exact path="/signin" render={() => <SignInForm /> } />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/signout" render={() => <SignOutPage />} />

              <Route exact path="/" render={() => <HomePageAlt />} />
              <Route path="/" render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </div>
        <div className={styles.NavBarPosition}>
          <div className={styles.NavBarContainer}>
            <NavBar/>
          </div>
        </div>
      </div>
    </ResponsiveWindowProvider>
  )
};

export default App;
