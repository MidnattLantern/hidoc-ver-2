import React, { useContext, useEffect, useState } from "react";
import { ResponsiveWindowContext } from "../../../contexts/responsiveWindowContext";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../../api/axiosDefaults";
// Styles
import Styles from "../../../styles/ProjectDetail.module.css";
import "../../../global.css";
import ProjectItem from "../ProjectItem";
import ProjectItemCreate from "../ProjectItemCreate";
import ProjectItemEdit from "../ProjectItemEdit";
// components

const ProjectDetailFrame = () => {
    const { id } = useParams();
    const [project, setProject] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const history = useHistory();
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const { action } = useParams();

    useEffect(() => {
        const handleMount = async () => { // read and update feature
            try{
                const [{ data: project }] = await Promise.all([
                    axiosReq.get(`/projects/${id}`),
                ]);
                setProject({ results: [project] });
                setHasLoaded(true);
            } catch(err) {

            }
        };

        if (action !== 'create') {
            handleMount(); // read and update feature
        } else {
            setHasLoaded(true);
        }

    }, [id, action]);

    const handleGoBack = () => {
        history.goBack();
    }

    const renderAction = (action) => {
        switch (action) {
            case 'detail':
                return <ProjectItem {...project.results[0]} setProjects={setProject} ProjectDetail/>;
            case 'create':
                return <ProjectItemCreate />;
            case 'edit':
                return <ProjectItemEdit {...project.results[0]}/>;
            default: // "broken link" by default
                return null
        };
    };

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

// AlignForPhone: Moving Go Back button to the bottom for phone view
    return (<div className={`${Styles.ProjectDetailContainer}`}>
        <div className={`${hasLoaded ? Styles.Reveal : Styles.Withhold}`}>
            <button
            onClick={handleGoBack}
            className={`${Styles.BackToBrowseButton} ${windowDimension === "phone" ? Styles.BackToBrowseButton_AlignForPhone: Styles.BackToBrowseButton_AlignForAnyDesktop}`}
            >
                Go back
            </button>

            <div className={getClassName()}>

                <p>frame</p>

                {renderAction(action)}
            </div>
            
        </div>
    </div>)
};

export default ProjectDetailFrame;
