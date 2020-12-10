export const SET_ARRAY='SET_ARRAY'
export const KEEP_VENDOR = 'KEEP_VENDOR'
export const KEEP_CONSIG = 'KEEP_CONSIG'
export const TIPO_VENTA = 'TIPO_VENTA'
export const SET_STEP = 'SET_STEP'
export const CANCEL_VENTA = 'CANCEL_VENTA'
export const SET_SECTION = 'SET_SECTION'
export const SET_TABLE = 'SET_TABLE'

export function setArray(array){
    return{type: SET_ARRAY, payload:array}
  }

export function keepVendor(vendor){
  return{type: KEEP_VENDOR, payload:vendor}
}

export function keepConsig(consig){
  return{type: KEEP_CONSIG, payload:consig}
}

export function setVenta(tipo){
  return{type: TIPO_VENTA, payload:tipo}
}

export function setStep(number){
  return{type:SET_STEP, payload:number}
}

export function cancelVenta(){
  return{type: CANCEL_VENTA}
}

export function setSection(section){
  return{type: SET_SECTION, payload:section}
}

export function setTable(status){
  return{type: SET_TABLE, payload:status}
}




