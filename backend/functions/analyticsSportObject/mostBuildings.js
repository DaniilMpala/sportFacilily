import db from "../../connections/bd.js"

export default async () => {
    let data = await db.all(`
        SELECT id, "Дата_завершения_строительства_/_реконструкции", "Тип_спортивного_комплекса" 
        FROM sportObject 
        WHERE 
            "Дата_завершения_строительства_/_реконструкции" LIKE '%.%'
    `)


    data = data.map(obj => {
        if (!obj["Дата_завершения_строительства_/_реконструкции"]) return obj

        let [, , year] = obj["Дата_завершения_строительства_/_реконструкции"].split(".");

        year = parseInt(year)

        if (year < 1900)
            year += 2000

        return { ...obj, "Год": year }
    })


    const valuesArray = Object.values(data);
    const counts = {};
    valuesArray.forEach(obj => {
        counts[obj["Год"]] = (counts[obj["Год"]] || 0) + 1;
    });
    const maxYear = Math.max(...Object.values(counts));
    const mostFrequentYear = Object.keys(counts).find(key => counts[key] === maxYear);

    const minYear = Math.min(...Object.values(counts));
    const lowFrequentYear = Object.keys(counts).find(key => counts[key] === minYear);

    // console.log(minYear, lowFrequentYear)


    // const result = data.reduce((all, cur) => {
    //     if (cur["Год"] == mostFrequentYear)
    //         all[cur["Тип_спортивного_комплекса"]] ? (all[cur["Тип_спортивного_комплекса"]]++) : (all[cur["Тип_спортивного_комплекса"]] = 1)

    //     return all
    // }, {});

    const resultEveryYear = data.reduce((all, cur) => {
        !all[cur["Год"]] && (all[cur["Год"]] = {})

        if (cur["Тип_спортивного_комплекса"])
            all[cur["Год"]][cur["Тип_спортивного_комплекса"]] ? (all[cur["Год"]][cur["Тип_спортивного_комплекса"]]++) : (all[cur["Год"]][cur["Тип_спортивного_комплекса"]] = 1)

        return all
    }, {});

    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES ('Год постройки меньше всего объектов', ${lowFrequentYear});`)
    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES ('Год постройки больше всего объектов', ${mostFrequentYear});`)

    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Колиство построенных объектов по годам', 
        '${JSON.stringify(resultEveryYear)}'
    );`)
    // console.log(result)
}