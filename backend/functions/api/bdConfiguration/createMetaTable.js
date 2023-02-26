import db from "../../../connections/bd.js"
import fs from 'fs'
import typeFile from "../../typeFile.js"
import readFileCsv from "../../readFileCsv.js"

export const createMetaTable = async ({ nameFile, nameTable }) => {
    console.log({ nameFile, nameTable })
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

    let exists = fs.existsSync(`./data/${nameFile}`);
    if (!exists)
        return { success: false, message: "Файл не найден" }

    let data = await readFileCsv(nameFile)




    try {
        let metaDataTable = await db.all(`PRAGMA table_info(${nameTable})`)
        if (metaDataTable.length == 0) {
            //Таблицы нету
            let findedUndefinedParams = false
            data = data.map(structure => {
                if (structure['Формат значения поля'] == 'xsd:string' || structure['Формат значения поля'] == 'xsd:undefined' || structure['Формат значения поля'] == 'xsd:geolongitude' || structure['Формат значения поля'] == 'xsd:geolatitude')
                    structure['Формат значения поля'] = 'TEXT'
                else if (structure['Формат значения поля'] == 'xsd:decimal')
                    structure['Формат значения поля'] = 'NUMERIC'
                else findedUndefinedParams = true

                if (!structure['Наименование поля'])
                    
                structure['Наименование поля'] = structure['Наименование поля'].replaceAll(':', "").trim().replaceAll(' ', "_")

                if (structure['Наименование поля'] == "id")
                    structure['Формат значения поля'] += ` UNIQUE`

                return `"${structure['Наименование поля']}" ${structure['Формат значения поля']}\n`
            })

            if (findedUndefinedParams)
                return { success: false, message: "Не смогли преобразовать тип поля" }

            await db.run(`
                CREATE TABLE "${nameTable}" (
                    ${data}
                );  
            `)

            const firstLetterUp = nameTable.charAt(0).toUpperCase() + nameTable.slice(1)
            await db.run(`
                CREATE TABLE "stats${firstLetterUp}" (
                    "name"	TEXT UNIQUE,
                    "value"	TEXT
                ); 
            `)

            return { success: true, message: "Таблица успешно создана" }
        } else {
            //Таблица есть
            return { success: false, message: "Таблица с таким названием уже существует" }
        }
    } catch (error) {
        console.log(new Date(), error)
        return { success: false, message: "Внутренняя ошибка" }
    }

}