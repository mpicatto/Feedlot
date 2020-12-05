import {combineReducers} from 'redux';
import rodeo from './rodeo'
import global from './global'
import user from './user'
import compras from './compras'
import historialCompras from './comprasHistory'
import seguimiento from './seguimiento'
import ventas from './ventas'

export default combineReducers({
   rodeo, global, user, compras,historialCompras, seguimiento,ventas
}) 