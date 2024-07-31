import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSetCurrentUser } from "../../contexts/currentUserContext";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
// Styles
import Styles from "../../styles/AuthenticationForm.module.css";
import "../../global.css";

const SignInForm = () => {
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const setCurrentUser = useSetCurrentUser();

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const {
        username,
        password,
    } = signInData;

    const [ errors, setErrors] = useState({}); // leave {} empty or there'll be errors
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
        } catch(err) {
            setErrors(err.response?.data);
        }
    };

    const handleMoveToSignUp = (event) => { // applying the logic directly to the onClick cause errors
        event.preventDefault();
        history.push("/signup/");
    }

    return (
        <div className={`${Styles.AuthenticationContainer}`}>
            <div className={`
            ${errors.username || errors.password1 || errors.password2 ? Styles.ExtendContainerForErrorMessages : null }
            ${windowDimension === "bigDesktop" ? Styles.ContainerForDesktop : Styles.ContainerForPhone}
            `}>
                <Form className={Styles.AuthenticationIsland} onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
                    <br/>

                    <Form.Group>
                        <Form.Control
                        className={Styles.FormControl}
                        name="username"
                        type="text"
                        placeholder={"Username..."}
                        value={username}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password?.map((message, idx) => (
                        <p key={idx}>{message}</p>
                    ))};
                    <br/>

                    <Form.Group>
                        <Form.Control
                        className={Styles.FormControl}
                        name="password"
                        type="password"
                        placeholder={"Password..."}
                        value={password}
                        onChange={handleChange}
                        />
                    </Form.Group>

                    {errors.password?.map((message, idx) => (
                        <p key={idx}>{message}</p>
                    ))};
                    <br/>

                    <div className={Styles.AlignAuthentication}>
                        {username !== "" && password !== "" ? // in english: button is invincible if the forms are empty
                        <button className={Styles.AuthenticationButton}>Sign in</button> :
                        <div className={Styles.AuthenticationButtonDisabled}>Sign in</div> }
                        <p className={Styles.SignParagraph}>
                            or <a onClick={handleMoveToSignUp} className={Styles.Anchor}>Sign up</a>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    )
};

export default SignInForm;
