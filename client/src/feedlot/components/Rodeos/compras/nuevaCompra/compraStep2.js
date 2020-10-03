import React,{useState,useEffect} from 'react';
// import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {cancelCompra,keepConsig,keepVendor,setStep} from '../../../../actions/compras'
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

export function Step2(props) {
    const classes = useStyles()

    useEffect(()=>{
      setVendedor(props.vendedor)
      setConsignatario(props.consignatario)
    },[props.vendedor, props.consignatario])

    const [vendedor, setVendedor] = useState({})
    const [consignatario, setConsignatario] = useState({})
    const [vendorErrors, setVendorErrors] = useState({})
    const [consigErrors, setConsigErrors] = useState({})

    const handleCompraData = function(e) {
        setVendedor({
          ...vendedor,
          [e.target.name]:e.target.value
        })
      
      }

      const volverFunc = function(e){
        e.preventDefault()
        props.setStep("1")
    }

      const cancelFunc = function(e){
          e.preventDefault()
          props.cancelCompra()
      }

      const continueFunc = function(e){
          e.preventDefault()
          props.keepVendor(vendedor)
          props.keepConsig(consignatario)
          setStep("2")
          
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
                    Detalle de la Compra
                    </Typography>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                          autoComplete="ingreso"
                          name="ingreso"
                          variant="outlined"
                          required
                          fullWidth
                          id="ingreso"
                          label="Fecha de Ingreso"
                          type="date"
                          InputLabelProps={{
                                              shrink: true,
                                            }}
                          autoFocus
                          onChange={(e) => handleCompraData(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cantidad"
                        label="Animales:"
                        name="cantidad"
                        autoComplete="off"
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="factura"
                        label="Factura Compra Nº:"
                        name="factura"
                        autoComplete="off"
                    />
                    </Grid>
                    <Grid item item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="total_factura"
                        label="Total Factura ($)"
                        name="total_factura"
                        autoComplete="off"
                    />
                    </Grid>   
                </Grid>
              
                    <Grid container spacing={2} >
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid item xs={12} sm={3}>
                          <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>volverFunc(e)} >
                                Volver
                            </Button>
                        </Grid>
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
    step:state.compras.step
  }		
}

const mapDispatchToProps = dispatch => {
  return {
    cancelCompra:()=>dispatch(cancelCompra()),
    keepVendor:(vendor)=>dispatch(keepVendor(vendor)),
    keepConsig:(consig)=>dispatch(keepConsig(consig)),
    setStep:(number)=>dispatch(setStep(number))
  }
}
    


export default connect(mapStateToProps, mapDispatchToProps)(Step2);