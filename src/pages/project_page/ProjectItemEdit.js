import React, { useContext, useRef, useState } from "react";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { Form, Image } from "react-bootstrap";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
// styles
import Styles from "../../styles/ProjectItemEdit.module.css";
import "../../global.css";


const ProjectItemEdit = ({ ...props }) => {
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
    const currentUser = useCurrentUser
    const { windowDimension } = useContext(ResponsiveWindowContext);

    const [errors, setErrors] = useState({});
    const posterInput = useRef(null);

    return(<div className={Styles.ProjectItemEditContainer}>
        <Form>
            
            <div className={Styles.DetailContainer}>
                <Form.Group>
                    <Form.Control
                    className={`${Styles.FormControl} ${Styles.TitleFormControl}`}
                    type={"title"}
                    name={"project_title"}
                    placeholder={"Project title (optional)"}
                    value={project_title}
                    onChange={() => {}}
                    />
                    {errors?.project_title?.map((message, idx) => (
                    <p key={idx}>
                        {message}
                    </p>
                    ))}
                </Form.Group>

                <Form.Group>
                    <div className={`${Styles.FeaturePoster} ${Styles.FeaturePosterDetail}`}>

                        {feature_poster ? (<>
                            <figure>
                                <Image
                                className={`${windowDimension === "bigDesktop" ? Styles.ImageSizeForDesktop : Styles.ImageSizeForSmall}`}
                                src={feature_poster}
                                />
                            </figure>
                        </>) : (<>
                            <p className={Styles.NoFeaturePoster}>File must be smaller than 1MB</p>
                        </>)}
                        <Form.File
                        className={Styles.FormFileButton}
                        id="image-upload"
                        accept="image/*"
                        onChange={() => {}}
                        ref={posterInput}
                        />

                    </div>
                </Form.Group>
                {errors?.feature_poster?.map((message, idx) => (
                    <p key={idx}>
                        {message}
                    </p>
                ))}

                <div className={Styles.Description}>
                    <div className={Styles.SaveDiscardButtonContainer}>
                        {feature_poster !== "" ? (<>
                            <button type={"submit"} className={Styles.SaveDiscardButton}>Save</button>
                        </>): (<>
                            <div className={`${Styles.DisabledButton}`}>Save</div>
                        </>)}
                        
                        <button onClick={() => {}} className={Styles.SaveDiscardButton}>Discard</button>
                    </div>

                    <br/>
                    <Form.Group>
                        <Form.Control
                        type={"text"}
                        as={"textarea"}
                        className={`${Styles.FormControl}`}
                        name={"project_description"}
                        placeholder={"Project description (optional)"}
                        rows={3}
                        value={project_description}
                        onChange={() => {}}
                        />
                    </Form.Group>
                    {errors?.project_description?.map((message, idx) => (
                        <p key={idx}>
                            {message}
                        </p>
                    ))}
                    
                    <br/>
                    <Form.Group>
                        <Form.Control
                        className={`${Styles.FormControl}`}
                        type={"text"}
                        name={"deployed_link"}
                        placeholder={"Deployed link URL (optional)"}
                        value={deployed_link}
                        onChange={() => {}}
                        />
                    </Form.Group>
                    {errors?.deployed_link?.map((message, idx) => (
                        <p key={idx}>
                            {message}
                        </p>
                    ))}
                </div>
            </div>
        </Form>
    </div>)
};

export default ProjectItemEdit;
