import db from "../../../connections/bd.js"

export const addComment = async ({ idFacility, text, table }) => {
    //очистим от пробелом
    idFacility = (idFacility || '').trim()
    text = (text || '').trim()
    table = (table || '').trim()

    if (!idFacility || !text || !table)
        return { success: false, message: "Недопустимое название параметра" }

    if (!/[0-9]*/.test(idFacility))
        return { success: false, message: "Id недоустимое" }

    if (!/[a-z0-9_]*/.test(table.toLowerCase()))
        return { success: false, message: "Название таблицы не правильное" }

    if (!/[а-яa-z0-9!\.,? ]*/.test(text.toLowerCase()))
        return { success: false, message: "Текст содержит недопустимые символы" }

    try {
        await db.run(`
            INSERT INTO comment ("idFacility","text","table") VALUES(
                ${idFacility},
                '${text}',
                '${table}'
            )
        `)
        return { success: true, message: "Ваш отзыв добавлен" }
    } catch (error) {
        console.log(new Date(), error)
        return { success: false, message: "Внутренняя ошибка" }
    }

}