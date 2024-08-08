import React, { useEffect, useState } from "react";
// Styles
import Styles from "../../styles/Piloting.module.css";
import "../../global.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Piloting = ({ filter = ""}) => {
    // eslint-disable-next-line
    const [projects, setProjects] = useState({ results: [] });
        // eslint-disable-next-line
    const [query, setQuery] = useState("");
    const { pathname } = useLocation();

    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(true);
    const [previousPage, setPreviousPage] = useState(true);

    const handleGetNext = (event) => {
        event.preventDefault();
        setPage(page + 1);
    }
    const handleGetPrevious = (event) => {
        event.preventDefault();
        setPage(page - 1);
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await axiosReq.get(`/projects/?page=${page}`);
                setProjects(data);

                setNextPage(data.next !== null);
                setPreviousPage(data.previous !== null);
            } catch (err) {
    
            }
        };
        fetchProjects();
    }, [filter, query, pathname, page]);

    return(<div className={Styles.PilotingContainer}>
        <hr/>
        <p>found: {projects.results.length} items</p>

        {projects.results.length ? (
            projects.results.map((project) => (<>
                <hr/>
                <p>item: {project?.id}</p>
            </>))
        ) : null }

    <p>current page: {page}</p>

    {previousPage ? (<>
        <button onClick={handleGetPrevious}>previous</button>
    </>) : null}
    {nextPage ? (<>
        <button onClick={handleGetNext}>next</button>
    </>) : null}

    </div>)
};

export default Piloting;
