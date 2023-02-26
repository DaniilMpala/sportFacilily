import React from "react";
import styles from "./index.module.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

import badmintonSvg from '../../../assets/style/image/badmintonSvg.svg'
import formatDate from "../../../utils/formatDate";
import convertMillisecondsToYears from "../../../utils/convertMillisecondsToYears";
import getRandomColor from "../../../utils/getRandomColor";

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Количество построенных зданий по названию постройки',
            fontSize: 16,
        },
    },
};
export default ({ lastBuild, mostFacility, yearBuilding }) => {

    const yearBuildingObject = yearBuilding ? JSON.parse(yearBuilding) : []

    lastBuild = lastBuild ? JSON.parse(lastBuild) : {}
    mostFacility = mostFacility ? JSON.parse(mostFacility) : [[]]
    yearBuilding = yearBuilding ? Object.entries(yearBuildingObject) : []

    const [year, setYear] = React.useState();
    const [dataBuild, setDataBuild] = React.useState({});

    React.useEffect(() => {
        //Ждем пока подгрузятся данные
        if (yearBuilding.length != 0 && !year)
            setYear(yearBuilding[0][0])
    }, [yearBuilding])

    React.useEffect(() => {

        if (yearBuildingObject[year]) {
            let arrayFacilitysInfo = Object.entries(yearBuildingObject[year])

            setDataBuild({
                labels: arrayFacilitysInfo.map(el => el[0]),
                datasets: [
                    {
                        label: 'Количество построенных зданий',
                        data: arrayFacilitysInfo.map(el => el[1]),
                        backgroundColor: arrayFacilitysInfo.map(el => getRandomColor()),
                    },
                ],
            })
        }
    }, [year])


    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <div className={styles.PageMostFacilityBuilds}>
            <div className={styles.blockPageMostFacilityBuilds}>
                <div className={styles.info}>
                    <div className={styles.mainInfo}>
                        <img className={styles.infoBadmintonSvg} src={badmintonSvg} />
                        <h3 className={styles.right}>Последний {lastBuild["Тип_спортивного_комплекса"]} был построен {formatDate(lastBuild["Дата_завершения_строительства_/_реконструкции"])}.</h3>
                        <span>Строительство продолжалось {convertMillisecondsToYears(lastBuild["Строился в течение"])} год(а).</span>
                    </div>

                    <div className={styles.UpInfo}>

                        <div>
                            <h3>Больше всего {mostFacility[0][0]}.</h3>
                            <span>Их насчитывается {mostFacility[0][1]} шт.</span>
                        </div>

                    </div>

                    <div className={styles.DownInfo}>
                        {/* <div className={styles.circleWhiteDown} /> */}
                        <div className={styles.DownInfoText}>
                            <h3>В {year} году</h3>
                            <ul>
                                {yearBuildingObject[year] ? Object.entries(yearBuildingObject[year]).slice(0, 5).map(el => <li>{el[0]} - {el[1]}</li>) : <li>Нету данных</li>}
                            </ul>
                        </div>
                    </div>
                </div>
                {year && Object.keys(dataBuild).length
                    ? <div className={styles.graffic}>
                        <div className={styles.grafficDiv}>
                            <Doughnut data={dataBuild} options={options} />
                            <div>
                                <label htmlFor="year">Выберите год постройки: {year}</label>
                                <input className={styles.slider} type="range" id="year" name="year" min={yearBuilding.at(0)[0]} max={yearBuilding.at(-1)[0]} value={year} onChange={handleYearChange} />
                            </div>
                        </div>
                    </div>
                    : ''
                }

            </div>
        </div>
    );
};
