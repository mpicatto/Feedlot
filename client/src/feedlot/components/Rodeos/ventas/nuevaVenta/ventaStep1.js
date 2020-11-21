import React,{useState,useEffect} from 'react';
// import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {cancelCompra,keepVendor,setStep} from '../../../../actions/compras'
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

    },[props.vendedor])

    const [vendedor, setVendedor] = useState({})


    const handleVendorData = function(e) {
        setVendedor({
          ...vendedor,
          [e.target.name]:e.target.value
        })

      }


      const cancelFunc = function(e){
          e.preventDefault()
          props.cancelCompra()
      }

      const continueFunc = function(e){
          e.preventDefault()
          props.keepVendor(vendedor)
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
           >
            <Grid >
            <form className={classes.form} noValidate>
                <Grid className={classes.container}> 
                    <Typography component="h1" variant="h5">
                    Datos del Comprador
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
    step:state.compras.step,

  }		
}

const mapDispatchToProps = dispatch => {
  return {
    cancelCompra:()=>dispatch(cancelCompra()),
    keepVendor:(vendor)=>dispatch(keepVendor(vendor)),
    setStep:(number)=>dispatch(setStep(number)),

  }
}
    

export default connect(mapStateToProps, mapDispatchToProps)(Step1)