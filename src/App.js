import React, { createContext, useEffect, useState } from "react";
import styles from "./App.module.css";
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./pages/authentication/SignUpForm";
import SignInForm from "./pages/authentication/SignInForm";
import SignOutPage from "./pages/authentication/SignOutPage";
import HomePage from "./pages/home_page/HomePage";
import './api/axiosDefaults';
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/')
      setCurrentUser(data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleMount()
  }, []);

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>

      <div className={styles.MainViewPosition}>
        <div className={styles.MainViewContainer}>
          <Switch>
            <Route exact path="/signin" render={() => <SignInForm /> } />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/signout" render={() => <SignOutPage />} />

            <Route exact path="/" render={() => <HomePage />} />
            <Route path="/" render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
        </div>

      <div className={styles.NavBarPosition}>
        <div className={styles.NavBarContainer}>
          <NavBar/>
        </div>
      </div>

        </SetCurrentUserContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  )
};

export default App;
