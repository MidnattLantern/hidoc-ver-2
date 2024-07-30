import React from "react";
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/currentUserContext";

const NavBar = () => {
const currentUser = useCurrentUser();

    const nonAuthenticatedOptions = <>
        <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/signin">Sign in</NavLink>
        <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/signup">Sign up</NavLink>
    </>

    const authenticatedOptions = <>
        <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/signout">Sign out</NavLink>
    </>

    return ( <>
        <Nav>
            <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/"><i className="fas fa-home" /> Home</NavLink>
            {nonAuthenticatedOptions}
            {authenticatedOptions}
            <p>user: {currentUser?.username}</p>
        </Nav>
        </> )
};

export default NavBar;
