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
        deployed_link,
        ProjectDetail,
    } = props;

    return(<div className={`${Styles.ProjectItemContainer}`}>


            {ProjectDetail ? (<div className={Styles.DetailContainer}>
                <Card.Img
                src={feature_poster}
                className={Styles.FeaturePoster}
                />
                <p>owner: {owner}</p>
                <p>{project_title}</p>
                <p>{project_description}</p>

                <p>{deployed_link}</p>
            </div>) : (<>
                <Link to={`/project/detail/${id}`}>
                    <div className={Styles.Watermark}>{project_title}</div>
                    <Card.Img
                    src={feature_poster}
                    className={Styles.FeaturePoster}
                    />
                </Link>
            </>)}
            
    </div>)
};

export default ProjectItem;
