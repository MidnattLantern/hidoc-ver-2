import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import styles from "../../styles/SignUpForm.module.css"
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SignUpForm = () => {

    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });

    const {
        username,
        password1,
        password2,
    } = signUpData;

    // eslint-disable-next-line
    const [errors, setErrors] = useState({
        username: "",
        password1: "",
        password2: "",
    });

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData)
            history.push('/signin')
            console.log("Redirected to /signin")
        } catch(err) {
            console.log(err)
        }
        setSignUpData({
            username: "",
            password1: "",
            password2: "",
        });
    }

    return (
        <div>
            <Container>
                <Form className={styles.AuthenticationIsland} onSubmit={handleSubmit}>
                    <h1>Sign up</h1>
                    <br/>

                    <Form.Group>
                        <Form.Control
                        className={styles.FormControl}
                        name="username"
                        type="text"
                        placeholder={"Username..." + errors.username}
                        value={username}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>

                    <Form.Group>
                        <Form.Control
                        className={styles.FormControl}
                        name="password1"
                        type="password"
                        placeholder={"Password..." + errors.password1}
                        value={password1}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>

                    <Form.Group>
                        <Form.Control
                        className={styles.FormControl}
                        name="password2"
                        type="password"
                        placeholder={"Confirm Password..." + errors.password2}
                        value={password2}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <hr/>

                    <div className={styles.SignUpDiv}>
                        <button className={styles.Button}>
                            Sign up
                        </button>
                        <p className={styles.SignUpParagraph}>
                            or <a href="signin" className={styles.Anchor}>Sign in</a>
                        </p>
                    </div>

                </Form>
            </Container>
        </div>
    )
};

export default SignUpForm;
