import React, { useEffect, useState } from "react";
import Styles from "../styles/AnimatedContainer.module.css";
import "../global.css";

const AnimatedContainer = ({ children }) => {
    const [expandedWidth, setExpandedWidth] = useState(false);
    const [expandedHeight, setExpandedHeight] = useState(false);
    const [displayLoader, setDisplayLoader] = useState(false);

    useEffect(() => {
        setExpandedWidth(true);
        setTimeout(() => {
            setDisplayLoader(true);
        }, 500); // as long as it takes for the logo to fade out
        setTimeout(() => { // Adding artificial delay
            setExpandedHeight(true);
            setDisplayLoader(false);
        }, 500);
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
                    ${expandedHeight ? Styles.ExpandingDivExpandedHeight : null}
                `}
            >
                {expandedHeight ? <div>{children}</div> : null}
            </div>
        </div>
    );
};

export default AnimatedContainer;
