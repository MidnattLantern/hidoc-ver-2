import React, { useContext } from 'react';
import { ResponsiveWindowContext } from '../../contexts/responsiveWindowContext';
import { useCurrentUser } from '../../contexts/currentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const HomePage = () => {
    const currentUser = useCurrentUser();
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const history = useHistory();

    const handleMoveToBrowse = (event) => { // applying the logic directly to the onClick cause errors
        event.preventDefault();
        history.push("/project/browse/");
    }

    return (
        <div>
            <h1>Home</h1>
            <p>windowDimension: {windowDimension}</p>
            <p>user: {currentUser?.username}</p>
            <button onClick={handleMoveToBrowse}>Browse</button>
        </div>
    )
};

export default HomePage;
