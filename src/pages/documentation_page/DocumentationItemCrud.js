import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
// styles
import Styles from "../../styles/DocumentationItemCrud.module.css";
import "../../global.css";
// components
import DocumentationItemCreate from "./DocumentationItemCreate";
import { axiosReq } from "../../api/axiosDefaults";

const DocumentationItemCrud = ({ListView, CreateMode, ReadOnly, EditMode, switchToList, selectedDocumentation}) => {

    const [documentation, setDocumentation] = useState({ results: [] });

    useEffect(() => {
        const fetchDocumentation = async () => {
            try {
                const {data} = await axiosReq.get(`/documentations/${selectedDocumentation}`);
                setDocumentation(data);
            } catch(err) {

            }
        };
        fetchDocumentation();
    }, [selectedDocumentation]);

    return(<div className={Styles.DocumentationItemCrudContainer}>

        {ListView ? (<>
            <p>list</p>
        </>) : (<>
            <p>{CreateMode ? <DocumentationItemCreate switchToList={switchToList}/> : null}</p>
            {ReadOnly ? <p> ReadOnly </p> : null}
            {EditMode ? <p> EditMode </p> : null}
            <p>selectedDocumentation: {selectedDocumentation}</p>
            <figure>
                <Image
                src={documentation.documentation_image}
                />
            </figure>
        </>)}

    </div>)
};

export default DocumentationItemCrud;
