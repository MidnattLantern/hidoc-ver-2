import React, { useContext } from "react";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
// styles
import Styles from "../../styles/BrowsePage.module.css";
import "../../global.css";
// components
import ProjectDetail from "./ProjectDetail";

const ProjectDetailPage = () => {

    const { windowDimension } = useContext(ResponsiveWindowContext);
    const getClassName = () => {
        switch (windowDimension) {
            case "phone":
                return Styles.ContainerForPhone;
            case "smallDesktop":
                return Styles.ContainerForSmallDesktop;
            case "bigDesktop":
                return Styles.ContainerForBigDesktop;
            default:
                return '';
        };
    };

    return(<>
        <div className={Styles.ProjectPageContainer}>
            <div className={getClassName()}>
                <ProjectDetail />
            </div>
        </div>
    </>)
};

export default ProjectDetailPage;
