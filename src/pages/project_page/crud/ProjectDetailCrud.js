import React, { useContext, useEffect, useState } from "react";
import { ResponsiveWindowContext } from "../../../contexts/responsiveWindowContext";
// Styles
import Styles from "../../../styles/ProjectDetailCrud.module.css";
import "../../../global.css";
// components
import ProjectItemCrud from "../ProjectItemCrud";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../../contexts/currentUserContext";

const ProjectDetailCrud = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const history = useHistory();
    const { windowDimension } = useContext(ResponsiveWindowContext);

    const handleRedirectToBrowse = () => {
        history.goBack(); // less robust, could crash in rare cases
    }

    useEffect(() => {
        setHasLoaded(true);
    }, []);

// AlignForPhone: Moving Go Back button to the bottom for phone view
    return (<div className={`
    ${Styles.ProjectDetailCrudContainer}
    `}>
        <div className={`
                ${hasLoaded ? Styles.Reveal : Styles.Withhold}
            `}>
                <button
                onClick={handleRedirectToBrowse}
                className={`
                    ${Styles.BackToBrowseButton}
                    ${windowDimension === "phone" ? Styles.BackToBrowseButton_AlignForPhone: Styles.BackToBrowseButton_AlignForAnyDesktop}
                `}
                >Cancel</button>

                    <ProjectItemCrud />
            </div>
    </div>)
};

export default ProjectDetailCrud;
