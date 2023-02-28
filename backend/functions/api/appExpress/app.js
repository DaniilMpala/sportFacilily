
import expess from "express"
import bodyParser from 'body-parser'
import db from "../../../connections/bd.js"
import { createMetaTable } from "../updateTable/createMetaTable.js"
import { fillTable } from "../updateTable/fillTable.js"
import getStats from "../getInfo/getStats.js"
import getAllFacilitySportFacility from "../getInfo/getAllFacilitySportFacility.js"
import { addComment } from "../updateTable/addComment.js"



var app = expess()

app.use(expess.json())
app.use(bodyParser.urlencoded({ extended: true }));


//Получение
app.get("/api/getStats/", async (req, res) => {
    res.json(await getStats(req.query))
})

app.get("/api/getAllFacilitySportFacility/", async (req, res) => {
    res.json(await getAllFacilitySportFacility(req.query))
})


//Добавление комметария
app.post("/api/addComment", async (req, res) => {
    res.json(await addComment(req.body))
})


//Обновление
app.post("/api/updateMetaTable", async (req, res) => {
    let token = (await db.get(`SELECT value FROM security WHERE name = 'tokenUpdateTable'`))?.value
    if (req.body?.token != token)
        return res.json({ message: "У вас нет доступа для обновления таблицы", success: false })

    res.json(await createMetaTable(req.body))
})

app.post("/api/fillTable", async (req, res) => {
    let token = (await db.get(`SELECT value FROM security WHERE name = 'tokenUpdateTable'`))?.value
    if (req.body?.token != token)
        return res.json({ message: "У вас нет доступа для обновления таблицы", success: false })

    res.json(await fillTable(req.body))
})

export default app