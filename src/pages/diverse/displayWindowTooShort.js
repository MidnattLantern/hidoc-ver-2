import React from 'react';
import Styles from "../../styles/displayWindowTooShort.module.css";
import "../../global.css";

const DisplayWindowTooShort = () => {

    return (
        <div className={Styles.DisplayWindowTooShortContainer}>
            <div className={Styles.CenterContent}>
                <h1 className={Styles.Header}>HiDoc</h1>
                <p className={Styles.Message}>scale up the window</p>
            </div>
        </div>
    )
};

export default DisplayWindowTooShort;
