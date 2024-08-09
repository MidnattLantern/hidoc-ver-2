import React, { useContext, useRef } from "react";
import { Form, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
import { useCurrentUser } from "../../contexts/currentUserContext";
//styles
import Styles from "../../styles/ProjectItem.module.css";
import "../../global.css";

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
    const posterInput = useRef(null);

    const { windowDimension } = useContext(ResponsiveWindowContext);
    const library = ArtistLibrary ? "artist" : "browse";

    return(<div className={`${Styles.ProjectItemContainer}`}>
        {ProjectDetail ? (<div className={Styles.DetailContainer}>

                <div className={Styles.DetailContainer}>

                        <Form.Control
                        className={`${Styles.FormControl} ${Styles.TitleFormControl}`}
                        type={"title"}
                        name={"project_title"}
                        placeholder={"Untitled"}
                        value={project_title}
                        onChange={() => {}}
                        />

                    <div className={`${Styles.FeaturePoster} ${Styles.FeaturePosterDetail}`}>

                        {feature_poster ? (<>

                                <Image
                                className={`${windowDimension === "bigDesktop" ? Styles.ImageSizeForDesktop : Styles.ImageSizeForSmall}`}
                                src={feature_poster}
                                />

                        </>) : (<>
                            <p className={Styles.NoFeaturePoster}>Failed to load image</p>
                        </>)}

                    </div>

                    <div className={Styles.Description}>
                        <div className={Styles.SaveDiscardButtonContainer}>

                            {currentUser?.username === owner ? (<>
                            <Link to={`/project/edit/${id}`} className={`${Styles.UpdateButton}`}>
                                Update {project_title}
                            </Link>
                            </>): (<>
                                <div className={`${Styles.WatchButton}`}>Watch {project_title}</div>
                            </>)}
                        </div>

                        <br/>

                        <Form.Control
                        type={"text"}
                        as={"textarea"}
                        className={`${Styles.FormControl}`}
                        name={"project_description"}
                        placeholder={""}
                        rows={3}
                        value={project_description}
                        onChange={() => {}}
                        />

                        <br/>

                        <div className={`${Styles.FormControl} ${Styles.DeployedLink}`}>
                            <a className={Styles.Anchor} href={deployed_link} target="blank">{deployed_link}</a>
                        </div>

                    </div>
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
