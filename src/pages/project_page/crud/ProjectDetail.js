import React, { useEffect, useState } from "react";
// Styles
import Styles from "../../../styles/ProjectDetail.module.css";
import "../../../global.css";
// components
import ProjectItem from "../ProjectItem";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../../contexts/currentUserContext";
import { axiosReq } from "../../../api/axiosDefaults";

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();

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
        }


        handleMount();
    }, [id]);


    return (<div className={Styles.ProjectDetailContainer}>
        {currentUser ? <p>owner</p> : null}
        <ProjectItem {...project.results[0]} setProjects={setProject} ProjectDetail/>
        
    </div>)
};

export default ProjectDetail;
