import React,{useState,useEffect} from 'react';
// import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Select, FormControl,MenuItem} from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {cancelCompra,keepConsig,keepVendor,setStep} from '../../../../actions/compras'
import {connect} from 'react-redux';

let rodeos=[]
let selectedRodeo={}

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

    },[])

    const [guia, setGuia] = useState({})
    const [flete,setFlete] = useState(true)
    const [establecimiento, setEstablecimiento] = useState(props.establecimiento)
    const [rodeo,setRodeo] = useState(props.rodeo)
    const [vendorErrors, setVendorErrors] = useState({})
    console.log(establecimiento)
    console.log(rodeo)
    console.log(props.data)
    for (let i=0;i<props.data.length;i++){
      if(props.data[i].nombre===establecimiento){
          rodeos=props.data[i].rodeos
      }
  }



    const handleGUIA = function(e) {
        setGuia({
          ...guia,
          [e.target.name]:e.target.value
        })
      }
    const handleFlete=function(e){
      setFlete(!e.target.checked)

    } 
    
    const handleEstablecimiento = (event) => {
      setEstablecimiento(event.target.value);
      setRodeo("Elija una opción...")
      for (let i=0;i<props.data.length;i++){
        if(props.data[i].nombre===establecimiento){
            rodeos=props.data[i].rodeos
        }
    }
   
  };

  const handleRodeo = (event) => {
    setRodeo(event.target.value);
               

    for (let i=0;i<rodeos.length;i++){
        if(rodeos[i].nombre===event.target.value){
            selectedRodeo=rodeos[i]
        }
    }
 
  };


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
                    Detalle de la GUIA
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="guia"
                          label="GUIA Nº:"
                          name="guia"
                          autoComplete="off"
                          onChange={(e)=>handleGUIA(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="transportista"
                        label="Transportista:"
                        name="transportista"
                        autoComplete="off"
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cuiTransportista"
                        label="CUIT transportista:"
                        name="cuiTransportista"
                        autoComplete="off"
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="chasis"
                        label="Patente Chasis:"
                        name="chasis"
                        autoComplete="off"
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="acoplado"
                        label="Patente Acoplado:"
                        name="acoplado"
                        autoComplete="off"
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="chofer"
                        label="Chofer:"
                        name="chofer"
                        autoComplete="off"
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cuil"
                        label="CUIT/CUIL chofer"
                        name="cuil"
                        autoComplete="off"
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="pesajePlace"
                        label="Lugar de Pesada:"
                        name="pesajePlace"
                        autoComplete="off"
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="ticket"
                        label="Ticket Balanza Nº:"
                        name="ticket"
                        autoComplete="off"
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="peso"
                        label="Peso Neto:"
                        name="peso"
                        autoComplete="off"
                        onChange={(e)=>handleGUIA(e)}
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
                        autoComplete="off"
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>

                    <Grid item item xs={12} sm={6}>
                    <FormControlLabel
                        control={<Switch color="primary" />}
                        label="Flete cargo del comprador"
                        value="on"
                        checked={!flete}
                        onChange={(e)=>handleFlete(e)}
                        />
                    </Grid>
                    <Grid item item xs={12} sm={3}>
                    {!flete ? <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="facturaFlete"
                        label="Factura Flete. Nº:"
                        name="facturaFlete"
                        onChange={(e) => handleGUIA(e)}
                        autoComplete="off"
                    />:null}
                    </Grid>
                    <Grid item item xs={12} sm={3}>
                   {!flete? <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="totalFlete"
                        label="Total Flete ($)"
                        name="totalFlete"
                        autoComplete="off"
                        onChange={(e) => handleGUIA(e)}
                    />:null}
                    </Grid>
                </Grid>
                <Grid className={classes.container}> 
                  <Typography component="h1" variant="h5">
                  Detalle de los Animales
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="cug"
                          label="CUG:"
                          name="cug"
                          autoComplete="off"
                          onChange={(e)=>handleGUIA(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="manejo"
                          label="Nº de Manejo:"
                          name="manejo"
                          autoComplete="off"
                          onChange={(e)=>handleGUIA(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="verificador"
                          label="Verificador:"
                          name="verificador"
                          autoComplete="off"
                          onChange={(e)=>handleGUIA(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="raza"
                          label="Raza:"
                          name="raza"
                          autoComplete="off"
                          onChange={(e)=>handleGUIA(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="sexo"
                          label="Sexo:"
                          name="sexo"
                          autoComplete="off"
                          onChange={(e)=>handleGUIA(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="frame"
                          label="Frame:"
                          name="frame"
                          autoComplete="off"
                          onChange={(e)=>handleGUIA(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}
                    >
                    <Typography component="h1" variant="h6" align="left">
                    Asignar Animal a:
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                    <FormControl 
                             variant="filled"
                             className={classes.formControl}
                       
                             >
                                <label>Establecimiento:</label>
                                    <Select
                                        labelId="label"
                                        id="establecimiento"
                                        name="establecimiento"
                                        value={establecimiento}
                                        onChange={handleEstablecimiento}
                                        label="establecimiento"
                                        displayEmpty
                                        >
                                        <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                        {props.data.map(item =>{
                                            return <MenuItem value={item.nombre}>{item.nombre}</MenuItem>
                                        })}
                            
                                  
                                    </Select>
                                </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <FormControl variant="filled" className={classes.formControl}>
                                <label>Rodeo:</label>
                                    <Select
                                        labelId="label"
                                        id="demo-simple-select-outlined"
                                        name="rodeo"
                                        value={rodeo}
                                        onChange={handleRodeo}
                                        label="Rodeo"
                                        displayEmpty
                                        >
                                         <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                        {rodeos.map(item =>{
                                            return <MenuItem value={item.nombre}>{item.nombre}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}></Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>cancelFunc(e)} >
                               Borrar Datos
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>continueFunc(e)} >
                                Agregar Animal
                            </Button>
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