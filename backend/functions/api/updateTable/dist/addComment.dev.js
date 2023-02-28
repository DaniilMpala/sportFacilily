"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addComment = void 0;

var _bd = _interopRequireDefault(require("../../../connections/bd.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addComment = function addComment(_ref) {
  var idFacility, text, table;
  return regeneratorRuntime.async(function addComment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          idFacility = _ref.idFacility, text = _ref.text, table = _ref.table;
          //очистим от пробелом
          idFacility = (idFacility || '').trim();
          text = (text || '').trim();
          table = (table || '').trim();

          if (!(!idFacility || !text || !table)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Недопустимое название параметра"
          });

        case 6:
          if (/[0-9]*/.test(idFacility)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Id недоустимое"
          });

        case 8:
          if (/[a-z0-9_]*/.test(table.toLowerCase())) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Название таблицы не правильное"
          });

        case 10:
          if (/[а-яa-z0-9!\.,? ]*/.test(text.toLowerCase())) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "Текст содержит недопустимые символы"
          });

        case 12:
          _context.prev = 12;
          _context.next = 15;
          return regeneratorRuntime.awrap(_bd["default"].run("\n            INSERT INTO comment (\"idFacility\",\"text\",\"table\") VALUES(\n                ".concat(idFacility, ",\n                '").concat(text, "',\n                '").concat(table, "'\n            )\n        ")));

        case 15:
          return _context.abrupt("return", {
            success: true,
            message: "Ваш отзыв добавлен"
          });

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](12);
          console.log(new Date(), _context.t0);
          return _context.abrupt("return", {
            success: false,
            message: "Внутренняя ошибка"
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[12, 18]]);
};

exports.addComment = addComment;