import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// styles
import Styles from "../../styles/DocumentationList.module.css";
import "../../global.css";
import { axiosReq } from "../../api/axiosDefaults";


const DocumentationList = () => {
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
        <p>found {documentations.results.length} items</p>
    </div>)
};

export default DocumentationList;
