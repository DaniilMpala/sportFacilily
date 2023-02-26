"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillTable = void 0;

var _bd = _interopRequireDefault(require("../../../connections/bd.js"));

var _fs = _interopRequireDefault(require("fs"));

var _typeFile = _interopRequireDefault(require("../../typeFile.js"));

var _readFileCsv = _interopRequireDefault(require("../../readFileCsv.js"));

var _distanceBetweenObjects = _interopRequireDefault(require("../../analyticsSportObject/distanceBetweenObjects.js"));

var _mostBuildings = _interopRequireDefault(require("../../analyticsSportObject/mostBuildings.js"));

var _mostFinance = _interopRequireDefault(require("../../analyticsSportObject/mostFinance.js"));

var _mostObject = _interopRequireDefault(require("../../analyticsSportObject/mostObject.js"));

var _allObject = _interopRequireDefault(require("../../analyticsSportObject/allObject.js"));

var _lastOpenObject = _interopRequireDefault(require("../../analyticsSportObject/lastOpenObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fillTable = function fillTable(_ref) {
  var nameFile, nameTable, existsTable, exists, data, columns, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, row, str, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, nameColumn;

  return regeneratorRuntime.async(function fillTable$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          nameFile = _ref.nameFile, nameTable = _ref.nameTable;

          if (!(!nameFile || !nameTable)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Недопустимое название параметра"
          });

        case 3:
          //очистим от пробелом
          nameFile = nameFile.trim();
          nameTable = nameTable.trim();

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
          _context.next = 11;
          return regeneratorRuntime.awrap(_bd["default"].all("PRAGMA table_info(".concat(nameTable, ")")));

        case 11:
          existsTable = _context.sent;

          if (!(existsTable.length == 0)) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Модифицируемой таблицы не существует"
          });

        case 14:
          exists = _fs["default"].existsSync("./data/".concat(nameFile));

          if (exists) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Файл не найден"
          });

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap((0, _readFileCsv["default"])(nameFile));

        case 19:
          data = _context.sent;
          console.log(nameFile, "./data/".concat(nameFile), data[0]);
          _context.prev = 21;
          columns = Object.keys(data[0]).map(function (name) {
            return {
              nameColumn: name,
              sqlColumn: "'".concat(name.replaceAll(':', "").trim().replaceAll(' ', "_"), "'\n")
            };
          });
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 26;
          _iterator = data[Symbol.iterator]();

        case 28:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 57;
            break;
          }

          row = _step.value;

          if (Number(row['id:'])) {
            _context.next = 32;
            break;
          }

          return _context.abrupt("continue", 54);

        case 32:
          str = [];
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 36;

          for (_iterator2 = columns[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            nameColumn = _step2.value.nameColumn;
            str.push("'".concat(row[nameColumn], "'\n"));
          }

          _context.next = 44;
          break;

        case 40:
          _context.prev = 40;
          _context.t0 = _context["catch"](36);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t0;

        case 44:
          _context.prev = 44;
          _context.prev = 45;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 47:
          _context.prev = 47;

          if (!_didIteratorError2) {
            _context.next = 50;
            break;
          }

          throw _iteratorError2;

        case 50:
          return _context.finish(47);

        case 51:
          return _context.finish(44);

        case 52:
          _context.next = 54;
          return regeneratorRuntime.awrap(_bd["default"].run("\n                INSERT OR IGNORE INTO ".concat(nameTable, " (").concat(columns.map(function (v) {
            return v.sqlColumn;
          }), ")\n                VALUES (").concat(str, ")\n            ")));

        case 54:
          _iteratorNormalCompletion = true;
          _context.next = 28;
          break;

        case 57:
          _context.next = 63;
          break;

        case 59:
          _context.prev = 59;
          _context.t1 = _context["catch"](26);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 63:
          _context.prev = 63;
          _context.prev = 64;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 66:
          _context.prev = 66;

          if (!_didIteratorError) {
            _context.next = 69;
            break;
          }

          throw _iteratorError;

        case 69:
          return _context.finish(66);

        case 70:
          return _context.finish(63);

        case 71:
          (0, _distanceBetweenObjects["default"])();
          (0, _lastOpenObject["default"])();
          (0, _mostBuildings["default"])();
          (0, _mostFinance["default"])();
          (0, _mostObject["default"])();
          (0, _allObject["default"])();
          return _context.abrupt("return", {
            success: true,
            message: "Данные таблицы обновлены"
          });

        case 80:
          _context.prev = 80;
          _context.t2 = _context["catch"](21);
          console.log(new Date(), _context.t2);
          return _context.abrupt("return", {
            success: false,
            message: "Внутренняя ошибка"
          });

        case 84:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[21, 80], [26, 59, 63, 71], [36, 40, 44, 52], [45,, 47, 51], [64,, 66, 70]]);
};

exports.fillTable = fillTable;