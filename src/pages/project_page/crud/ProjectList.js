import React, { useContext, useEffect, useState } from "react";
import { axiosReq } from "../../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../../utils/utils";
import { useCurrentUser } from "../../../contexts/currentUserContext";
// styles
import Styles from "../../../styles/ProjectList.module.css";
import "../../../global.css";
import AnimatedContainer from "../../../components/AnimatedContainer";
import ProjectItem from "../ProjectItem";
import { ResponsiveWindowContext } from "../../../contexts/responsiveWindowContext";

const ProjectList = ({ message, filter = "" }) => {
    const { windowDimension } = useContext(ResponsiveWindowContext);

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
            <div className={`${Styles.ProjectListContainer}`}>
                <div className={`${windowDimension === "bigDesktop" ? Styles.Responsive : null}`}>

                {projects.results.map((post) => (<>
                <InfiniteScroll
                dataLength={projects.results.length}
                next={() => fetchMoreData()}
                hasMore={!!projects.results.next}
                loader={<div>Loading...</div>}
                endMessage={<div>No more items</div>}
                >
                    <div className={`${Styles.Frame} ${windowDimension === "bigDesktop" ? Styles.ResponsiveFrame : null}`}>
                        <ProjectItem
                        key={post.id} {...post}
                        />
                    </div>
                </InfiniteScroll>
                </>))}

                </div>
            </div>
        </AnimatedContainer>
    </>)
};

export default ProjectList;
