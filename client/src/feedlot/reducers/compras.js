import {CANCEL_COMPRA,SET_SECTION,KEEP_VENDOR,KEEP_CONSIG,
KEEP_GUIA,KEEP_GUIAS,KEEP_ANIMAL_DETAIL,KEEP_ANIMAL_ARRAY,
 SET_STEP, KEEP_FACTURA_CONSIG,KEEP_FACTURA_VENDOR,
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

     
      facturaVendor:{
        fechaCompra:"",
        animales:"",
        facturaVendedor:"",
        totalVendedor:"",
      },

      facturaConsig:{
        facturaConsig:"",
        totalConsig:"",
      },
      
     

      detalleAnimal:{
        caravana:"",
        raza: "",
        sexo: "",
        frame: "",
        pesoinicial:"" ,
        pesoactual:"",
        establecimientoid:"",
        rodeoid:" ",
        fechaIngreso:"",
        fechaEgreso:"",
        estado:"",
      },

      guiaN:{
        guia:"",
        fechaDescarga:"",
        pesajePlace: "",
        ticket: "",
        peso: "",
        cantAnimales: 0,
        transporte:{
          transportista: "",
          cuiTransportista: "",
          chasis: "",
          acoplado: "",
          chofer: "",
          cuil: "",
        },
        facturaTransporte:{
          numFactura:"",
          totalFactura:""
        },
        animales:[]
      },

      animales:[],
      guias:[]
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

  if (action.type === KEEP_GUIA){
    return{
      ...state,
      guiaN:action.payload,
         }
  }
  if (action.type === KEEP_GUIAS){
    return{
      ...state,
      guias:action.payload,
         }
  }
  if (action.type === KEEP_ANIMAL_DETAIL){
    return{
      ...state,
      detalleAnimal:action.payload,
         }
  }
  if (action.type === KEEP_ANIMAL_ARRAY){
    return{
      ...state,
      animales:action.payload,
         }
  }
  if (action.type === KEEP_FACTURA_VENDOR){
    return{
      ...state,
      facturaVendor:action.payload,
         }
  }
  if (action.type === KEEP_FACTURA_CONSIG){
    return{
      ...state,
      facturaConsig:action.payload,
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