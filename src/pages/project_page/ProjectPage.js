import React, { useContext } from "react";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
// styles
import Styles from "../../styles/ProjectPage.module.css";
import "../../global.css";
// components
import ProjectList from "./crud/ProjectList";
import AnimatedContainer from "../../components/AnimatedContainer";

const ProjectPage = () => {
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
        }
    };

    return(<>
        <div className={Styles.ProjectPageContainer}>
            <div className={getClassName()}>
                <AnimatedContainer>
                    <ProjectList />
                </AnimatedContainer>
            </div>
        </div>
    </>)
};

export default ProjectPage;
