"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _rodeo = _interopRequireDefault(require("./rodeo"));

var _global = _interopRequireDefault(require("./global"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _redux.combineReducers)({
  rodeo: _rodeo["default"],
  global: _global["default"]
});

exports["default"] = _default;