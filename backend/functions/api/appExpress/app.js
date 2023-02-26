
import expess from "express"
import bodyParser from 'body-parser'

import { createMetaTable } from "../updateTable/createMetaTable.js"
import { fillTable } from "../updateTable/fillTable.js"
import getStats from "../getInfo/getStats.js"
import getAllFacility from "../getInfo/getAllFacility.js"



var app = expess()

app.use(expess.json())
app.use(bodyParser.urlencoded({ extended: true }));


//Получение
app.get("/api/getStats/", async (req, res) => {
    res.json(await getStats(req.query))
})

app.get("/api/getAllFacility/", async (req, res) => {
    res.json(await getAllFacility(req.query))
})

//Обновление
app.post("/api/updateMetaTable", async (req, res) => {
    if (req.body?.token != "bsgft826465_+28hhdy3FDSGUnbhwydf78ikm2n34hrtyguis&@")
        return res.json({ message: "У вас нет доступа для обновления таблицы", success: false })

    res.json(await createMetaTable(req.body))
})

app.post("/api/fillTable", async (req, res) => {
    if (req.body?.token != "bsgft826465_+28hhdy3FDSGUnbhwydf78ikm2n34hrtyguis&@")
        return res.json({ message: "У вас нет доступа для обновления таблицы", success: false })

    res.json(await fillTable(req.body))
})

export default app