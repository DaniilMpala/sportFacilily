import React from "react";
import styles from "./index.module.css";

import arrowDown from '../../../assets/style/image/arrowDown.png'
import basketImg from '../../../assets/style/image/basketImg.svg'

export default ({allSportObject}) => {
    return (
        <div className={styles.firstLending}>
            <h1 className={styles.title}>Спортивные<br />объекты</h1>
            <div className={styles.circleWhite + ' ' + styles.prokrutka}>
                <div className={styles.downScroll}>
                    <img src={arrowDown} />
                    <span>Карта объектов</span>
                </div>

            </div>
            <div className={styles.mainImg} >
                <img className={styles.basketImg} src={basketImg} />
                <div className={styles.circleWhiteRight}>
                    <span>Всего {allSportObject} спортивных комплексов</span>
                </div>
            </div>

        </div>

    );
};
