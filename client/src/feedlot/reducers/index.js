import {combineReducers} from 'redux';
import rodeo from './rodeo'
import global from './global'
import user from './user'
import compras from './compras'
import historialCompras from './comprasHistory'

export default combineReducers({
   rodeo, global, user, compras,historialCompras
}) 