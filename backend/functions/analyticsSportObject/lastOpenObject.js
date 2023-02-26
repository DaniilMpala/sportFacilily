import db from "../../connections/bd.js"

export default async () => {
    let data = await db.all(`
        SELECT id, "Дата_завершения_строительства_/_реконструкции", "Тип_спортивного_комплекса", "Дата_начала_строительства_/_реконструкции"
        FROM sportObject 
        WHERE 
            "Дата_завершения_строительства_/_реконструкции" LIKE '%.%'
    `)

    data = data.map(obj => {
        if (!obj["Дата_завершения_строительства_/_реконструкции"]) return obj
        if (!obj["Дата_начала_строительства_/_реконструкции"]) return obj

        let [day, month, year] = obj["Дата_завершения_строительства_/_реконструкции"].split(".");
        let [day_start, month_start, year_start] = obj["Дата_начала_строительства_/_реконструкции"].split(".");

        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const date_start = new Date(parseInt(year_start), parseInt(month_start) - 1, parseInt(day_start));
        return { ...obj, "Дата_завершения_строительства_/_реконструкции": date, "Дата_начала_строительства_/_реконструкции": date_start }
    })

    data = data.sort((a, b) => a["Дата_завершения_строительства_/_реконструкции"] < b["Дата_завершения_строительства_/_реконструкции"] ? 1 : -1)

    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Последняя постройка', 
        '${JSON.stringify({
            ...data[0],
            "Строился в течение": new Date(data[0]["Дата_завершения_строительства_/_реконструкции"]).getTime() - new Date(data[0]["Дата_начала_строительства_/_реконструкции"]).getTime()
        })}'
    );`)

}