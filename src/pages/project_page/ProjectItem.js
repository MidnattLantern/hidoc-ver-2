import React, { useContext, useEffect, useState } from "react";
//styles
import Styles from "../../styles/ProjectItem.module.css";
import "../../global.css";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const ProjectItem = ({ ...props }) => {
    const {
        id,
        owner,
        watch_proj_id,
        project_title,
        project_description,
        feature_poster,
        deployed_link,
        ProjectDetail,
        ArtistLibrary,
    } = props;

    const history = useHistory();

    const currentUser = useCurrentUser();
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const library = ArtistLibrary ? "artist" : "browse";

    // logic
    const handleWatchProject = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.post("/watch-projects/", {project: id});
            history.goBack()
        } catch(err) {

        }
    };
    const handleUnwatchProject = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.delete(`/watch-projects/${watch_proj_id}`);
            history.goBack()
        } catch(err) {

        }
    };

    useEffect(() => {

    }, []);

    return(<div className={`${Styles.ProjectItemContainer}`}>

            {ProjectDetail ? (<div className={`${ windowDimension === "bigDesktop" ? Styles.AlignViewsForBigDesktop : Styles.AlignViewsForSmall}`}>

            <div className={Styles.FeaturePosterView}>
                <Card.Img src={feature_poster} className={`${Styles.FeaturePoster} ${Styles.FeaturePosterDetail}`}/>
            </div>

            <div className={`${Styles.DescriptionView} ${windowDimension === "bigDesktop" ? Styles.DescriptionViewBigDesktop : null}`}>
                <h1 className={Styles.Title}> {project_title} </h1>

                <p>Artist: {owner}</p>

                {currentUser ? (<>

                    {currentUser?.username === owner ? (<>
                        <Link to={`/project/edit/${id}`} className={Styles.EditButton}>
                        Update {project_title}
                        </Link>
                    </>) : (<>
                        
                        {watch_proj_id ? (<>
                            <button onClick={handleUnwatchProject} className={Styles.EditButton}>
                            Unwatch {project_title}
                            </button>                    
                        </>) : (<>
                            <button onClick={handleWatchProject} className={Styles.EditButton}>
                            Watch {project_title}
                            </button>
                        </>)}

                    </>)}

                    </>) : (<>
                        <p>Sign in to save {project_title} to a watch list</p>
                    </>)}

                {project_description !== "" ? (<>
                    <hr/>
                    {project_description}
                </>) : null }
                {deployed_link !== "" ? (<>
                    <hr/>
                    <a className={Styles.DeployedLink}target="blank_" href={deployed_link}>{deployed_link}</a>
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

        </>)}

    </div>)
};

export default ProjectItem;
