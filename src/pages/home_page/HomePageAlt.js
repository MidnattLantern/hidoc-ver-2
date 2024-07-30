import React, { useContext } from 'react';
import { ResponsiveWindowContext } from '../../contexts/responsiveWindowContext';

const HomePageAlt = () => {
    const windowDimension = useContext(ResponsiveWindowContext);

    return (
        <div>
            <h1>HomePageAlt</h1>
            <p>windowDimension: {windowDimension}</p>
        </div>
    )
};

export default HomePageAlt;
