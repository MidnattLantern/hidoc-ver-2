import React, { useEffect, useState } from "react";
import Styles from "../styles/AnimatedContainer.module.css";
import "../global.css";

const AnimatedContainer = ({ hasLoaded, children }) => {
    const [expandedWidth, setExpandedWidth] = useState(false);
    const [expandedHeight, setExpandedHeight] = useState(false);
    const [displayLoader, setDisplayLoader] = useState(false);

    useEffect(() => {
        setExpandedWidth(true);
        setTimeout(() => {
            setDisplayLoader(true);
        }, 500); // As long as it takes for the logo to fade out
        setTimeout(() => {
            /* external try-catch block would go here */
            setExpandedHeight(true);
            setDisplayLoader(false);
        }, 500); // Artificial delay for catching up
    }, []);

    return (
        <div className={Styles.AnimatedContainerContainer}>
            <div className={`${Styles.LauncherBox} ${expandedHeight ? Styles.LauncherBoxFadeOut : null}`}>
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
