import db from "../../../connections/bd.js"

export default async ({ table }) => {
    if (!table)
        return { success: false, message: "Не выбрана таблица" }

    table = table.trim()

    if (!/[a-z0-9_]*/.test(table.toLowerCase()))
        return { success: false, message: "Недопустимое название таблицы" }

    let data = await db.all(`SELECT * FROM ${table}`)

    return data
}