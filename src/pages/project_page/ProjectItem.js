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

            {ProjectDetail ? (<div className={`${ windowDimension === "bigDesktop" ? Styles.AlignViewsForBigDesktop : Styles.AlignViewsForSmall}`}>

            <div className={Styles.FeaturePosterView}>
                <Card.Img src={feature_poster} className={`${Styles.FeaturePoster} ${Styles.FeaturePosterDetail}`}/>
            </div>

            <div className={`${Styles.DescriptionView} ${windowDimension === "bigDesktop" ? Styles.DescriptionViewBigDesktop : null}`}>
                <h1 className={Styles.Title}> {project_title} </h1>

                <p>Artist: {owner}</p>

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
