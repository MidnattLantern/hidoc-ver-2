import React, { useContext, useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/currentUserContext";
import AnimatedContainer from "../../components/AnimatedContainer";
// styles
import Styles from "../../styles/ProjectList.module.css";
import "../../global.css";
//components
import ProjectItem from "./ProjectItem";
import ArtistHeader from "./ArtistHeader";
import { ResponsiveWindowContext } from "../../contexts/responsiveWindowContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProjectList = ({ filter = "", ArtistLibrary, WatchListLibrary }) => {
    const { windowDimension } = useContext(ResponsiveWindowContext);
    const [projects, setProjects] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    // eslint-disable-next-line
    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();
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
        const fetchProjects = async () => { // "extra logic"
            if (ArtistLibrary) {
                try { // for artist page
                    const {data} = await axiosReq.get(`/projects/?owner__artaccount=${id}&page=${page}&watching_project__owner__artaccount=`);
                    setProjects(data);
                    setNextPage(data.next !== null); // in place of InfiniteScroll
                    setPreviousPage(data.previous !== null); // in place of InfiniteScroll
                    setHasLoaded(true)
                } catch(err) {

                }
            } else if (WatchListLibrary) { // for watch list page
                try { // for artist page
                    const {data} = await axiosReq.get(`/projects/?watching_project__owner__artaccount=${currentUser?.pk}&owner__artaccount=`);
                    setProjects(data);
                    setNextPage(data.next !== null); // in place of InfiniteScroll
                    setPreviousPage(data.previous !== null); // in place of InfiniteScroll
                    setHasLoaded(true)
                } catch(err) {

                }
            }else {
                try { // browse page by default
                    const { data } = await axiosReq.get(`/projects/?page=${page}`);
                    setProjects(data);
                    setNextPage(data.next !== null); // in place of InfiniteScroll
                    setPreviousPage(data.previous !== null); // in place of InfiniteScroll
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
    }, [filter, query, currentUser, ArtistLibrary, id, page]);

    return(<>
        <AnimatedContainer hasLoaded={hasLoaded}>
            {ArtistLibrary ? 
                <ArtistHeader />
            : null}

            <div className={`${Styles.ProjectListContainer}`}>
                <div className={`${windowDimension === "bigDesktop" ? Styles.Gallery : null}`}>
                    {projects.results.map((post) => (<>

                        <InfiniteScroll
                        dataLength={projects.results.length}
                        next={() => fetchMoreData()}
                        hasMore={!!projects.results.next}
                        loader={<p>Loading...</p>}
                        endMessage={null}
                        >
                            <div>
                                {ArtistLibrary ? (<>

                                    <ProjectItem
                                    key={post.id} {...post}
                                    ArtistLibrary
                                    />

                                </>):(<>

                                    <ProjectItem
                                    key={post.id} {...post}
                                    />                                    

                                </>)}
                            </div>
                        </InfiniteScroll>

                    </>))}
                </div>
            </div>

            <div className={`${Styles.PageTurnContainer} ${windowDimension === "phone" ? Styles.PageTurnContainerPhone : null}`}>
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

        </AnimatedContainer>

    </>)
};

export default ProjectList;
