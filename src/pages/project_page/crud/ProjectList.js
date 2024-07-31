import React, { useEffect, useState } from "react";
import { axiosReq } from "../../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../../utils/utils";
import { useCurrentUser } from "../../../contexts/currentUserContext";
// styles
import Styles from "../../../styles/ProjectList.module.css";
import "../../../global.css";

const ProjectList = ({ message, filter = "" }) => {
    const [projects, setProjects] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchProjects = async () => {
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
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, currentUser]);

    return(<>
        <div className={Styles.ProjectListContainer}>

        {hasLoaded ? (
                    <>
                        {projects?.results?.length ? (
                            <InfiniteScroll
                                children={
                                    projects.results.map((post) => (
                                        <p>item</p>
                                    ))
                                }
                                dataLength={projects.results.length}
                                loader={"Loading..."}
                                hasMore={!!projects.results.next}
                                next={() => fetchMoreData(projects, setProjects)}
                            />

                        ) : (
                            <div>
                                <p>walshie</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <p> loading projects... </p>
                    </div>
                )}

        </div>
    </>)
};

export default ProjectList;
