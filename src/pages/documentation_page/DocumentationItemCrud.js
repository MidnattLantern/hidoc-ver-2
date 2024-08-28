import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Image } from "react-bootstrap";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
import { axiosReq } from "../../api/axiosDefaults";
// styles
import Styles from "../../styles/DocumentationItemCrud.module.css";
import "../../global.css";
// components
import DocumentationItemCreate from "./DocumentationItemCreate";

const DocumentationItemCrud = ({CreateMode, ReadOnly, EditMode, switchToList, selectedDocumentation}) => {

    const { windowDimension } = useContext(ResponsiveWindowContext);
    const imageInput = useRef(null);
    const [documentationData, setDocumentationData] = useState({
        documentation_paragraph: "",
        documentation_image: "",
    });
    const {
        documentation_paragraph,
        documentation_image,
    } = documentationData;

    useEffect(() => {
        const fetchDocumentation = async () => {
            try {
                const {data} = await axiosReq.get(`/documentations/${selectedDocumentation}`);
                setDocumentationData(data);
            } catch(err) {

            }
        };
        fetchDocumentation();
    }, [selectedDocumentation]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        
        formData.append("documentation_paragraph", documentation_paragraph);

        if (imageInput?.current?.files[0]) {
            formData.append('documentation_image', imageInput.current.files[0]);
        }


        try {
            await axiosReq.put(`/documentations/${selectedDocumentation}`, formData)
            switchToList();
        } catch(err) {

        };
    };

    const handleDelete = async (event) => {
        event.preventDefault(); // important
        try{
            await axiosReq.delete(`/documentations/${selectedDocumentation}`);
            switchToList();
        } catch(err) {
            console.log(err)
        }
    };

    return(<div className={Styles.DocumentationItemCrudContainer}>

            <p>{CreateMode ? <DocumentationItemCreate switchToList={switchToList}/> : null}</p>


        {EditMode ? (<>
        
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
                                <p>File must be smaller than 1MB</p>
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


                    <div className={Styles.SaveDiscardButtonContainer}>
                        <button type={"submit"} className={Styles.SaveDiscardButton}>Save</button>
                        <button onClick={switchToList} className={Styles.SaveDiscardButton}>Discard</button>
                        <button onClick={handleDelete} className={Styles.SaveDiscardButton}>Delete</button>
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

        </>) : (<>

        </>)}

        {ReadOnly ? (<>

            <div className={`${ windowDimension === "bigDesktop" ? Styles.AlignViewsForBigDesktop : Styles.AlignViewsForSmall}`}>
                <div className={`${Styles.FeaturePosterView}`}>

                    <Form.Group>
                        <div className={`${Styles.FeaturePoster} ${Styles.FeaturePosterDetail}`}>

                                <figure>
                                    <Image
                                    className={`${windowDimension === "bigDesktop" ? Styles.ImageSizeForDesktop : Styles.ImageSizeForSmall}`}
                                    src={documentation_image}
                                    />
                                </figure>

                        </div>
                    </Form.Group>
                </div>

                <div className={`${Styles.DescriptionView} ${windowDimension === "bigDesktop" ? Styles.DescriptionViewBigDesktop : null}`}>

                    <div className={Styles.SaveDiscardButtonContainer}>
                        <button onClick={switchToList} className={Styles.SaveDiscardButton}>Close</button>
                    </div>
                    <br/>
                    {documentation_paragraph !== "" ? (
                        <p> {documentation_paragraph} </p>
                    ) : null}
                </div>
            </div>

        </>) : (<>
        
        </>)}

    </div>)
};

export default DocumentationItemCrud;
