import React, { useContext } from "react";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// styles
import Styles from "../../styles/ProjectPage.module.css";
import "../../global.css";
// components
import ProjectList from "./ProjectList";
import ProjectDetail from "./ProjectDetail";

const ProjectPage = () => {
    const { action } = useParams();
    const renderAction = (action) => {
        switch (action) {
            case 'list':
                return <ProjectList />
            default:
                return <>
                <ProjectDetail />
                </>
        };
    };

    const { windowDimension } = useContext(ResponsiveWindowContext);
    const getClassName = () => {
        switch (windowDimension) { // you can switch-case css classes like this
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
                {renderAction(action)}
            </div>
        </div>
    </>)
};

export default ProjectPage;
