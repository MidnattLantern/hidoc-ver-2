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
        IsOwner,
    } = props;

    return(<div className={`${Styles.ProjectItemContainer}`}>


            {ProjectDetail ? (<div className={Styles.DetailContainer}>

                    <h1 className={Styles.Title}>{project_title}</h1>
                    <Card.Img
                    src={feature_poster}
                    className={`${Styles.FeaturePoster} ${Styles.FeaturePosterDetail}`}
                    />
                    <div className={Styles.Description}>
                        {IsOwner ? <button className={Styles.EditButton}> Edit {project_title} </button> : <p>Artist: {owner}</p>}

                        {project_description !== "" ? (<>
                            <hr/>
                            {project_description}
                        </>) : null }
                        {deployed_link !== "" ? (<>
                            <hr/>
                            <p>deployed link: <a className={Styles.DeployedLink}target="blank_" href={deployed_link}>{deployed_link}</a> </p>
                        </>) : null }
                    </div>


                
            </div>) : (<>
                <Link to={`/browse/detail/${id}`}>
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
