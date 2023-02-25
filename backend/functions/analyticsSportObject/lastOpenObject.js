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

        let [day, month, year] = obj["Дата_завершения_строительства_/_реконструкции"].split(".");

        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return { ...obj, "Дата_завершения_строительства_/_реконструкции": date }
    })

    data = data.sort((a, b) => a["Дата_завершения_строительства_/_реконструкции"] < b["Дата_завершения_строительства_/_реконструкции"] ? 1 : -1)

    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Последняя постройка', 
        '${JSON.stringify(data[0])}'
    );`)

}