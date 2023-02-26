import db from "../../connections/bd.js"
import fs from 'fs'
import typeFile from "../typeFile.js"
import readFileCsv from "../readFileCsv.js"
import distanceBetweenObjects from "../analyticsSportObject/distanceBetweenObjects.js"
import mostBuildings from "../analyticsSportObject/mostBuildings.js"
import mostFinance from "../analyticsSportObject/mostFinance.js"
import mostObject from "../analyticsSportObject/mostObject.js"
import allObject from "../analyticsSportObject/allObject.js"
import lastOpenObject from "../analyticsSportObject/lastOpenObject.js"

export const fillTable = async ({ nameFile, nameTable }) => {
    if (!nameFile || !nameTable)
        return { success: false, message: "Недопустимое название параметра" }

    //очистим от пробелом
    nameFile = nameFile.trim()
    nameTable = nameTable.trim()

    if (typeFile(nameFile) != 'csv')
        return { success: false, message: "Файл должен быть типа csv" }

    //проверим есть ли что то, что не удоволятворяет потенциальному названию таблицы
    //таблицы могут быть nametable, nameTable, name_table, name_table
    if (!/[a-z0-9_]*/.test(nameTable.toLowerCase()))
        return { success: false, message: "Название модифицируемой таблицы не правильное" }

    let existsTable = await db.all(`PRAGMA table_info(${nameTable})`)
    if (existsTable.length == 0)
        return { success: false, message: "Модифицируемой таблицы не существует" }

    let exists = fs.existsSync(`./data/${nameFile}`);
    if (!exists)
        return { success: false, message: "Файл не найден" }

    let data = await readFileCsv(nameFile)

    try {
        let columns = Object.keys(data[0]).map(name => ({
            nameColumn: name,
            sqlColumn: `'${name.replaceAll(':', "").trim().replaceAll(' ', "_")}'\n`
        }))

        for (const row of data) {
            if (!Number(row['id:'])) continue

            let str = []
            for (const { nameColumn } of columns)
                str.push(`'${row[nameColumn]}'\n`)


            await db.run(`
                INSERT OR IGNORE INTO ${nameTable} (${columns.map(v => v.sqlColumn)})
                VALUES (${str})
            `)
        }

        distanceBetweenObjects()
        lastOpenObject()
        mostBuildings()
        mostFinance()
        mostObject()
        allObject()

        return { success: true, message: "Данные таблицы обновлены" }
    } catch (error) {
        console.log(new Date(), error)
        return { success: false, message: "Внутренняя ошибка" }
    }

}