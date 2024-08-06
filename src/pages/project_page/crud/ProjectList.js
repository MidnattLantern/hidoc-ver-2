import React, { useContext, useEffect, useState } from "react";
import { axiosReq } from "../../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../../utils/utils";
import { useCurrentUser } from "../../../contexts/currentUserContext";
import AnimatedContainer from "../../../components/AnimatedContainer";
// styles
import Styles from "../../../styles/ProjectList.module.css";
import "../../../global.css";
//components
import ProjectItem from "../ProjectItem";
import ArtistHeader from "../ArtistHeader";
import { ResponsiveWindowContext } from "../../../contexts/responsiveWindowContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProjectList = ({ message, filter = "", ArtistLibrary }) => {
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const [projects, setProjects] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    // eslint-disable-next-line
    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();
    const {id} = useParams();

    useEffect(() => {
        const fetchProjects = async () => { // "extra logic"
            if (ArtistLibrary) {
                try { // for artist page
                    const {data} = await axiosReq.get(`/projects/?watching_project__owner__artaccount=&owner__artaccount=${id}`);
                    setProjects(data);
                    setHasLoaded(true)
                } catch(err) {

                }
            } else {
                try { // browse page by default
                    const { data } = await axiosReq.get(`/projects/?${filter}search=${query}`);
                    setProjects(data);
                    setHasLoaded(true);
                } catch (err) {

                }
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchProjects();
        }, 0);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, currentUser, ArtistLibrary, id]);

    return(<>
        <AnimatedContainer hasLoaded={hasLoaded}>
            {ArtistLibrary ? 
                <ArtistHeader />
            : null}

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
                            {ArtistLibrary ? 
                                <ProjectItem
                                key={post.id} {...post}
                                ArtistLibrary
                                />
                             : 
                                <ProjectItem
                                key={post.id} {...post}
                                />
                            }
                        </div>
                    </InfiniteScroll>
                </>))}
                </div>
            </div>
        </AnimatedContainer>
    </>)
};

export default ProjectList;
