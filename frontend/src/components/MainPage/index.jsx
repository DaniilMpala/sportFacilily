import React from "react";
import get from "../../utils/get";
import styles from "./index.module.css";
import PageFinancing from "./PageFinancing";
import PageFurthestFacility from "./PageFurthestFacility";
import PageMain from "./PageMain"
import PageMaps from "./PageMaps"
import PageMostFacility from "./PageMostFacility";
import PageMostFacilityBuilds from "./PageMostFacilityBuilds";


export default () => {
    const [stats, setStats] = React.useState([])

    React.useEffect(() => {
        getStats()
    }, [])

    const getStats = async () => {
        let data = await get('/api/getStats', { table: 'statsSportObject' })

        setStats(data)

        console.log(data)
    }

    const findValue = (name) => stats.find(e => e.name == name)?.value

    return (
        <main className={styles.mainLending}>
            <PageMain
                allSportObject={findValue('Всего записей')}
            />
            <PageMaps />
            <PageMostFacility
                yearBuilding={findValue('Колиство построенных объектов по годам')}
                most={findValue('Больше всего')}
                bestYear={findValue('Год постройки больше всего объектов')}
                lessYear={findValue('Год постройки меньше всего объектов')}
            />
            <PageFinancing
                dataFCP={findValue('Данные по ФЦП')}
                allFinance={findValue('Общая сумма финансирования')}
                mostFinance={findValue('Финансирование по годам')}
                avgFinance={findValue('Среднее финансирование на каждый объект составила')}
                mostFinanceYear={findValue('Больше всего финансовая помощь')}
            />
            <PageMostFacilityBuilds 
                lastBuild={findValue('Последняя постройка')}
                mostFacility={findValue('Больше всего')}
                yearBuilding={findValue('Колиство построенных объектов по годам')}
            />
            <PageFurthestFacility
                avgDistance={findValue('Среднее расстояние между двумя кратчайшими объектами')}
                furthestFacility={findValue('Дальше всего находится от москвы')}
            />

        </main>

    );
};
