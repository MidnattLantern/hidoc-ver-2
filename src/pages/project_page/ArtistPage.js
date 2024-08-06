import React, { useContext } from "react";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/currentUserContext";
// styles
import Styles from "../../styles/ProjectPage.module.css";
import "../../global.css";
// components
import ProjectList from "./crud/ProjectList";
import ProjectDetail from "./crud/ProjectDetail";


const ArtistPage = () => {
    const history = useHistory();
    const handleRedirectToBrowse = () => {
        history.push('/browse/list/_')
    }
    const { action } = useParams();
    const currentUser = useCurrentUser(); // using.toString() 
    const { id } = useParams();
    const renderAction = (action) => {
        switch (action) {
            case 'list':
                return <ProjectList ArtistLibrary/>;
            case 'detail':
                return <ProjectDetail />;
            default: // "broken link" by default
                return <div className={Styles.BrokenLinkMessage}>
                    <h1>Broken link</h1>
                    <button onClick={handleRedirectToBrowse}>Back to Browse</button>
                </div>
        };
    };

    const { windowDimension } = useContext(ResponsiveWindowContext);
    const getClassName = () => {
        switch (windowDimension) { // you can switch-case css classes like this
            case "phone":
                return Styles.ContainerForPhone;
            case "smallDesktop":
                return Styles.ContainerForSmallDesktop;
            case "bigDesktop":
                return Styles.ContainerForBigDesktop;
            default:
                return '';
        };
    };

    return(<>
        <div className={Styles.ProjectPageContainer}>
        {(currentUser?.pk.toString()) === id ? <p>Create project</p> : null}
            <div className={getClassName()}>
                {renderAction(action)}
            </div>
        </div>
    </>)
};

export default ArtistPage;
