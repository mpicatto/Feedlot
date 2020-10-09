export const CANCEL_COMPRA = 'CANCEL_COMPRA';
export const SET_SECTION = 'SET_SECTION'
export const KEEP_VENDOR = 'KEEP_VENDOR'
export const KEEP_CONSIG = 'KEEP_CONSIG'
export const KEEP_TRANSPORT='KEEP_TRANSPORT'
export const KEEP_GUIA = 'KEEP_GUIA'
export const KEEP_GUIAS = 'KEEP_GUIAS'
export const KEEP_ANIMAL_DETAIL = 'KEEP_ANIMAL_DETAIL'
export const KEEP_ANIMAL_ARRAY = 'KEEP_ANIMAL_ARRAY'
export const KEEP_FACTURA_VENDOR='KEEP_FACTURA_VENDOR'
export const KEEP_FACTURA_CONSIG='KEEP_FACTURA_CONSIG'
export const KEEP_FACTURA_TRANSPORT='KEEP_FACTURA_TRANSPORT'
export const SET_STEP = 'SET_STEP'
export const CONSIG_SWICH = 'CONSIG_SWICH'
export const COMISSION_SWICH = 'COMISSION_SWICH'
export const TRANSPORT_SWICH ='TRANSPORT_SWICH' 

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


  export function keepGuia(guia){
    return{type: KEEP_GUIA, payload:guia}
  }

  export function keepGuiaS(guias){
    return{type: KEEP_GUIAS, payload:guias}
  }

  export function keepAnimalDetail(animalDetail){
    return{type: KEEP_ANIMAL_DETAIL, payload:animalDetail}
  }

  export function keepAnimalArray(animalArray){
    return{type: KEEP_ANIMAL_ARRAY, payload:animalArray}
  }

  export function keepFacturaVendor(facturaVendor){
    return{type: KEEP_FACTURA_VENDOR, payload:facturaVendor}
  }

  export function keepFacturaConsig(facturaConsig){
    return{type: KEEP_FACTURA_CONSIG, payload:facturaConsig}
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


