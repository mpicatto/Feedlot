import {CANCEL_COMPRA,SET_SECTION,KEEP_VENDOR,KEEP_CONSIG, SET_STEP,KEEP_FACTURACION,
COMISSION_SWICH,CONSIG_SWICH} from '../actions/compras'
const initialState = {
    section: null,

    step:"1",
    ifconsig:true,
    ifcomission:true,

    vendedor:{   
      vendor_razon_social:"",
      vendor_cuit:"",
      vendor_addressFiscal:"",
      vendor_cp:"",
      vendor_email:"",
      vendor_celular:""},

    consignatario:{
      razon_social:"",
      cuit:"",
      addressFiscal:"",
      cp:"",
      email:"",
      celular:""},

      facturas:{
        fechaCompra:"",
        animales:"",
        facturaVendedor:"",
        totalVendedor:"",
        facturaConsig:"",
        totalConsig:"",
      }
};

export default function global(state = initialState, action){

  if (action.type === CANCEL_COMPRA){
    return{
      ...initialState,
     
         }
  }
  if (action.type === SET_SECTION){
    return{
      ...state,
      section:action.payload,
         }
  }
  if (action.type === KEEP_VENDOR){
    return{
      ...state,
      vendedor:action.payload,
         }
  }
  if (action.type === KEEP_CONSIG){
    return{
      ...state,
      consignatario:action.payload,
         }
  }
  if (action.type === KEEP_FACTURACION){
    return{
      ...state,
      facturas:action.payload,
         }
  }
  if (action.type === SET_STEP){
    return{
      ...state,
      step:action.payload,
         }
  }

  if (action.type === COMISSION_SWICH){
    return{
      ...state,
      ifcomission:action.payload,
         }
  }
  if (action.type === CONSIG_SWICH){
    return{
      ...state,
      ifconsig:action.payload,
         }
  }
  return state
}  