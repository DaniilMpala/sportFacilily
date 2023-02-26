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
          console.log({
            nameFile: nameFile,
            nameTable: nameTable
          });

          if (!(!nameFile || !nameTable)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Недопустимое название параметра"
          });

        case 4:
          //очистим от пробелом
          nameFile = nameFile.trim();
          nameTable = nameTable.trim();

          if (!((0, _typeFile["default"])(nameFile) != 'csv')) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Файл должен быть типа csv"
          });

        case 8:
          if (/[a-z0-9_]*/.test(nameTable.toLowerCase())) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Название модифицируемой таблицы не правильное"
          });

        case 10:
          exists = _fs["default"].existsSync("./data/".concat(nameFile));

          if (exists) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Файл не найден"
          });

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap((0, _readFileCsv["default"])(nameFile));

        case 15:
          data = _context.sent;
          _context.prev = 16;
          _context.next = 19;
          return regeneratorRuntime.awrap(_bd["default"].all("PRAGMA table_info(".concat(nameTable, ")")));

        case 19:
          metaDataTable = _context.sent;

          if (!(metaDataTable.length == 0)) {
            _context.next = 33;
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
            _context.next = 25;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Не смогли преобразовать тип поля"
          });

        case 25:
          _context.next = 27;
          return regeneratorRuntime.awrap(_bd["default"].run("\n                CREATE TABLE \"".concat(nameTable, "\" (\n                    ").concat(data, "\n                );  \n            ")));

        case 27:
          firstLetterUp = nameTable.charAt(0).toUpperCase() + nameTable.slice(1);
          _context.next = 30;
          return regeneratorRuntime.awrap(_bd["default"].run("\n                CREATE TABLE \"stats".concat(firstLetterUp, "\" (\n                    \"name\"\tTEXT UNIQUE,\n                    \"value\"\tTEXT\n                ); \n            ")));

        case 30:
          return _context.abrupt("return", {
            success: true,
            message: "Таблица успешно создана"
          });

        case 33:
          return _context.abrupt("return", {
            success: false,
            message: "Таблица с таким названием уже существует"
          });

        case 34:
          _context.next = 40;
          break;

        case 36:
          _context.prev = 36;
          _context.t0 = _context["catch"](16);
          console.log(new Date(), _context.t0);
          return _context.abrupt("return", {
            success: false,
            message: "Внутренняя ошибка"
          });

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[16, 36]]);
};

exports.createMetaTable = createMetaTable;