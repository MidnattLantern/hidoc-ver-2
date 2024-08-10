import React, { useContext, useEffect, useRef, useState } from "react";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { Form, Image } from "react-bootstrap";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
// styles
import Styles from "../../styles/ProjectItemEdit.module.css";
import "../../global.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


const ProjectItemEdit = () => {
    const history = useHistory();
    const {id} = useParams();
    const currentUser = useCurrentUser();
    const [errors, setErrors] = useState({});
    const posterInput = useRef(null);
    const [deleteButton, revealDeleteButton] = useState(false);

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
        deployed_link
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("project_title", project_title);
        formData.append("project_description", project_description);

        if (posterInput?.current?.files[0]) {
            formData.append('feature_poster', posterInput.current.files[0]);
         }

        if (event?.current?.files[0]){
            formData.append('feature_poster', posterInput.current.files[0]);
        }

        formData.append("deployed_link", deployed_link);

        try {
            await axiosReq.put(`/projects/${id}`, formData);
            history.push(`/artist/detail/${id}`)
        } catch(err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
        };
    };
    
    const handleDiscard = (event) => {
        event.preventDefault(); // without this, the project would've been created when clicking discard
        history.goBack();
    };

    const handleRevealDeleteButton = (event) => {
        event.preventDefault();
        revealDeleteButton(prevState => !prevState);
    };

    const handleDelete = async (event) => {
        try{
            event.preventDefault();
//            await axiosReq.delete(`/projects/${id}`)
            history.push(`/artist/list/${currentUser?.pk}`)
        } catch(err) {

        }
    }

    useEffect(() => {
        const handleMount = async () => {
            try{
                const { data } = await axiosReq.get(`/projects/${id}`); // has to be { data } and nothing else!
                const {project_title, project_description, feature_poster, deployed_link, is_owner} = data;
                
                is_owner ?(
                    setProjectData({project_title, project_description, feature_poster, deployed_link})
                ) : (
                    console.log("is not owner")
                );
            } catch(err) {

            }
        }
        handleMount();
    }, [id, currentUser, history]);

    const { windowDimension } = useContext(ResponsiveWindowContext);

    return(<div className={Styles.ProjectItemEditContainer}>
        <Form onSubmit={handleSubmit}>
            <div className={`${ windowDimension === "bigDesktop" ? Styles.AlignViewsForBigDesktop : Styles.AlignViewsForSmall}`}>
                <div className={`${Styles.FeaturePosterView}`}>
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
                </div>


                <div className={`${Styles.DescriptionView} ${windowDimension === "bigDesktop" ? Styles.DescriptionViewBigDesktop : null}`}>
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
<hr/>
<div className={Styles.AlignDeleteButton}>
    <button className={Styles.SaveDiscardButton} onClick={handleRevealDeleteButton}>Delete {project_title}</button>
    {deleteButton ? (<>
        <button className={Styles.DeleteButton} onClick={handleDelete}>Confirm</button>
    </>) : (<>

    </>)}
</div>


                </div>
            </div>
        </Form>
    </div>)
};

export default ProjectItemEdit;
