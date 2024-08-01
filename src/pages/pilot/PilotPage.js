import React, { useEffect, useState } from "react";
// styles
import Styles from "../../styles/PilotPage.module.css";
import "../../global.css";

const PilotPage = () => {
    const [expandedWidth, setExpandedWidth] = useState(false);
    const [expandedHeight, setExpandedHeight] = useState(false);
    const [displayLoader, setDisplayLoader] = useState(false)

    useEffect(() => {
        setExpandedWidth(true);
        setTimeout(() => {
            setDisplayLoader(true);
        }, 500) // as long as it takes for the logo to fade out
        setTimeout(() => { // Adding artificial delay
            setExpandedHeight(true);
            setDisplayLoader(false)
        }, 5500);
    }, []);

    return (<div className={`${Styles.PilotPageContainer}`}>
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
                {expandedHeight ? <div>
                    <p>content 1</p>
                    <p>content 2</p>
                    <p>content 3</p>
                    <p>content 4</p>
                    <p>content 5</p>
                </div> : null}
            </div>

    </div>)
};

export default PilotPage;
