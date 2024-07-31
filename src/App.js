import React, { useContext } from "react";
import styles from "./App.module.css";
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./pages/authentication/SignUpForm";
import SignInForm from "./pages/authentication/SignInForm";
import SignOutPage from "./pages/authentication/SignOutPage";
import HomePage from "./pages/home_page/HomePage";
import DisplayWindowTooShort from "./pages/diverse/displayWindowTooShort";
import './api/axiosDefaults';
import { ResponsiveWindowContext } from "./contexts/responsiveWindowContext";


function App() {
  const { windowTooShort } = useContext(ResponsiveWindowContext);

  return (
      <div className={styles.AppContainer}>
        {windowTooShort ? <DisplayWindowTooShort /> : <>
          <Switch>
              <Route exact path="/signin" render={() => <SignInForm /> } />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/signout" render={() => <SignOutPage />} />

              <Route exact path="/" render={() => <HomePage />} />
              <Route path="/" render={() => <h1>Page not found</h1>} />
            </Switch>
        <div>
            <NavBar/>
        </div>        
        </>}

      </div>
  )
};

export default App;
