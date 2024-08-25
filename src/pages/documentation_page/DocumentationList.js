import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { Card } from "react-bootstrap"; // must be card or the whole image won't be displayed
// styles
import Styles from "../../styles/DocumentationList.module.css";
import "../../global.css";

const DocumentationList = ({ owner, switchToDetail, setSelectedDocumentation}) => { // the owner argument is acquired by parent DocumentationPage.js

    const currentUser = useCurrentUser();

    const [documentations, setDocumentations] = useState({ results: [] });
    const {id} = useParams();

        // in place of InfiniteScroll
        const [page, setPage] = useState(1);
        const [nextPage, setNextPage] = useState(true);
        const [previousPage, setPreviousPage] = useState(true);
        // in place of InfiniteScroll
        const handleGetNext = (event) => {
            event.preventDefault();
            setPage(page + 1);
        }
        const handleGetPrevious = (event) => {
            event.preventDefault();
            setPage(page - 1);
        }

        useEffect(() => {
            const fetchDocumentations = async () => {
                try {
                    const {data} = await axiosReq.get(`/documentations/?project=${id}&page=${page}`)
                    setDocumentations(data);
                    setNextPage(data.next !== null);
                    setPreviousPage(data.previous !== null);
                } catch(err) {

                }
            };
            fetchDocumentations();
        }, [id, page]);

    return(<div className={Styles.DocumentationListContainer}>

        {documentations.results.map((documentation) => (<>

            <div className={Styles.DocumentationFrame}>
                <div className={Styles.DocumentationImage}>
                    <Card.Img
                    src={documentation.documentation_image}
                    />
                </div>
                {owner === currentUser?.username ? (<>
                    <button onClick={() => {setSelectedDocumentation(documentation.id); switchToDetail()}} className={Styles.CreateEditButton}> Edit documentation</button>
                </>) : (<>
                    <button onClick={() => {setSelectedDocumentation(documentation.id); switchToDetail()}} className={Styles.CreateEditButton}> View documentation </button>
                </>)}
            </div>
        </>))}
            <div className={`${Styles.PageTurnContainer}`}>
                {previousPage ? (<>
                    <button className={`${Styles.PageTurnButton} ${Styles.PagePreviousExists}`} onClick={handleGetPrevious}>previous</button>
                </>) : (<>
                    <button className={`${Styles.PageTurnButton}`} onClick={(event) => {event.preventDefault()}}>previous</button>
                </>)}

                {nextPage ? (<>
                    <button className={`${Styles.PageTurnButton} ${Styles.PageNextExists}`} onClick={handleGetNext}>next</button>
                </>) : (<>
                    <button className={`${Styles.PageTurnButton}`} onClick={(event) => {event.preventDefault()}}>next</button>
                </>)}
            </div>
    </div>)
};

export default DocumentationList;
