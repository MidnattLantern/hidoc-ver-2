import React, { useContext } from "react";
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./pages/authentication/SignUpForm";
import SignInForm from "./pages/authentication/SignInForm";
import SignOutPage from "./pages/authentication/SignOutPage";
import ProjectPage from "./pages/project_page/ProjectPage";
import HomePage from "./pages/home_page/HomePage";
import DisplayWindowTooShort from "./pages/diverse/displayWindowTooShort";
import './api/axiosDefaults';
import { ResponsiveWindowContext } from "./contexts/responsiveWindowContext";
// styles
import Styles from "./App.module.css";
import "./global.css";
// components
import AnimatedContainer from "./pages/pilot/AnimatedContainer";

function App() {
  const { windowDimension, windowTooShort } = useContext(ResponsiveWindowContext);

  return (
      <div className={`
      ${Styles.AppContainer}
      ${windowDimension === "phone" ? Styles.AlignForPhone : Styles.AlignForDesktop}
      `}>

        {windowTooShort ? <DisplayWindowTooShort /> : <>

          <div className={`
          ${Styles.NavBarContainer}
          ${windowDimension === "phone" ? Styles.NavBarForPhone: Styles.NavBarForDesktop}
            `}>
              <NavBar/>
          </div>
          <div className={Styles.MainViewContainer}>
            <Switch>
              <Route exact path="/signin" render={() => <SignInForm /> } />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/signout" render={() => <SignOutPage />} />

              <Route exact path="/project/browse" render={() => <ProjectPage />} />

              <Route exact path="/pilot" render={() => <AnimatedContainer /> } />

              <Route exact path="/" render={() => <HomePage />} />
              <Route path="/" render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>

        </>}
      </div>
  )
};

export default App;
