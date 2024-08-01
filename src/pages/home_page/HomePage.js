import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveWindowContext } from '../../contexts/responsiveWindowContext';
import { useCurrentUser } from '../../contexts/currentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AnimatedContainer from "../../components/AnimatedContainer";

const HomePage = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        setHasLoaded(true)
    }, []);
    const currentUser = useCurrentUser();
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const history = useHistory();

    const handleMoveToBrowse = (event) => { // applying the logic directly to the onClick cause errors
        event.preventDefault();
        history.push("/project/browse/");
    }

    return (
        <AnimatedContainer hasLoaded={hasLoaded}>
            <h1>Home</h1>
            <p>windowDimension: {windowDimension}</p>
            <p>user: {currentUser?.username}</p>
            <button onClick={handleMoveToBrowse}>Browse</button>
        </AnimatedContainer>
    )
};

export default HomePage;
