
import expess from "express"
import http from "http"
import db from "./connections/bd.js"
import bodyParser from 'body-parser'

import { createMetaTable } from "./functions/api/bdConfiguration/createMetaTable.js"
import { fillTable } from "./functions/api/bdConfiguration/fillTable.js"
import getStats from "./functions/api/getStats.js"
import getAllFacility from "./functions/api/getAllFacility.js"



var app = expess(),
    server = new http.Server(app)

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
    if (req.body?.token != "bsgft826465_+28hhdy3FDSGUnbhwydf78ikm2n34hrtyguis&@") {
        res.json({ message: "У вас нет доступа для обновления таблицы", success: false })
        return
    }

    res.json(await createMetaTable(req.body))
})

app.post("/api/fillTable", async (req, res) => {
    if (req.body?.token != "bsgft826465_+28hhdy3FDSGUnbhwydf78ikm2n34hrtyguis&@") {
        res.json({ message: "У вас нет доступа для обновления таблицы", success: false })
        return
    }



    res.json(await fillTable(req.body))
})


server.timeout = 120000;
server.listen(6001, () => console.log("Сервер активен"))

export default app