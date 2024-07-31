import React, { useContext } from 'react';
import { ResponsiveWindowContext } from '../../contexts/responsiveWindowContext';
import { useCurrentUser } from '../../contexts/currentUserContext';

const HomePage = () => {
    const currentUser = useCurrentUser();
    const { windowDimension } = useContext(ResponsiveWindowContext);

    return (
        <div>
            <h1>Home</h1>
            <p>windowDimension: {windowDimension}</p>
            <p>user: {currentUser?.username}</p>
        </div>
    )
};

export default HomePage;
