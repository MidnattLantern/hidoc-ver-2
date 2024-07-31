import React, { createContext, useContext, useEffect, useState } from 'react';

export const ResponsiveWindowContext = createContext();
export const useWindowDimension = () => useContext(ResponsiveWindowContext);
export const ResponsiveWindowProvider = ({ children }) => {
    const [windowDimension, setWindowDimension] = useState("bigDesktop")
    const [windowTooShort, setWindowTooShort] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1220) {
              setWindowDimension("bigDesktop");
            } else if (window.innerWidth >= 475 && window.innerWidth < 1220) {
              setWindowDimension("smallDesktop");
            } else if (window.innerWidth < 475) {
              setWindowDimension("phone");
            }
            if (window.innerHeight < 350) {
              setWindowTooShort(true)
            } else if (window.innerHeight >= 350) {
              setWindowTooShort(false)
            }
          };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <ResponsiveWindowContext.Provider value={{windowDimension, windowTooShort}}>
            {children}
        </ResponsiveWindowContext.Provider>
    );
};

/* strings:

  bigDesktop
  smallDesktop
  phone

*/
