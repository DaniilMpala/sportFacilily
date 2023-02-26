import db from "../../connections/bd.js"

export default async () => {
    let data = await db.get(`
        SELECT count(*) as count
        FROM sportObject
    `)

    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Всего построенных объектов', 
        ${data.count}
    );`)

    console.log(new Date(), 'Отработал allObject')
}