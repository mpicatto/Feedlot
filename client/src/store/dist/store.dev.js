"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _index = _interopRequireDefault(require("../feedlot/reducers/index"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxDevtoolsExtension = require("redux-devtools-extension");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); //CON ESTA FUNCION GUARDAMOS EL ESTADO DE REDUX EN EL LOCAL STORAGE


function saveToLocalStorage(state) {
  try {
    //CREAMOS EL SERIALIZE Y LE PONEMOS UN STRING CON LA FUNCION JSON.STRINGIFY
    //const serializedState = "user:{"+JSON.stringify(state.user)+"},order:{"+JSON.stringify(state.order)+"}";
    //const serializedState = "user:{"+JSON.stringify(state.user)+"}"
    //const user = state.user;
    var serializedState = JSON.stringify(state); //LE PASAMOS STATE(KEY VALUE) Y EL STRING DE TODO EL STATE DE REDUX
    //localStorage.setItem('state',serializedState)

    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
} //CON ESTA FUNCION LEEMOS EL LOCAL STORAGE ALMACENADO EN EL BROWSER


function loadFromLocalStorage() {
  try {
    //GUARDAMOS EL LOCAL STORAGE EN UNA VARIABLE LA CUAL HABIAMOS LLAMADO STATE
    var serializedState = localStorage.getItem('state'); //const serializedState2 = localStorage.getItem('state')
    //var data;
    //NOS FIJAMOS SI EL STATE ESTA VACIO O NO!!!

    if (serializedState === null) return undefined; //return data = JSON.parse(serializedState)+JSON.parse(serializedState2);

    return JSON.parse(serializedState); //FUNCION INVERSA PARA PASAR EL STRING A UN JSON
  } catch (e) {
    console.log(e);
  }
} //ACA HACEMOS LA PERSISTENCIA DE DATOS... PARA REFRESCAR PAGINA Y HASTA CERRAR PESTAÑA MANTIENE EL STATE!!!!


var persistedState = loadFromLocalStorage();
var store = (0, _redux.createStore)(_index["default"], //AGREGAMOS LA PERSISTENCIA...
persistedState, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk["default"]))); //SUSCRIBIMOS LAS FUNCIONES PARA PODER GUARDAR EL STATE Y DESPUES TRAERLO

store.subscribe(function () {
  return saveToLocalStorage(store.getState());
});
var _default = store;
exports["default"] = _default;