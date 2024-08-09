import React, { useContext } from "react";
//styles
import Styles from "../../styles/ProjectItem.module.css";
import "../../global.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
import { useCurrentUser } from "../../contexts/currentUserContext";

const ProjectItem = ({ ...props }) => {
    const {
        id,
        owner,
        project_title,
        project_description,
        feature_poster,
        deployed_link,
        ProjectDetail,
        ArtistLibrary,
    } = props;
    const currentUser = useCurrentUser();

    const { windowDimension } = useContext(ResponsiveWindowContext);
    const library = ArtistLibrary ? "artist" : "browse";

    return(<div className={`${Styles.ProjectItemContainer}`}>

            {ProjectDetail ? (<div className={Styles.DetailContainer}>

                    <h1 className={Styles.Title}>
                        {project_title}
                    </h1>

                    <Card.Img src={feature_poster} className={`${Styles.FeaturePoster} ${Styles.FeaturePosterDetail}`}/>
                    <div className={Styles.Description}>

                    <Link to={`/artist/list/${owner}`}>
                        <p>Artist: {owner}</p>
                    </Link>

                        {currentUser?.username === owner ? (<>
                            <Link to={`/project/edit/${id}`} className={Styles.EditButton}>
                            Update {project_title}
                            </Link>
                        </>) : (<>
                            <div className={Styles.EditButton}>
                            Watch {project_title}
                            </div>
                        </>)}

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

                <Link to={`/${library}/detail/${id}`}>
                    <div className={`${Styles.Watermark} ${windowDimension === "bigDesktop" ? Styles.WatermarkBig : null}`}>{project_title}</div>
                    <Card.Img
                        src={feature_poster}
                        className={`${Styles.GridFrame} ${windowDimension === "bigDesktop" ? Styles.GridFrameBig : null}`}
                    />
                </Link>

{/*
                <Link to={`/${library}/detail/${id}`}>
                    <div className={Styles.Watermark}>{project_title}</div>
                    <Card.Img
                    src={feature_poster}
                    className={Styles.FeaturePoster}
                    />
                </Link>
*/}


            </>)}
            
    </div>)
};

export default ProjectItem;
