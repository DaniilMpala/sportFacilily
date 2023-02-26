import db from "../../connections/bd.js"

export default async () => {
    let data = await db.all(`
        SELECT "Тип_спортивного_комплекса" 
        FROM sportObject 
    `)

    data = data.reduce((all, cur) => {
        if (all[cur["Тип_спортивного_комплекса"]])
            all[cur["Тип_спортивного_комплекса"]]++
        else
            all[cur["Тип_спортивного_комплекса"]] = 1

        return all
    }, {})

    data = Object.entries(data).sort((a, b) => a[1] < b[1] ? 1 : -1)

    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Количество спортивных объектов', 
        '${JSON.stringify(data)}'
    );`)

    console.log(new Date(), 'Отработал mostObject')
}