import {SET_ARRAY,KEEP_VENDOR,KEEP_CONSIG,TIPO_VENTA, SET_STEP,
  CANCEL_VENTA, SET_SECTION,SET_TABLE} from '../actions/ventas'

const initialState={
  array:[],
  section: null,
  step:"1",
  table1:false,

  tipoComprador:"",

  comprador:{   
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
 
}

export default function global(state = initialState, action){
       if (action.type === SET_ARRAY){
        return{
          ...state,
          array:action.payload
             }
      }

      if (action.type === KEEP_VENDOR){
        return{
          ...state,
          comprador:action.payload,
             }
      }

      if (action.type === KEEP_CONSIG){
        return{
          ...state,
          consignatario:action.payload,
             }
      }

      if (action.type === TIPO_VENTA){
        return{
          ...state,
          tipoComprador:action.payload,
             }
      }

      if (action.type === CANCEL_VENTA){
        return{
          ...initialState,
         
             }
      }

      if (action.type === SET_STEP){
        return{
          ...state,
          step:action.payload,
             }
      }

      if (action.type === SET_SECTION){
        return{
          ...state,
          section:action.payload,
             }
      }
      
      if (action.type === SET_TABLE){
        return{
          ...state,
          table1:action.payload,
             }
      }



      return state  
}

