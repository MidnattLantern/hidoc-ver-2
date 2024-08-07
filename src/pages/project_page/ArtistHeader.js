import React, { useEffect, useState } from "react";
import {axiosReq} from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/currentUserContext";
// Styles
import Styles from "../../styles/ArtistHeader.module.css";
import "../../global.css";

const ArtistHeader = () => {
    const {id} = useParams();
    const currentUser = useCurrentUser();
    const [artistData, setArtistData] = useState();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axiosReq.get(`/art-accounts/${id}/`)
                setArtistData(data);
                console.log("got data:", data)
            } catch (err) {

            }
        };
        fetchData();
    }, [id]);

    const handleRedirectToCreate = () => {
        history.push("/project/create/_");
    }

    return(<div className={Styles.ArtistHeaderContainer}>
        <h1>{artistData?.owner}</h1>
        <p>projects: {artistData?.projects_count}</p>
        {(currentUser?.pk.toString()) === id ?
            <button onClick={handleRedirectToCreate}>Create project</button>
        :
            <p>watch artist</p>
        }
    </div>)
};

export default ArtistHeader;
