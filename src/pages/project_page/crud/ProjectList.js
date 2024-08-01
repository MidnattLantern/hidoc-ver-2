import React, { useEffect, useState } from "react";
import { axiosReq } from "../../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../../utils/utils";
import { useCurrentUser } from "../../../contexts/currentUserContext";
// styles
import Styles from "../../../styles/ProjectList.module.css";
import "../../../global.css";

const ProjectList = ({ message, filter = "" }) => {
    // animation
    const [animateOpening, setAnimateOpening] = useState(false);

    const [projects, setProjects] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    // eslint-disable-next-line
    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();

    useEffect(() => {
        setAnimateOpening(true);
        const fetchProjects = async () => {
            try {
                const { data } = await axiosReq.get(`/projects/?${filter}search=${query}`);
                setProjects(data);
                setTimeout(() => { // Adding artificial delay
                    setHasLoaded(true);
                }, 0); // delay in miliseconds
            } catch (err) {

            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchProjects();
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, currentUser]);

    return(<>
        <div className={Styles.ProjectListContainer}>
            <div className={`${Styles.AnimateOpening} ${animateOpening ? Styles.Expand : ''}`}>
                {hasLoaded ? (
                    <>
                        {projects?.results?.length ? (
                            <InfiniteScroll
                                children={
                                    projects.results.map((post) => (
                                        <p>item: {post.id}</p>
                                    ))
                                }
                                dataLength={projects.results.length}
                                loader={"Loading..."}
                                hasMore={!!projects.results.next}
                                next={() => fetchMoreData(projects, setProjects)}
                            />
                        ) : null}
                    </>
                ) : null}
            </div>

        <div className={`${Styles.AnimateOpeningLogo} ${animateOpening ? Styles.FadeOut : null}`}>
            HiDoc
        </div>
        {hasLoaded ? null : <div className={Styles.AnimateOpeningLoader}>
            <p>Loading...</p>
        </div>}
    </div>

    </>)
};

export default ProjectList;
