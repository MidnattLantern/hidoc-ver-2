import React, { createContext, useContext, useEffect, useState } from 'react';

export const ResponsiveWindowContext = createContext();
export const useWindowDimension = () => useContext(ResponsiveWindowContext);
export const ResponsiveWindowProvider = ({ children }) => {
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
        <ResponsiveWindowContext.Provider value={windowDimension}>
            {children}
        </ResponsiveWindowContext.Provider>
    );
};
