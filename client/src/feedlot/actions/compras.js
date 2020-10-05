export const CANCEL_COMPRA = 'CANCEL_COMPRA';
export const SET_SECTION = 'SET_SECTION'
export const KEEP_VENDOR = 'KEEP_VENDOR'
export const KEEP_CONSIG = 'KEEP_CONSIG'
export const KEEP_FACTURACION='KEEP_FACTURACION'
export const SET_STEP = 'SET_STEP'
export const CONSIG_SWICH = 'CONSIG_SWICH'
export const COMISSION_SWICH = 'COMISSION_SWICH'

export function cancelCompra(){
    return{type: CANCEL_COMPRA}
  }
  
  export function setSection(section){
    return{type: SET_SECTION, payload:section}
  }

  export function keepVendor(vendor){
    return{type: KEEP_VENDOR, payload:vendor}
  }

  export function keepConsig(consig){
    return{type: KEEP_CONSIG, payload:consig}
  }

  export function keepFactura(facturas){
    return{type: KEEP_FACTURACION, payload:facturas}
  }

  export function setStep(number){
    return{type:SET_STEP, payload:number}
  }

  export function consigSwich(seleccion){
    return{type:CONSIG_SWICH, payload:seleccion}
  }

  export function comissionSwich(seleccion){
    return{type:COMISSION_SWICH, payload:seleccion}
  }
