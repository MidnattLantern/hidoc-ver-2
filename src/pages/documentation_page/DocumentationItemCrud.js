import React, { useEffect } from "react";
// styles
import Styles from "../../styles/DocumentationItemCrud.module.css";
import "../../global.css";
// components
import DocumentationItemCreate from "./DocumentationItemCreate";

const DocumentationItemCrud = ({ListView, CreateMode, ReadOnly, EditMode, switchToList}) => {

    useEffect(() => {

    }, []);

    return(<div className={Styles.DocumentationItemCrudContainer}>

        {ListView ? (<>
            <p>list</p>
        </>) : (<>
            <p>{CreateMode ? <DocumentationItemCreate switchToList={switchToList}/> : null}</p>
            {ReadOnly ? <p> ReadOnly </p> : null}
            {EditMode ? <p> EditMode </p> : null}
        </>)}

    </div>)
};

export default DocumentationItemCrud;
