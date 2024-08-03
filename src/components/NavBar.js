import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ResponsiveWindowContext } from "../contexts/responsiveWindowContext";
import { useCurrentUser } from "../contexts/currentUserContext";
// Styles
import Styles from '../styles/NavBar.module.css';
import "../global.css";

const NavBar = () => {
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const currentUser = useCurrentUser();

    const nonAuthenticatedOptions = <>
        <NavLink className={`
        ${Styles.NavBarButton} ${windowDimension === "phone" ? Styles.ButtonForPhone : Styles.ButtonForDesktop}
        `}
        exact activeClassName={Styles.Active} to="/signin/">
            Sign in
        </NavLink>

        <NavLink className={`
        ${Styles.NavBarButton} ${windowDimension === "phone" ? Styles.ButtonForPhone : Styles.ButtonForDesktop}
        `}
        exact activeClassName={Styles.Active} to="/signup/">
            Sign up
        </NavLink>

    </>

    const authenticatedOptions = <>

        <NavLink className={`
        ${Styles.NavBarButton} ${windowDimension === "phone" ? Styles.ButtonForPhone : Styles.ButtonForDesktop}
        `} exact activeClassName={Styles.Active} to={`/artist-page/${currentUser?.artaccount_id}`}>
            My Projects
        </NavLink>

        <NavLink className={`
        ${Styles.NavBarButton} ${windowDimension === "phone" ? Styles.ButtonForPhone : Styles.ButtonForDesktop}
        `} exact activeClassName={Styles.Active} to={`/watch-list/`}>
            Watch List
        </NavLink>

        <NavLink className={`
        ${Styles.NavBarButton} ${windowDimension === "phone" ? Styles.ButtonForPhone : Styles.ButtonForDesktop}
        `} exact activeClassName={Styles.Active} to="/signout/">
            Sign out
        </NavLink>

    </>

    return ( <>
        <div className={`
            ${Styles.NavBarContainer}
            ${ windowDimension === "phone" ? Styles.AlignForPhone : Styles.AlignForDesktop}
            `}>
            {windowDimension === "phone" ? null : <h1 className={Styles.Logo}>HiDoc</h1>}

            <NavLink className={`
            ${Styles.NavBarButton} ${windowDimension === "phone" ? Styles.ButtonForPhone : Styles.ButtonForDesktop}
            `}
            exact activeClassName={Styles.Active} to="/">
                Home
            </NavLink>

            <NavLink className={`
            ${Styles.NavBarButton} ${windowDimension === "phone" ? Styles.ButtonForPhone : Styles.ButtonForDesktop}
            `}
            exact activeClassName={Styles.Active} to="/project/browse/_">
                Browse
            </NavLink>

            <NavLink className={`
            ${Styles.NavBarButton} ${windowDimension === "phone" ? Styles.ButtonForPhone : Styles.ButtonForDesktop}
            `}
            exact activeClassName={Styles.Active} to="/pilot">
                Pilot
            </NavLink>

            {currentUser ? authenticatedOptions : nonAuthenticatedOptions}
        </div>
        </> )
};

export default NavBar;
