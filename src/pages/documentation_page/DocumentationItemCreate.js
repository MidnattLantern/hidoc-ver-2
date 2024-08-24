import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Image } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
import { axiosReq } from "../../api/axiosDefaults";
// styles
import Styles from "../../styles/DocumentationItemCreate.module.css";
import "../../global.css";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const DocumentationItemCreate = ({switchToList}) => {
    const currentUser = useCurrentUser();
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const {id} = useParams();
    const imageInput = useRef(null);
    const [documentationData, setDocumentationData] = useState({
        documentation_title	: "",
        documentation_paragraph: "",
        documentation_image: "",
    });
    const {
        documentation_title,
        documentation_paragraph,
        documentation_image,
    } = documentationData;

    const handleStringInput = (userInput) => {
        setDocumentationData({
            ...documentationData,
            [userInput.target.name]: userInput.target.value,
        });
    };

    const handleChangeDocumentationImage = (userInput) => {
        if (userInput.target.files.length){
            URL.revokeObjectURL(documentation_image);
            setDocumentationData({
                ...documentationData,
                documentation_image: URL.createObjectURL(userInput.target.files[0]),
            });
        }
    };

    const handleSubmit = async () => { // event used to prevent default
        const formData = new FormData();

        formData.append("documentation_title", documentation_title);
        formData.append("documentation_paragraph", documentation_paragraph);
        formData.append("project", id); // automatically links the documentation to the proejct id, which is fetched trough the {id} parameter

        if (imageInput?.current?.files[0]){
            formData.append("documentation_image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.post('/documentations/', formData)
            switchToList();
        } catch(err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
        };
    };

    return(<div className={Styles.DocumentationItemCreateContainer}>
        <Form onSubmit={handleSubmit}>
            <div className={`${ windowDimension === "bigDesktop" ? Styles.AlignViewsForBigDesktop : Styles.AlignViewsForSmall}`}>
                <div className={`${Styles.FeaturePosterView}`}>

                    <Form.Group>
                        <div className={`${Styles.FeaturePoster} ${Styles.FeaturePosterDetail}`}>
                            {documentation_image ? (<>
                                <figure>
                                    <Image
                                    className={`${windowDimension === "bigDesktop" ? Styles.ImageSizeForDesktop : Styles.ImageSizeForSmall}`}
                                    src={documentation_image}
                                    />
                                </figure>
                            </>) : (<>
                                <p className={Styles.NoDocumentationImage}>File must be smaller than 1MB</p>
                            </>)}

                            <Form.File
                                className={Styles.FormFileButton}
                                accept="image/*"
                                onChange={handleChangeDocumentationImage}
                                ref={imageInput}
                            />

                        </div>
                    </Form.Group>
                </div>

                <div className={`${Styles.DescriptionView} ${windowDimension === "bigDesktop" ? Styles.DescriptionViewBigDesktop : null}`}>
                    <Form.Group>
                        <Form.Control
                            className={`${Styles.FormControl} ${Styles.TitleFormControl}`}
                            type={"title"}
                            name={"documentation_title"}
                            placeholder={"Title (optional)"}
                            value={documentation_title}
                            onChange={handleStringInput}
                        />
                    </Form.Group>

                    <div className={Styles.SaveDiscardButtonContainer}>
                        {documentation_image !== "" ? (<>
                            <button type={"submit"} className={Styles.SaveDiscardButton}>Save</button>
                        </>): (<>
                            <div className={`${Styles.DisabledButton}`}>Save</div>
                        </>)}
                        
                        <button onClick={switchToList} className={Styles.SaveDiscardButton}>Discard</button>
                    </div>

                    <br/>

                    <Form.Group>
                        <Form.Control
                        type={"text"}
                        as={"textarea"}
                        className={`${Styles.FormControl}`}
                        name={"documentation_paragraph"}
                        placeholder={"Description (optional)"}
                        rows={3}
                        value={documentation_paragraph}
                        onChange={handleStringInput}
                        />
                    </Form.Group>

                </div>
            </div>
        </Form>

    </div>)
};

export default DocumentationItemCreate;
