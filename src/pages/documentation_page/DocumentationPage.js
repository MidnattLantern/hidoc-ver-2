import React, { useEffect } from "react";
import { useCurrentUser } from "../../contexts/currentUserContext";
// styles
import Styles from "../../styles/DocumentationPage.module.css";
import "../../global.css";
// components
import DocumentationItem from "./DocumentationItem";

const DocumentationPage = ({ ...props }) => {
    const {
        owner,
    } = props;

    const currentUser = useCurrentUser();


    const switchToCreate = (event) => {
        event.preventDefault();
    };

    return(<div className={Styles.DocumentationPageContainer}>

{owner === currentUser?.username ? (<>
    <div className={Styles.DocumentationFrame}>
            <div className={Styles.DocumentationImage}>

            </div>
            <button onClick={switchToCreate} className={Styles.CreateEditButton}>+ Create documentation</button>
        </div>
    </>) : (<>

    </>)}

        <div className={Styles.DocumentationFrame}>
            <div className={Styles.DocumentationImage}>

            </div>
            {owner === currentUser?.username ? (<>
                <button className={Styles.CreateEditButton}> Edit documentation</button>
            </>) : (<>
                <button className={Styles.CreateEditButton}> View documentation </button>
            </>)}
        </div>

        <div className={Styles.DocumentationFrame}>
            <div className={Styles.DocumentationImage}>

            </div>
            {owner === currentUser?.username ? (<>
                <button className={Styles.CreateEditButton}> Edit documentation</button>
            </>) : (<>
                <button className={Styles.CreateEditButton}> View documentation </button>
            </>)}
        </div>

        <div className={Styles.DocumentationFrame}>
            <div className={Styles.DocumentationImage}>

            </div>
            {owner === currentUser?.username ? (<>
                <button className={Styles.CreateEditButton}> Edit documentation</button>
            </>) : (<>
                <button className={Styles.CreateEditButton}> View documentation </button>
            </>)}
        </div>

        <div className={Styles.DocumentationFrame}>
            <div className={Styles.DocumentationImage}>

            </div>
            {owner === currentUser?.username ? (<>
                <button className={Styles.CreateEditButton}> Edit documentation</button>
            </>) : (<>
                <button className={Styles.CreateEditButton}> View documentation </button>
            </>)}
        </div>
        
    </div>)
};

export default DocumentationPage;
