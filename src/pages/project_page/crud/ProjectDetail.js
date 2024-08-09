import React, { useContext, useEffect, useState } from "react";
import { ResponsiveWindowContext } from "../../../contexts/responsiveWindowContext";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../../contexts/currentUserContext";
import { axiosReq } from "../../../api/axiosDefaults";
// Styles
import Styles from "../../../styles/ProjectDetail.module.css";
import "../../../global.css";
// components
import ProjectItem from "../ProjectItem";

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const history = useHistory();
    const { windowDimension } = useContext(ResponsiveWindowContext);

    const handleRedirectToBrowse = () => {
        history.goBack();
    }

    useEffect(() => {
        const handleMount = async () => {
            try{
                const [{ data: project }] = await Promise.all([
                    axiosReq.get(`/projects/${id}`),
                ]);
                setProject({ results: [project] });
                setHasLoaded(true);
            } catch(err) {

            }
        };

        handleMount();
    }, [id]);

// AlignForPhone: Moving Go Back button to the bottom for phone view
    return (<div className={`
    ${Styles.ProjectDetailContainer}
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
                >Go back</button>

                {currentUser ? <div className={Styles.OwnerOptions}>
                <ProjectItem {...project.results[0]} setProjects={setProject} ProjectDetail/>
                </div> :
                <ProjectItem {...project.results[0]} setProjects={setProject} ProjectDetail/>
                }
            </div>

    </div>)
};

export default ProjectDetail;
