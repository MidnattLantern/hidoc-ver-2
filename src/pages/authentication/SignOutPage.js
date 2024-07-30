import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import styles from "../../styles/SignOutPage.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { SetCurrentUserContext } from "../../App";

const SignOutPage = () => {
    const setCurrentUser = useContext(SetCurrentUserContext);

    const history = useHistory();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Container>
                <div className={styles.AuthenticationIsland}>
                    <h1>Sign out</h1>
                    <br/>
                    <button  className={styles.Button} onClick={handleSignOut}>Sign out</button>
                </div>
            </Container>
        </div>
    )
};

export default SignOutPage;
