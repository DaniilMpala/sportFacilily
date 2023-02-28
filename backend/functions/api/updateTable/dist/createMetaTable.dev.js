"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMetaTable = void 0;

var _bd = _interopRequireDefault(require("../../../connections/bd.js"));

var _fs = _interopRequireDefault(require("fs"));

var _typeFile = _interopRequireDefault(require("../../typeFile.js"));

var _readFileCsv = _interopRequireDefault(require("../../readFileCsv.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createMetaTable = function createMetaTable(_ref) {
  var nameFile, nameTable, exists, data, metaDataTable, findedUndefinedParams, firstLetterUp;
  return regeneratorRuntime.async(function createMetaTable$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          nameFile = _ref.nameFile, nameTable = _ref.nameTable;
          //очистим от пробелом
          nameFile = (nameFile || '').trim();
          nameTable = (nameTable || '').trim();

          if (!(!nameFile || !nameTable)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Недопустимое название параметра"
          });

        case 5:
          if (!((0, _typeFile["default"])(nameFile) != 'csv')) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Файл должен быть типа csv"
          });

        case 7:
          if (/[a-z0-9_]*/.test(nameTable.toLowerCase())) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Название модифицируемой таблицы не правильное"
          });

        case 9:
          exists = _fs["default"].existsSync("./data/".concat(nameFile));

          if (exists) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Файл не найден"
          });

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap((0, _readFileCsv["default"])(nameFile));

        case 14:
          data = _context.sent;
          _context.prev = 15;
          _context.next = 18;
          return regeneratorRuntime.awrap(_bd["default"].all("PRAGMA table_info(".concat(nameTable, ")")));

        case 18:
          metaDataTable = _context.sent;

          if (!(metaDataTable.length == 0)) {
            _context.next = 32;
            break;
          }

          //Таблицы нету
          findedUndefinedParams = false;
          data = data.map(function (structure) {
            if (structure['Формат значения поля'] == 'xsd:string' || structure['Формат значения поля'] == 'xsd:undefined' || structure['Формат значения поля'] == 'xsd:geolongitude' || structure['Формат значения поля'] == 'xsd:geolatitude') structure['Формат значения поля'] = 'TEXT';else if (structure['Формат значения поля'] == 'xsd:decimal') structure['Формат значения поля'] = 'NUMERIC';else findedUndefinedParams = true;
            if (!structure['Наименование поля']) structure['Наименование поля'] = structure['Наименование поля'].replaceAll(':', "").trim().replaceAll(' ', "_");
            if (structure['Наименование поля'] == "id") structure['Формат значения поля'] += " UNIQUE";
            return "\"".concat(structure['Наименование поля'], "\" ").concat(structure['Формат значения поля'], "\n");
          });

          if (!findedUndefinedParams) {
            _context.next = 24;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Не смогли преобразовать тип поля"
          });

        case 24:
          _context.next = 26;
          return regeneratorRuntime.awrap(_bd["default"].run("\n                CREATE TABLE \"".concat(nameTable, "\" (\n                    ").concat(data, "\n                );  \n            ")));

        case 26:
          firstLetterUp = nameTable.charAt(0).toUpperCase() + nameTable.slice(1);
          _context.next = 29;
          return regeneratorRuntime.awrap(_bd["default"].run("\n                CREATE TABLE \"stats".concat(firstLetterUp, "\" (\n                    \"name\"\tTEXT UNIQUE,\n                    \"value\"\tTEXT\n                ); \n            ")));

        case 29:
          return _context.abrupt("return", {
            success: true,
            message: "Таблица успешно создана"
          });

        case 32:
          return _context.abrupt("return", {
            success: false,
            message: "Таблица с таким названием уже существует"
          });

        case 33:
          _context.next = 39;
          break;

        case 35:
          _context.prev = 35;
          _context.t0 = _context["catch"](15);
          console.log(new Date(), _context.t0);
          return _context.abrupt("return", {
            success: false,
            message: "Внутренняя ошибка"
          });

        case 39:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[15, 35]]);
};

exports.createMetaTable = createMetaTable;