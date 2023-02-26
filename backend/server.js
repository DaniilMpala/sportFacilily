
import http from "http"
import app from "./functions/api/appExpress/app.js";

const server = new http.Server(app)

server.timeout = 120000;
server.listen(6001, () => console.log("Сервер активен"))