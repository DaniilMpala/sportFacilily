import db from "../../connections/bd.js"

export default async ({ table }) => {
    if (!table)
        return { success: false, message: "Не выбрана таблица" }

    table = table.trim()

    if (!/[a-z0-9_]*/.test(table.toLowerCase()))
        return { success: false, message: "Недопустимое название таблицы" }


    let data = await db.all(`
        SELECT 
            id,
            "Название", 
            "Краткое_описание", 
            "Дата_завершения_строительства_/_реконструкции",
            "Тип_спортивного_комплекса" ,
            "Виды_спорта",
            "Контактный_телефон_объекта",
            "Адрес",
            "Яндекс_координата_центра_X",
            "Яндекс_координата_центра_Y"
        FROM ${table}
        WHERE 
            "Яндекс_координата_центра_X" LIKE '%.%' AND
            "Яндекс_координата_центра_Y" LIKE '%.%'
    `)

    data = data.map(e => {
        //Координаты X и Y на офиц. сайте перепутаны местами!
        e.geometry = {
            coordinates: [e["Яндекс_координата_центра_Y"], e["Яндекс_координата_центра_X"]],
            type: 'Point'
        }

        e.properties = {
            hintContent: e["Название"],
        }

        delete e["Яндекс_координата_центра_Y"]
        delete e["Яндекс_координата_центра_X"]

        return e
    })

    return data
}