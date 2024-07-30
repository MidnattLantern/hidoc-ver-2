import React from "react";
import { Container } from "react-bootstrap";
import styles from "../../styles/SignOutPage.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/currentUserContext";

const SignOutPage = () => {
    const setCurrentUser = useSetCurrentUser();

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
