import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveWindowContext } from '../../contexts/responsiveWindowContext';
import { useCurrentUser } from '../../contexts/currentUserContext';
import AnimatedContainer from "../../components/AnimatedContainer";

const HomePage = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        setHasLoaded(true)
    }, []);
    const currentUser = useCurrentUser();
    const { windowDimension } = useContext(ResponsiveWindowContext);

    return (
        <AnimatedContainer hasLoaded={hasLoaded}>
            <h1>Home</h1>
            <p>windowDimension: {windowDimension}</p>
            <p>user: {currentUser?.username}</p>
        </AnimatedContainer>
    )
};

export default HomePage;
