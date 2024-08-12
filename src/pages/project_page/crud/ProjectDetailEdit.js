import React, { useContext, useEffect, useState } from "react";
// stylse
import Styles from "../../../styles/ProjectDetailEdit.module.css";
import "../../../global.css";
// components
import ProjectItemEdit from "../ProjectItemEdit";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ResponsiveWindowContext } from "../../../contexts/responsiveWindowContext";
import { axiosReq } from "../../../api/axiosDefaults";

const ProjectDetailEdit = () => {
    const { id } = useParams();
    const [project, setProject] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const history = useHistory();
    const { windowDimension } = useContext(ResponsiveWindowContext);

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

    
    return(<div className={`${Styles.ProjectDetailEditContainer}`}>

        <div className={`${hasLoaded ? Styles.Reveal : Styles.Withhold}`}>
            <ProjectItemEdit {...project.results[0]}/>
        </div>
    </div>)
};

//export default ProjectDetailEdit;
