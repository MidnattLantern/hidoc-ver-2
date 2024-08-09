import React, { useRef, useState, useContext } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Image } from "react-bootstrap";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
//styles
import Styles from "../../styles/ProjectItemCreate.module.css";
import "../../global.css";

const ProjectItemCreate = () => {
    const history = useHistory();
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const [errors, setErrors] = useState({});
    const posterInput = useRef(null);
    const [projectData, setProjectData] = useState({
        project_title: "",
        project_description: "",
        feature_poster: "",
        deployed_link: "",
    });
    const {
        project_title,
        project_description,
        feature_poster,
        deployed_link,
    } = projectData;

    const handleStringInput = (userInput) => {
        setProjectData({
            ...projectData,
            [userInput.target.name]: userInput.target.value,
        });
    };
    const handleChangeFeaturePoster = (userInput) => {
        if (userInput.target.files.length){
            URL.revokeObjectURL(feature_poster);
            setProjectData({
                ...projectData,
                feature_poster: URL.createObjectURL(userInput.target.files[0]),
            });
        }
    };

    const handleDiscard = (event) => {
        event.preventDefault(); // without this, the project would've been created when clicking discard
        history.goBack();
    };

    const handleSubmit = async (userInput) => {
        userInput.preventDefault();
        const formData = new FormData();

        formData.append('project_title', project_title);
        formData.append('project_description', project_description);
        formData.append('feature_poster', posterInput.current.files[0]);
        formData.append('deployed_link', deployed_link);

        try {
            const {data} = await axiosReq.post('/projects/', formData);
            history.push(`/artist/detail/${data.id}`);
        } catch(err){

            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return(<div className={`${Styles.ProjectItemCrudContainer}`}>
        <Form onSubmit={handleSubmit}>
        
            <div className={Styles.DetailContainer}>
                <Form.Group>
                    <Form.Control
                    className={`${Styles.FormControl} ${Styles.TitleFormControl}`}
                    type={"title"}
                    name={"project_title"}
                    placeholder={"Project title (optional)"}
                    value={project_title}
                    onChange={handleStringInput}
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
                        onChange={handleChangeFeaturePoster}
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
                        
                        <button onClick={handleDiscard} className={Styles.SaveDiscardButton}>Discard</button>
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
                        onChange={handleStringInput}
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
                        onChange={handleStringInput}
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

export default ProjectItemCreate;
