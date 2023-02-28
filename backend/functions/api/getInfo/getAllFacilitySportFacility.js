import db from "../../../connections/bd.js"

export default async () => {
    let dataFacility = db.all(`
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
        FROM sportObject
        WHERE 
            "Яндекс_координата_центра_X" LIKE '%.%' AND
            "Яндекс_координата_центра_Y" LIKE '%.%'
    `)
    let dataComment = db.all(`
        SELECT 
            date,
            idFacility,
            text
        FROM comment
        WHERE 
            "table" = 'sportObject'
    `)

    dataFacility = await dataFacility
    dataComment = await dataComment

    dataFacility = dataFacility.map(e => {
        //Координаты X и Y на офиц. сайте перепутаны местами!
        e.geometry = {
            coordinates: [e["Яндекс_координата_центра_Y"], e["Яндекс_координата_центра_X"]],
            type: 'Point'
        }

        e.properties = {
            hintContent: e["Название"],
        }

        e.comments = dataComment.reduce((all, cur) => cur.idFacility == e.id ? [...all, cur] : all, []).sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);

        delete e["Яндекс_координата_центра_Y"]
        delete e["Яндекс_координата_центра_X"]

        return e
    })

    return dataFacility
}