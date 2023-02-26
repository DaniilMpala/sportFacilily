import db from "../../connections/bd.js"

export default async () => {
    let data = await db.all(`
        SELECT "Общий_объём_финансирования", "Дата_завершения_строительства_/_реконструкции", "ФЦП_(федеральная_целевая_программа)"
        FROM sportObject 
        WHERE 
            "Дата_завершения_строительства_/_реконструкции" LIKE '%.%' AND
            "Общий_объём_финансирования" > 0
    `)


    data = data.map(obj => {
        if (!obj["Дата_завершения_строительства_/_реконструкции"]) return obj

        let [, , year] = obj["Дата_завершения_строительства_/_реконструкции"].split(".");

        year = parseInt(year)

        if (year < 1900)
            year += 2000

        return { ...obj, "Год": year }
    })


    let allFinance = 0
    const valuesArray = Object.values(data);
    const mostYear = [];
    const forPrograms = {};
    valuesArray.forEach(obj => {
        mostYear.push({ year: obj["Год"], value: obj["Общий_объём_финансирования"] })

        allFinance += obj["Общий_объём_финансирования"]


        forPrograms[obj["ФЦП_(федеральная_целевая_программа)"]] = {
            count: (forPrograms[obj["ФЦП_(федеральная_целевая_программа)"]]?.count || 0) + 1,
            summa: obj["Общий_объём_финансирования"] + (forPrograms[obj["ФЦП_(федеральная_целевая_программа)"]]?.summa || 0)
        };

    });
    const maxYear = mostYear.reduce((prev, current) => (prev.value > current.value) ? prev : current);
    const maxFacilityForPrograms = Object.entries(forPrograms).reduce((prev, current) => (prev[1].count > current[1].count) ? prev : current);
    // const mostFrequentYear = Object.keys(counts).find(key => counts[key] === maxYear);


    // let moastYear = { year: 0, value: 0 }
    const resultEveryYear = data.reduce((all, cur) => {
        // if (moastYear.value < cur["Общий_объём_финансирования"]) {
        //     moastYear = { year: cur["Год"], value: cur["Общий_объём_финансирования"] }
        // }


        all[cur["Год"]] ? (all[cur["Год"]] += cur["Общий_объём_финансирования"]) : (all[cur["Год"]] = cur["Общий_объём_финансирования"])

        return all
    }, {});
    // console.log(forPrograms)
    // await db.run(`REPLACE INTO statsSportObject (name, value) VALUES ('Год постройки меньше всего объектов', ${lowFrequentYear});`)
    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Данные по ФЦП', 
        '${JSON.stringify(maxFacilityForPrograms)}'
    );`)
    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Больше всего финансируемых объектов по программе', 
        '${JSON.stringify(forPrograms)}'
    );`)
    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES ('Общая сумма финансирования', ${allFinance});`)
    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES ('Среднее финансирование на каждый объект составила', ${allFinance / data.length});`)
    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Больше всего финансовая помощь', 
        '${JSON.stringify(maxYear)}'
        );`)
    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Финансирование по годам', 
        '${JSON.stringify(resultEveryYear)}'
    );`)
}