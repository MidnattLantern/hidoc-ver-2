import React from "react";
//styles
import Styles from "../../styles/ProjectItem.module.css";
import "../../global.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProjectItem = ({ ...props }) => {
    const {
        id,
        owner,
        project_title,
        project_description,
        feature_poster,
        updated_at,
        watch_proj_id,
        setProjects,
        deployed_link,
        ProjectDetail,
    } = props;

    return(<div className={`${Styles.ProjectItemContainer}`}>

            <Link to={`/project/detail/${id}`}>
                <div className={Styles.Watermark}>{project_title}</div>
                <Card.Img
                src={feature_poster}
                className={Styles.FeaturePoster}
                />
            </Link>
            {ProjectDetail ? (<>
                <p> detail </p>
                <p>id: {id}</p>
                <p>owner: {owner}</p>
            </>) : (<>

            </>)}
            
    </div>)
};

export default ProjectItem;
