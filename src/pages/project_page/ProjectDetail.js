import React, { useContext, useEffect, useState } from "react";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
// Styles
import Styles from "../../styles/ProjectDetail.module.css";
import "../../global.css";
// components
import ProjectItem from "./ProjectItem";
import ProjectItemCrud from "./ProjectItemCrud";
import DocumentationPage from "../documentation_page/DocumentationPage";

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const history = useHistory();
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const [action, setAction] = useState('detail'); // detail by default

    useEffect(() => {
        const handleMount = async () => { // read and update feature
            try {
                const [{ data: project }] = await Promise.all([
                    axiosReq.get(`/projects/${id}`),
                ]);
                setProject({ results: [project] });
                setHasLoaded(true);
            } catch(err) {

            }
        };

        if (id === 'create') {
            setAction('create')
            handleMount();
        }
        if (action !== 'create') {
            handleMount(); // read and update feature
        } else {
            setHasLoaded(true);
        }

    }, [id, action]);

    const handleGoBack = () => {
        history.goBack();
    }

    const renderAction = (action) => {
        switch (action) {
            case 'detail':
                return <>
                <ProjectItem {...project.results[0]} setProjects={setProject} ProjectDetail handleSetEdit={handleSetEdit} />;     
                <DocumentationPage {...project.results[0]}/>
                </>
            case 'create':
                return <ProjectItemCrud handleSetEdit={handleSetEdit} handleSetDetail={handleSetDetail}/>;
            case 'edit':
                return <ProjectItemCrud {...project.results[0]} EditMode handleSetDetail={handleSetDetail}/>;
            default: // "broken link" by default
                return null
        };
    };

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

    const handleSetDetail = ( ) => { // do not use event
//        event.preventDefault();
        setAction('detail');
    };

    const handleSetCreate = () => { // do not use event
//        event.preventDefault();
        setAction('create');
    };

    const handleSetEdit = ( ) => { // do not use event
//        event.preventDefault();
//        setAction('edit');
        history.push(`/edit/${id}`)
    }

// AlignForPhone: Moving Go Back button to the bottom for phone view
    return (<div className={`${Styles.ProjectDetailContainer}`}>

        <div className={`${hasLoaded ? Styles.Reveal : Styles.Withhold}`}>
            <button
            onClick={handleGoBack}
            className={`${Styles.BackToBrowseButton} ${windowDimension === "phone" ? Styles.BackToBrowseButton_AlignForPhone: Styles.BackToBrowseButton_AlignForAnyDesktop}`}
            >
                Go back
            </button>

            <p>action: {action}</p>

            <div className={getClassName()}>
                {renderAction(action)}
            </div>
        </div>
    </div>)
};

export default ProjectDetail;
