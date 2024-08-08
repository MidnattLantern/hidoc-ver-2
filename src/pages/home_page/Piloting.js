import React, { useEffect, useState } from "react";
// Styles
import Styles from "../../styles/Piloting.module.css";
import "../../global.css";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const Piloting = ({ filter = ""}) => {
    // eslint-disable-next-line
    const [projects, setProjects] = useState({ results: [] });
        // eslint-disable-next-line
    const [query, setQuery] = useState("");

    const fetchProjects = async () => {
        try {
            const { data } = await axiosReq.get(`/projects`);
            setProjects(data);
        } catch (err) {

        }
    };

    useEffect(() => {
        fetchProjects();
    }, [filter, query]);

    return(<div className={Styles.PilotingContainer}>
        <hr/>
        <p>found: {projects.results.length} items</p>

        <InfiniteScroll
        dataLength={projects.results.length}
        loader={<p>Loading...</p>}
        hasMore={!!projects.next}
        next={() => fetchMoreData(projects, setProjects)}
        >
            {projects.results.map((post) => (<>
            <hr/>
            <p>item {post?.id}</p>
            </>))}
        </InfiniteScroll>

    </div>)
};

export default Piloting;
