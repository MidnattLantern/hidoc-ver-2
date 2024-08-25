import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/currentUserContext";
// styles
import Styles from "../../styles/DocumentationPage.module.css";
import "../../global.css";
// components
//import DocumentationItem from "./DocumentationItem";
import DocumentationItemCrud from "./DocumentationItemCrud";
import DocumentationList from "./DocumentationList";

const DocumentationPage = ({ ...props }) => {
    const {
        owner,
    } = props;

    const [selectedDocumentation, setSelectedDocumentation] = useState(null);

    const currentUser = useCurrentUser();
    const [action, setAction] = useState('list'); // detail by default

    const switchToCreate = (event) => {
        event.preventDefault();
        setAction("create")
    };
    const switchToList = () => { // disabled event so that DocumentationItemCrud can work
//        event.preventDefault();
        setAction("list")
    };
    const switchToDetail = () => { // disabled event so that DocumentationList can work
//        event.preventDefault();
        setAction("detail")
    };

    const renderAction = (action) => {
        switch (action) {
            case 'list':
                return <>

            {owner === currentUser?.username ? (<>
                <div className={Styles.DocumentationFrame}>
                    <div className={Styles.DocumentationImage}>
                        <DocumentationItemCrud ListView/>
                    </div>
                    <button onClick={switchToCreate} className={Styles.CreateEditButton}>+ Create documentation</button>
                </div>
            </>) : (<>

            </>)}

                    <DocumentationList owner={owner} switchToDetail={switchToDetail} setSelectedDocumentation={setSelectedDocumentation}/>

                </>
            case 'create':
                return <>
                    <DocumentationItemCrud CreateMode switchToList={switchToList} />
                </>
            case 'detail':
                return <>
                    <button onClick={() => {switchToList(); setSelectedDocumentation(null);}} className={Styles.CreateEditButton}>Discard</button>
                    {owner === currentUser?.username ? <p>update</p> : <p>read only</p>}

                    <div className={Styles.DocumentationFrame}>
                        <div className={Styles.DocumentationImage}>
                            {owner === currentUser?.username ? 
                            <DocumentationItemCrud EditMode selectedDocumentation={selectedDocumentation}/> :
                            <DocumentationItemCrud ReadOnly selectedDocumentation={selectedDocumentation}/>}
                        </div>
                    </div>
                    
                </>
            default: // "broken link" by default
                return null
        };
    };

    return(<div className={Styles.DocumentationPageContainer}>
        {renderAction(action)}
    </div>)
};

export default DocumentationPage;
