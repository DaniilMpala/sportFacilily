"use strict";

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./functions/api/appExpress/app.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = new _http["default"].Server(_app["default"]);
server.timeout = 120000;
server.listen(6001, function () {
  return console.log("Сервер активен");
});