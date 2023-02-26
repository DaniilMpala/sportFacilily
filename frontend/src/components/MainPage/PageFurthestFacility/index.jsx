import React from "react";
import styles from "./index.module.css";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import strelokSvg from '../../../assets/style/image/strelokSvg.svg'

export default ({ furthestFacility, avgDistance }) => {
    furthestFacility = furthestFacility ? JSON.parse(furthestFacility) : {}

    return (
        <div className={styles.PageFurthestFacility}>
            <div className={styles.blockPageFurthestFacility}>
                <div className={styles.info}>
                    <img src={strelokSvg} />
                    <div className={styles.titleDesc}>
                        <h3>Самый дальний спортивный объет находится в {furthestFacility["Населённый_пункт"]}</h3>
                        <span>От центра москвы расстояние составляет {Math.floor(furthestFacility["distance"])}км.</span>
                    </div>
                    <div className={styles.circleWhite}>
                        <span>Среднее расстояния между объектами составило {Math.floor(avgDistance)}км</span>
                    </div>
                </div>

                <YMaps >
                    <div className={styles.map}>
                        <Map className={styles.mapMap} defaultState={{ center: [furthestFacility["Яндекс_координата_центра_Y"], furthestFacility["Яндекс_координата_центра_X"]], zoom: 16 }} >
                            <Placemark geometry={[furthestFacility["Яндекс_координата_центра_Y"], furthestFacility["Яндекс_координата_центра_X"]]} options={{
                                preset: 'islands#redDotIcon', // Иконка точки
                            }} />
                        </Map>
                    </div>
                </YMaps>
            </div>
        </div>


    );
};
