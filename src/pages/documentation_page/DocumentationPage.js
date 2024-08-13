import React from "react";
// styles
import Styles from "../../styles/DocumentationPage.module.css";
import "../../global.css";
// components
import DocumentationItem from "./DocumentationItem";

const DocumentationPage = () => {

    return(<div className={Styles.DocumentationPageContainer}>
        <div className={Styles.DocumentationFrame}>
            <div className={Styles.DocumentationImage}>

            </div>
            <button className={Styles.CreateEditButton}>+ Create documentation</button>
        </div>

        <div className={Styles.DocumentationFrame}>
            <div className={Styles.DocumentationImage}>

            </div>
            <button className={Styles.CreateEditButton}> Edit documentation</button>
        </div>

        <div className={Styles.DocumentationFrame}>
            <div className={Styles.DocumentationImage}>

            </div>
            <button className={Styles.CreateEditButton}> Edit documentation</button>
        </div>

        <div className={Styles.DocumentationFrame}>
            <div className={Styles.DocumentationImage}>

            </div>
            <button className={Styles.CreateEditButton}> Edit documentation</button>
        </div>

        <div className={Styles.DocumentationFrame}>
            <div className={Styles.DocumentationImage}>

            </div>
            <button className={Styles.CreateEditButton}> Edit documentation</button>
        </div>
        
    </div>)
};

export default DocumentationPage;
