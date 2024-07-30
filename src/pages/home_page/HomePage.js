import React, { useEffect, useState } from 'react';

const HomePage = () => {
    const [windowDimension, setWindowDimension] = useState("bigDesktop")

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1220) {
              setWindowDimension("bigDesktop");
            } else if (window.innerWidth >= 475 && window.innerWidth < 1220) {
              setWindowDimension("smallDesktop");
            } else if (window.innerWidth < 475) {
              setWindowDimension("phone");
            }
          };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <div>
            <h1>HiDoc</h1>
            <p>windowDimension: {windowDimension}</p>
        </div>
    )
};

export default HomePage;
