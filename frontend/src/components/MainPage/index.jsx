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
                allSportObject={findValue('Всего построенных объектов')}
            />
            <PageMaps />
            <PageMostFacility
                yearBuilding={findValue('Количество построенных объектов по годам')}
                most={findValue('Количество спортивных объектов')}
                bestYear={findValue('Год постройки больше всего объектов')}
                lessYear={findValue('Год, в котором было возведено наименьшее количество объектов')}
            />
            <PageFinancing
                dataFCP={findValue('Данные по ФЦП')}
                allFinance={findValue('Общая сумма финансирования')}
                mostFinance={findValue('Финансирование по годам')}
                avgFinance={findValue('Среднее финансирование на каждый объект')}
                mostFinanceYear={findValue('Наибольшая финансовая помощь, год')}
            />
            <PageMostFacilityBuilds 
                lastBuild={findValue('Данные о последнем построившимся спортивном объекте')}
                mostFacility={findValue('Количество спортивных объектов')}
                yearBuilding={findValue('Количество построенных объектов по годам')}
            />
            <PageFurthestFacility
                avgDistance={findValue('Среднее расстояние между двумя кратчайшими объектами')}
                furthestFacility={findValue('Дальше всего находится от москвы')}
            />

        </main>

    );
};
