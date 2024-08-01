import React, { useEffect, useState } from "react";
import { axiosReq } from "../../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../../utils/utils";
import { useCurrentUser } from "../../../contexts/currentUserContext";
// styles
import Styles from "../../../styles/ProjectList.module.css";
import "../../../global.css";
import AnimatedContainer from "../../../components/AnimatedContainer";

const ProjectList = ({ message, filter = "" }) => {

    const [projects, setProjects] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    // eslint-disable-next-line
    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchProjects = async () => { // "extra logic"
            try {
                const { data } = await axiosReq.get(`/projects/?${filter}search=${query}`);
                setProjects(data);
                setHasLoaded(true);
            } catch (err) {

            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchProjects();
        }, 0);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, currentUser]);

    return(<>
        <AnimatedContainer hasLoaded={hasLoaded}>
            <div className={Styles.ProjectListContainer}>
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
        </AnimatedContainer>
    </>)
};

export default ProjectList;
