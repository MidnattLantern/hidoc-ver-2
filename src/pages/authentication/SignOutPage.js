import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/currentUserContext";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
// styles
import Styles from "../../styles/SignOutPage.module.css";
import "../../global.css";

const SignOutPage = () => {
    const setCurrentUser = useSetCurrentUser();
    const currentUser = useCurrentUser();
    const { windowDimension } = useContext(ResponsiveWindowContext);

    const history = useHistory();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            history.push('/');
        } catch (err) {

        }
    };

    return (
        <div className={Styles.SignOutContainer}>
            <div className={`
                ${windowDimension === "bigDesktop" ? Styles.ContainerForDesktop : Styles.ContainerForPhone}
                `}>
                <h1>{currentUser?.username}</h1>
                <br/>
                <button className={Styles.Button} onClick={handleSignOut}>Sign out</button>
            </div>
        </div>
    )
};

export default SignOutPage;
