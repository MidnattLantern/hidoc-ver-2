import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
// styles
import Styles from "../../styles/AuthenticationForm.module.css";

const SignUpForm = () => {
    const [hasLoaded, setHasLoaded] = useState(false)
    const { windowDimension } = useContext(ResponsiveWindowContext);
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

    const [errors, setErrors] = useState({}); // leave {} empty or there'll be errors
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            setHasLoaded(true);
        };
        handleMount();
    }, []);

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
        } catch(err) {
            setErrors(err.response?.data);
        };
    };

    const handleMoveToSignIn = (event) => { // applying the logic directly to the onClick cause errors
        event.preventDefault();
        history.push("/signin/");
    }

    return (
        <div className={`
        ${hasLoaded ? Styles.Reveal : Styles.Withhold}
        ${Styles.AuthenticationContainer}
        `}>
            <div className={`
            ${errors.username || errors.password1 || errors.password2 ? Styles.ExtendContainerForErrorMessages : null }
            ${windowDimension === "bigDesktop" ? Styles.ContainerForDesktop : Styles.ContainerForPhone}
            `}>
                <Form onSubmit={handleSubmit}>
                    <h1 className={Styles.Header}>Sign up</h1>
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
                    {errors.username ? 
                    errors.username?.map((message, idx) => (
                        <p key={idx}>{message}</p>
                    )): null}
                    <br/>

                    <Form.Group>
                        <Form.Control
                        className={Styles.FormControl}
                        name="password1"
                        type="password"
                        placeholder={"Password..."}
                        value={password1}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password1 ? 
                    errors.password1?.map((message, idx) => (
                        <p key={idx}>{message}</p>
                    )): null}
                    <br/>

                    <Form.Group>
                        <Form.Control
                        className={Styles.FormControl}
                        name="password2"
                        type="password"
                        placeholder={"Confirm Password..."}
                        value={password2}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password2 ? 
                    errors.password2?.map((message, idx) => (
                        <p key={idx}>{message}</p>
                    )): null}
                    <br/>

                    <div className={Styles.AlignAuthentication}>
                        {username !== "" && password1 !== ""  && password2 !== "" ? // in english: button is invincible if the forms are empty
                        <button className={Styles.AuthenticationButton}>Sign up</button> :
                        <div className={Styles.AuthenticationButtonDisabled}>Sign up</div> }
                        <p className={Styles.SignParagraph}>
                            or <a onClick={handleMoveToSignIn} className={Styles.Anchor}>Sign in</a>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    )
};

export default SignUpForm;
