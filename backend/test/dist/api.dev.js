"use strict";

var _app = _interopRequireDefault(require("../functions/api/appExpress/app.js"));

var _supertest = _interopRequireDefault(require("supertest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('API Tests', function () {
  it('GET /api/fillTable with token', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/fillTable').send({
      nameFile: 'data-20160714T0856-structure-20160714T0856.csv',
      nameTable: 'sportObject',
      token: 'bsgft826465_+28hhdy3FDSGUnbhwydf78ikm2n34hrtyguis&@'
    }).set('Accept', 'application/x-www-form-urlencoded').expect({
      "success": true,
      "message": "Данные таблицы обновлены"
    }, done);
  });
  it('GET /api/fillTable without a token', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/fillTable').send({
      nameFile: 'data-20160714T0856-structure-20160714T0856.csv',
      nameTable: 'sportObject',
      token: 'no'
    }).set('Accept', 'application/x-www-form-urlencoded').expect({
      "success": false,
      "message": "У вас нет доступа для обновления таблицы"
    }, done);
  });
  it('GET /api/updateMetaTable', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/updateMetaTable').send({
      nameFile: 'structure-20160714T0856.csv',
      nameTable: 'sportObject',
      token: 'bsgft826465_+28hhdy3FDSGUnbhwydf78ikm2n34hrtyguis&@'
    }).set('Accept', 'application/x-www-form-urlencoded').expect({
      "success": false,
      "message": "Таблица с таким названием уже существует"
    }, done);
  });
});