"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bd = _interopRequireDefault(require("../../../connections/bd.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _callee = function _callee() {
  var dataFacility, dataComment;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dataFacility = _bd["default"].all("\n        SELECT \n            id,\n            \"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\", \n            \"\u041A\u0440\u0430\u0442\u043A\u043E\u0435_\u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435\", \n            \"\u0414\u0430\u0442\u0430_\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F_\u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430_/_\u0440\u0435\u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438\",\n            \"\u0422\u0438\u043F_\u0441\u043F\u043E\u0440\u0442\u0438\u0432\u043D\u043E\u0433\u043E_\u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u0430\" ,\n            \"\u0412\u0438\u0434\u044B_\u0441\u043F\u043E\u0440\u0442\u0430\",\n            \"\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439_\u0442\u0435\u043B\u0435\u0444\u043E\u043D_\u043E\u0431\u044A\u0435\u043A\u0442\u0430\",\n            \"\u0410\u0434\u0440\u0435\u0441\",\n            \"\u042F\u043D\u0434\u0435\u043A\u0441_\u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0430_\u0446\u0435\u043D\u0442\u0440\u0430_X\",\n            \"\u042F\u043D\u0434\u0435\u043A\u0441_\u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0430_\u0446\u0435\u043D\u0442\u0440\u0430_Y\"\n        FROM sportObject\n        WHERE \n            \"\u042F\u043D\u0434\u0435\u043A\u0441_\u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0430_\u0446\u0435\u043D\u0442\u0440\u0430_X\" LIKE '%.%' AND\n            \"\u042F\u043D\u0434\u0435\u043A\u0441_\u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0430_\u0446\u0435\u043D\u0442\u0440\u0430_Y\" LIKE '%.%'\n    ");
          dataComment = _bd["default"].all("\n        SELECT \n            date,\n            idFacility,\n            text\n        FROM comment\n        WHERE \n            \"table\" = 'sportObject'\n    ");
          _context.next = 4;
          return regeneratorRuntime.awrap(dataFacility);

        case 4:
          dataFacility = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(dataComment);

        case 7:
          dataComment = _context.sent;
          dataFacility = dataFacility.map(function (e) {
            //Координаты X и Y на офиц. сайте перепутаны местами!
            e.geometry = {
              coordinates: [e["Яндекс_координата_центра_Y"], e["Яндекс_координата_центра_X"]],
              type: 'Point'
            };
            e.properties = {
              hintContent: e["Название"]
            };
            e.comments = dataComment.reduce(function (all, cur) {
              return cur.idFacility == e.id ? [].concat(_toConsumableArray(all), [cur]) : all;
            }, []).sort(function (a, b) {
              return new Date(a.date) < new Date(b.date) ? 1 : -1;
            });
            delete e["Яндекс_координата_центра_Y"];
            delete e["Яндекс_координата_центра_X"];
            return e;
          });
          return _context.abrupt("return", dataFacility);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports["default"] = _callee;