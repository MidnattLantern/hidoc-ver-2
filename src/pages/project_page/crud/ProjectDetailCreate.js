import React, { useContext, useEffect, useState } from "react";
import { ResponsiveWindowContext } from "../../../contexts/responsiveWindowContext";
// Styles
import Styles from "../../../styles/ProjectDetailCreate.module.css";
import "../../../global.css";
// components
import ProjectItemCreate from "../ProjectItemCreate";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProjectDetailCreate = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const history = useHistory();
    const { windowDimension } = useContext(ResponsiveWindowContext);

    const handleRedirectToBrowse = () => {
        history.goBack();
    }

    useEffect(() => {
        setHasLoaded(true);
    }, []);

// AlignForPhone: Moving Go Back button to the bottom for phone view
    return (<div className={`${Styles.ProjectDetailCrudContainer}`}>
        <div className={`${hasLoaded ? Styles.Reveal : Styles.Withhold}`}>
            <button
            onClick={handleRedirectToBrowse}
            className={`${Styles.BackToBrowseButton} ${windowDimension === "phone" ? Styles.BackToBrowseButton_AlignForPhone: Styles.BackToBrowseButton_AlignForAnyDesktop}`}
            >
                Cancel
            </button>

                <ProjectItemCreate />
        </div>
    </div>)
};

//export default ProjectDetailCreate;
