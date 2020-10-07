import React,{useState,useEffect} from 'react';
// import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {cancelCompra,keepConsig,keepVendor,setStep,
  keepFacturaVendor,keepFacturaConsig, comissionSwich,
consigSwich} from '../../../../actions/compras'
import {connect} from 'react-redux';

//ESTILOS DE MATERIAL UI
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:"space-around"
    },
    formControl: {
        margin: theme.spacing(1),
        maxWidth: "100%",
        minWidth:"100%"
      },

    background:{
      color:theme.palette.background.default
    }
  }));

export function Step1(props) {
    const classes = useStyles()

    useEffect(()=>{
      setVendedor(props.vendedor)
      setConsignatario(props.consignatario)
      setFacturaVendedor(props.facturaVendor)
      setFacturaConsig(props.facturaConsig)
      setComission(props.ifcomission)
      setIfConsignatario(props.ifconsig)
    },[props.vendedor, props.consignatario,props.facturaVendor,
      props.facturaConsig,props.ifcomission,props.ifconsig])

    const [vendedor, setVendedor] = useState({})
    const [consignatario, setConsignatario] = useState({})
    const [comission,setComission]=useState(true)
    const [ifConsignatario,setIfConsignatario]=useState(true)
    const [facturaVendedor, setFacturaVendedor]=useState({})
    const [facturaConsig, setFacturaConsig]=useState({})
    const [vendorErrors, setVendorErrors] = useState({})
    const [consigErrors, setConsigErrors] = useState({})

    const handleVendorData = function(e) {
        setVendedor({
          ...vendedor,
          [e.target.name]:e.target.value
        })
        console.log(vendedor)
       
        setVendorErrors(validateVendor({
          ...vendedor,
          [e.target.name]: e.target.value,
        }));
      }

      const handleConsigData = function(e) {
        setConsignatario({
          ...consignatario,
          [e.target.name]:e.target.value
        })
        console.log(consignatario)
        setConsigErrors(validateConsignatario({
          ...consignatario,
          [e.target.name]: e.target.value,
        }));
      }

      const handleFacturaVendedor = function(e) {
        setFacturaVendedor({
          ...facturaVendedor,
          [e.target.name]:e.target.value
        })
       
      }
      const handleFacturaConsig = function(e) {
        setFacturaConsig({
          ...facturaConsig,
          [e.target.name]:e.target.value
        })
        
      }

      const handleIfConsig= function(e){
        setIfConsignatario(!e.target.checked)
        console.log(ifConsignatario)
      }  

      const handleComission = function(e){
        setComission(!e.target.checked)
        console.log(comission)
      }                              

      const cancelFunc = function(e){
          e.preventDefault()
          props.cancelCompra()
      }

      const continueFunc = function(e){
          e.preventDefault()
          props.keepVendor(vendedor)
          props.keepConsig(consignatario)
          props.keepFacturaVendor(facturaVendedor)
          props.keepFacturaConsig(facturaConsig)
          props.comissionSwich(comission)
          props.consigSwich(ifConsignatario)
          props.setStep("2")
          
      }
 
    return (

        <React.Fragment>
          <CssBaseline />
          <Container className={classes.container}  >
          <Grid
           container
           direction="row"
           justify="space-around"
           alignItems="center"
           pa>
            <Grid >
            <form className={classes.form} noValidate>
                <Grid className={classes.container}> 
                    <Typography component="h1" variant="h5">
                    Datos del Vendedor
                    </Typography>
                </Grid>
           
            
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="vendor_razon_social"
                        label="Razon Social"
                        name="vendor_razon_social"
                        value={vendedor.vendor_razon_social}
                        onChange={(e)=>handleVendorData(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="vendor_cuit"
                        label="CUIT"
                        name="vendor_cuit"
                        value={vendedor.vendor_cuit}
                        onChange={(e)=>handleVendorData(e)}
                    />
                    </Grid>
                    <Grid item item xs={12} sm={8}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="vendor_addressFiscal"
                        label="Dirección Fiscal"
                        name="vendor_addressFiscal"
                        value={vendedor.vendor_addressFiscal}
                        onChange={(e)=>handleVendorData(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="vendor_cp"
                        label="Cod. Postal"
                        name="vendor_cp"
                        value={vendedor.vendor_cp}
                        onChange={(e)=>handleVendorData(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="vendor_email"
                        label="Dirección Email"
                        name="vendor_email"
                        value={vendedor.vendor_email}
                        onChange={(e)=>handleVendorData(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="vendor_celular"
                        label="Teléfono Celular/Whatsapp"
                        name="vendor_celular"
                        value={vendedor.vendor_celular}
                        onChange={(e)=>handleVendorData(e)}
                    />
                    </Grid>
                    <Grid item item xs={12} sm={6}>
                    <FormControlLabel
                        control={<Switch color="primary" />}
                        label="Actuó Consignatario"
                        value="on"
                        checked={!ifConsignatario}
                        onChange={(e)=>handleIfConsig(e)}
                        />
                    </Grid>
                </Grid>
                {!ifConsignatario?
                <Grid>
                <Grid className={classes.container}> 
                    <Typography component="h1" variant="h5">
                    Datos del Consignatario
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="razon_social"
                        label="Razon Social"
                        name="razon_social"
                        value={consignatario.razon_social}
                        onChange={(e)=>handleConsigData(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cuit"
                        label="CUIT"
                        name="cuit"
                        value={consignatario.cuit}
                        onChange={(e)=>handleConsigData(e)}
                    />
                    </Grid>
                    <Grid item item xs={12} sm={8}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="addressFiscal"
                        label="Dirección Fiscal"
                        name="addressFiscal"
                        value={consignatario.addressFiscal}
                        onChange={(e)=>handleConsigData(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cp"
                        label="Cod. Postal"
                        name="cp"
                        value={consignatario.cp}
                        onChange={(e)=>handleConsigData(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Dirección Email"
                        name="email"
                        value={consignatario.email}
                        onChange={(e)=>handleConsigData(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="celular"
                        label="Teléfono Celular/Whatsapp"
                        name="celular"
                        value={consignatario.celular}
                        onChange={(e)=>handleConsigData(e)}
                    />
                    </Grid>
                 </Grid>
                </Grid>:null}


                    <Grid className={classes.container}> 
                      <Typography component="h1" variant="h5">
                        Detalle de la Compra
                      </Typography>
                    </Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                          autoComplete="ingreso"
                          name="fechaCompra"
                          variant="outlined"
                          required
                          fullWidth
                          id="fechaCompra"
                          label="Fecha de Compra"
                          type="date"
                          InputLabelProps={{
                                              shrink: true,
                                            }}
                          autoFocus
                          value={facturaVendedor.fechaCompra}
                          onChange={(e) => handleFacturaVendedor(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="animales"
                        label="Animales:"
                        name="animales"
                        value={facturaVendedor.animales}
                        onChange={(e) => handleFacturaVendedor(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="facturaVendedor"
                        label="Factura Compra Nº:"
                        name="facturaVendedor"
                        value={facturaVendedor.facturaVendedor}
                        onChange={(e) => handleFacturaVendedor(e)}
                    />
                    </Grid>
                    <Grid item item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="totalVendedor"
                        label="Total Factura ($)"
                        name="totalVendedor"
                        value={facturaVendedor.totalVendedor}
                        onChange={(e) => handleFacturaVendedor(e)}
                    />
                    </Grid>
                    
                    <Grid item item xs={12} sm={6}>
                    <FormControlLabel
                        control={<Switch color="primary" />}
                        label="Comisiones a cargo del comprador"
                        value="on"
                        checked={!comission}
                        onChange={(e)=>handleComission(e)}
                        />
                    </Grid>
                    <Grid item item xs={12} sm={3}>
                    {!comission ? <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="facturaConsig"
                        label="Factura Consig. Nº:"
                        name="facturaConsig"
                        onChange={(e) => handleFacturaConsig(e)}
                        value={facturaConsig.facturaConsig}
                    />:null}
                    </Grid>
                    <Grid item item xs={12} sm={3}>
                   {!comission? <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="totalConsig"
                        label="Total Comisión ($)"
                        name="totalConsig"
                        value={facturaConsig.totalConsig}
                        onChange={(e) => handleFacturaConsig(e)}
                    />:null}
                    </Grid>

                </Grid>
    
            
                    <Grid container spacing={2} >
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>cancelFunc(e)} >
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>continueFunc(e)} >
                                Continuar
                            </Button>
                    </Grid>
                </Grid>
                    
            </form>
           </Grid>
          </Grid>
     
          </Container>
        </React.Fragment>
    
      )
 
 }

const mapStateToProps = state => {		
  return {		
    vendedor:state.compras.vendedor,
    consignatario:state.compras.consignatario,
    step:state.compras.step,
    facturaVendor:state.compras.facturaVendor,
    facturaConsig:state.compras.facturaConsig,
    ifcomission:state.compras.ifcomission,
    ifconsig:state.compras.ifconsig
  }		
}

const mapDispatchToProps = dispatch => {
  return {
    cancelCompra:()=>dispatch(cancelCompra()),
    keepVendor:(vendor)=>dispatch(keepVendor(vendor)),
    keepConsig:(consig)=>dispatch(keepConsig(consig)),
    keepFacturaVendor:(bills)=>dispatch(keepFacturaVendor(bills)),
    keepFacturaConsig:(bills)=>dispatch(keepFacturaConsig(bills)),
    setStep:(number)=>dispatch(setStep(number)),
    comissionSwich:(seleccion)=>dispatch(comissionSwich(seleccion)),
    consigSwich:(seleccion)=>dispatch(consigSwich(seleccion))
  }
}
    
export function validateVendor(vendedor) {
  let errors = {};
if(vendedor.vendor_razon_social===""){
  errors.vendor_razon_social= "Por favor introduzca la razón social del vendedor"

}else if(vendedor.vendor_addressFiscal===""){
  errors.vendor_addressFiscal= "Por favor introduzca la dirección fiscal del vendedor"

}else if(vendedor.vendor_cp===""){
  errors.vendor_cp= "Por favor introduzca el Cód Postal del Vendedor"

  if (!vendedor.vendor_email) {
    errors.vendor_email = 'Por favor introduzca el email del vendedor';
  } else if (!/\S+@\S+\.\S+/.test(vendedor.vendor_email)) {
    errors.vendor_email = 'El email del vendedor es invalido'
  }

}else if(vendedor.vendor_celular===""){
  errors.vendor_celular= "Por favor introduzca el número del telefono celular del vendedor"

}
  return errors;
};

export function validateConsignatario(consignatario) {
    let errors = {};
  if(consignatario.razon_social===""){
    errors.razon_social= "Por favor introduzca la razón social del consignatario"
  
}else if(consignatario.cuit===""){
    errors.cuit= "Por favor introduzca el CUIT del consignatario"


  }else if(consignatario.addressFiscal===""){
    errors.addressFiscal= "Por favor introduzca la dirección fiscal del consignatario"
  
  }else if(consignatario.cp===""){
    errors.cp= "Por favor introduzca el Cód Postal del consignatario"
  
    if (!consignatario.email) {
      errors.email = 'Por favor introduzca el email del consignatario';
    } else if (!/\S+@\S+\.\S+/.test(consignatario.email)) {
      errors.email = 'El email del consignatario es invalido'
    }
  
  }else if(consignatario.celular===""){
    errors.celular= "Por favor introduzca el número del telefono celular del consignatario"
  
  }
    return errors;
  };

export default connect(mapStateToProps, mapDispatchToProps)(Step1);