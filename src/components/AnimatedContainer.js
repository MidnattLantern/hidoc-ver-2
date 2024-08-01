import React, { useEffect, useState } from "react";
import Styles from "../styles/AnimatedContainer.module.css";
import "../global.css";

const AnimatedContainer = ({ hasLoaded, children }) => {
    const [expandedWidth, setExpandedWidth] = useState(false);
    const [expandedHeight, setExpandedHeight] = useState(false);
    const [displayLoader, setDisplayLoader] = useState(false);

    useEffect(() => {
        // Set the expandedWidth state immediately
        setExpandedWidth(true);

        // Start the loader timeout
        const loaderTimeout = setTimeout(() => {
            setDisplayLoader(true);
        }, 500); // This simulates a delay for the logo to fade out

        // Conditionally start the expandedHeight timeout based on hasLoaded
        const heightTimeout = hasLoaded ? setTimeout(() => {
            try {
                setExpandedHeight(true);
                setDisplayLoader(false);
            } catch (error) {
                console.error('Error in expanding height:', error);
            }
        }, 500) : null;
        return () => { // Cleanup function to clear timeouts when the component unmounts or dependencies change
            clearTimeout(loaderTimeout);
            if (heightTimeout) {
                clearTimeout(heightTimeout);
            }
        };
    }, [hasLoaded]); // Dependency array includes hasLoaded to re-run effect when it changes


    return (
        <div className={Styles.AnimatedContainerContainer}>
            <div className={`${Styles.LauncherBox} ${expandedHeight && hasLoaded ? Styles.LauncherBoxFadeOut : null}`}>
                {displayLoader ? <p className={Styles.LoaderP}>loading...</p> : null}
            </div>
            <div className={`${Styles.LauncherLogo} ${expandedWidth ? Styles.LauncherLogoFadeOut : null}`}>
                <h1>HiDoc</h1>
            </div>
            <div
                className={`
                    ${Styles.ExpandingDiv}
                    ${expandedWidth ? Styles.ExpandingDivExpandedWidth : null}
                    ${expandedHeight && hasLoaded ? Styles.ExpandingDivExpandedHeight : null}
                `}
            >
                {expandedHeight && hasLoaded ? <div>{children}</div> : null}
            </div>
        </div>
    );
};

export default AnimatedContainer;
