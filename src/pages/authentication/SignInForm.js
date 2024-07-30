import React, { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import styles from "../../styles/SignInForm.module.css"
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SetCurrentUserContext } from "../../App";

const SignInForm = () => {
    const setCurrentUser = useContext(SetCurrentUserContext);

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const {
        username,
        password,
    } = signInData;
    // eslint-disable-next-line
    const [ placeholder, setPlaceholder] = useState({
        username: "",
        password:"",
    });
    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user)
            history.push("/");
        } catch(error) {
            console.log("error: " + error);
        }
        setSignInData({
            username: "",
            password: "",
        });
    };

    return (
        <div>
            <Container>
                <Form className={styles.AuthenticationIsland} onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
                    <br/>

                    <Form.Group>
                        <Form.Control
                        className={styles.FormControl}
                        name="username"
                        type="text"
                        placeholder={"Username..." + placeholder.username}
                        value={username}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>

                    <Form.Group>
                        <Form.Control
                        className={styles.FormControl}
                        name="password"
                        type="password"
                        placeholder={"Password..." + placeholder.password}
                        value={password}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <hr/>

                    <div className={styles.SignInDiv}>
                        <button className={styles.Button}>
                            Sign in
                        </button>
                        <p className={styles.SignInParagraph}>
                            or <a href="signup" className={styles.Anchor}>Sign up</a>
                        </p>
                    </div>

                </Form>
            </Container>
        </div>
    )
};

export default SignInForm;
