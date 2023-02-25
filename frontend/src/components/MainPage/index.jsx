import React from "react";
import get from "../../utils/get";
import styles from "./index.module.css";
import PageMain from "./PageMain"
import PageMaps from "./PageMaps"


export default () => {
    const [stats, setStats] = React.useState([])

    React.useEffect(() => {
        getStats()
    }, [])

    const getStats = async () => {
        let data = await get('/api/getStats', {table:'statsSportObject'})

        setStats(data)

        console.log(data)
    }

    const findValue = (name) => stats.find(e => e.name == name)?.value || '...'

    return (
        <main className={styles.mainLending}>
            <PageMain allSportObject={findValue('Всего записей')} />
            <PageMaps />
        </main>

    );
};
