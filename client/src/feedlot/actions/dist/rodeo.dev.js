"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRodeoState = setRodeoState;
exports.SET_RODEO = void 0;
var SET_RODEO = 'SET_RODEO';
exports.SET_RODEO = SET_RODEO;

function setRodeoState(payload) {
  console.log(payload);
  return {
    type: SET_RODEO,
    payload: payload
  };
}