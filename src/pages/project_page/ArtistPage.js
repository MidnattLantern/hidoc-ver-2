import React, { useState } from "react";
// styles
import Styles from "../../styles/ArtistPage.module.css";
import "../../global.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AnimatedContainer from "../../components/AnimatedContainer";

const ArtistPage = () => {
    const [hasLoaded, setHasLoaded] = useState(true);
    const { id } = useParams();
    
    return( <AnimatedContainer hasLoaded={hasLoaded}>
        <div className={Styles.ArtistPageContainer}>
            <h1>Artist {id} </h1>
        </div>
    </AnimatedContainer>)
};

export default ArtistPage;
