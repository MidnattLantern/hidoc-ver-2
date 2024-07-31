import React, { useContext } from 'react';
import { ResponsiveWindowContext } from '../../contexts/responsiveWindowContext';

const HomePage = () => {
    const { windowDimension } = useContext(ResponsiveWindowContext);

    return (
        <div>
            <h1>HiDoc</h1>
            <p>windowDimension: {windowDimension}</p>
        </div>
    )
};

export default HomePage;
