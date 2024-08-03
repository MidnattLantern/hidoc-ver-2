import React from "react";
// styles
import Styles from "../../styles/PilotPage.module.css";
import "../../global.css";

const PilotPage = () => {
    return (<div className={Styles.PilotPageContainer}>
        <div className={Styles.Responsive}>
            <div className={Styles.Frame}>
                <div className={Styles.PlaceholderItemA}/>
            </div>
            <div className={Styles.Frame}>
                <div className={Styles.PlaceholderItemB}/>
            </div>
            <div className={Styles.Frame}>
                <div className={Styles.PlaceholderItemB}/>
            </div>
            <div className={Styles.Frame}>
                <div className={Styles.PlaceholderItemA}/>
            </div>
            <div className={Styles.Frame}>
                <div className={Styles.PlaceholderItemC}/>
            </div>
            <div className={Styles.Frame}>
                <div className={Styles.PlaceholderItemA}/>
            </div>
        </div>
    </div>);
};


export default PilotPage