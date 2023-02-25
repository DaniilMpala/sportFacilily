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
    const counts = {};
    const forPrograms = {};
    valuesArray.forEach(obj => {
        counts[obj["Год"]] = (counts[obj["Год"]] || 0) + 1;

        allFinance += obj["Общий_объём_финансирования"]


        forPrograms[obj["ФЦП_(федеральная_целевая_программа)"]] = {
            count: (forPrograms[obj["ФЦП_(федеральная_целевая_программа)"]]?.count || 0) + 1,
            summa: obj["Общий_объём_финансирования"] + (forPrograms[obj["ФЦП_(федеральная_целевая_программа)"]]?.summa || 0)
        };

    });
    const maxYear = Math.max(...Object.values(counts));
    const mostFrequentYear = Object.keys(counts).find(key => counts[key] === maxYear);



    const resultEveryYear = data.reduce((all, cur) => {
        all[cur["Год"]] ? (all[cur["Год"]] += cur["Общий_объём_финансирования"]) : (all[cur["Год"]] = cur["Общий_объём_финансирования"])

        return all
    }, {});
    // console.log(forPrograms)
    // await db.run(`REPLACE INTO statsSportObject (name, value) VALUES ('Год постройки меньше всего объектов', ${lowFrequentYear});`)
    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Данные по ФЦП', 
        '${JSON.stringify(forPrograms)}'
    );`)

    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES ('Среднее финансирование на каждый объект составила', ${allFinance / data.length});`)

    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Финансирование по годам', 
        '${JSON.stringify(resultEveryYear)}'
    );`)
}