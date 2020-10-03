"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = addUser;
exports.setUser = setUser;
exports.updateUser = updateUser;
exports.ForgotPass = ForgotPass;
exports.cleanUser = cleanUser;
exports.CLEAN_USER = exports.SET_USER = exports.RESET_PASSWORD = exports.UPDATE_USER = exports.ADD_USER = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ADD_USER = 'ADD_USER';
exports.ADD_USER = ADD_USER;
var UPDATE_USER = 'UPDATE_USER';
exports.UPDATE_USER = UPDATE_USER;
var RESET_PASSWORD = 'RESET_PASSWORD';
exports.RESET_PASSWORD = RESET_PASSWORD;
var SET_USER = 'SET_USER';
exports.SET_USER = SET_USER;
var CLEAN_USER = 'CLEAN_USER'; // const instance = axios.create({
//     withCredentials: true
//   })
//CREAR USUARIO

exports.CLEAN_USER = CLEAN_USER;

function addUser(data) {
  return function (dispatch) {
    console.log(data);
    return _axios["default"].post("http://localhost:3001/user", data).then(function (resp) {
      dispatch({
        type: ADD_USER,
        payload: resp.data
      });
      alert("Usuario creado.");
    })["catch"](function (err) {
      alert(err);
    });
  };
} //LOGUEAR USUARIO!!


function setUser(user) {
  console.log(user);
  return {
    type: SET_USER,
    payload: user
  };
} //MODIFICAR DATOS DE MI USUARIO


function updateUser(data) {
  return function (dispatch) {
    console.log(data);
    return _axios["default"].put("http://localhost:3001/user/settings/".concat(data.id), data).then(function (res) {
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
      alert("Datos Actualizados correctamente");
    })["catch"](function (err) {
      alert(err);
    });
  };
} // RECUPERAR PASSWORD, RECIBE MAIL USER PARA RECUPERAR PASSWORD


function ForgotPass(data) {
  var email = data.email;
  return function (dispatch) {
    console.log(data);
    return (0, _axios["default"])({
      method: "POST",
      url: "http://localhost:3001/email/send-email/forgotPassword/".concat(data.email),
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email: email
      }
    }).then(function (res) {
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data
      });
      alert("Datos Actualizados correctamente");
    })["catch"](function (err) {
      alert(err);
    });
  };
}

function cleanUser() {
  return {
    type: CLEAN_USER
  };
}