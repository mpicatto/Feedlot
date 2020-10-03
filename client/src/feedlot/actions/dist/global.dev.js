"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRedirect = setRedirect;
exports.setRedirectOff = setRedirectOff;
exports.SET_REDIRECT_OFF = exports.SET_REDIRECT = void 0;
// import axios from 'axios';
var SET_REDIRECT = 'SET_REDIRECT';
exports.SET_REDIRECT = SET_REDIRECT;
var SET_REDIRECT_OFF = 'SET_REDIRECT_OFF';
exports.SET_REDIRECT_OFF = SET_REDIRECT_OFF;

function setRedirect(state) {
  return {
    type: SET_REDIRECT,
    payload: state
  };
}

function setRedirectOff() {
  return {
    type: SET_REDIRECT_OFF
  };
}