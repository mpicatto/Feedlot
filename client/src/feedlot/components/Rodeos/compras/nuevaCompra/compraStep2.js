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
import {cancelCompra,setStep, keepTransport,keepFacturaTransport,
keepGuia,keepGuiaS,keepAnimalDetail,keepAnimalArray ,transportSwich} from '../../../../actions/compras'
import {connect} from 'react-redux';

let rodeos=[]


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
      setGuia(props.guia)
      setGuiaS(props.guias)
      setTransporte(props.transporte)
      setFacturaTransporte(props.facturaTransporte)
      setAnimalDetail(props.animalDetail)
      setAnimalArray(props.animalArray)
      setFlete(props.ifTransporte)
    },[props.guia, props.guias,props.transporte,props.facturaTransporte,
      props.animalDetail,props.animalArray,props.ifTransporte])
   
    const [guia, setGuia] = useState({})
    const [guiaS, setGuiaS] = useState({})
    const [transporte, setTransporte]=useState({})
    const [facturaTransporte,setFacturaTransporte]=useState({})
    const [animalDetail, setAnimalDetail]=useState({})
    const [animalArray, setAnimalArray] = useState([])
    const [flete,setFlete] = useState(true)
    const [establecimiento, setEstablecimiento] = useState(props.establecimiento)
    const [rodeo,setRodeo] = useState(props.rodeo)
    const [vendorErrors, setVendorErrors] = useState({})
    console.log(animalArray)
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
        console.log(guia)
      }
    
      const handleTransporte = function(e) {
        setTransporte({
          ...transporte,
          [e.target.name]:e.target.value
        })
        console.log(transporte)
      }
      
      const handleFacturaTransporte = function(e) {
        setFacturaTransporte({
          ...facturaTransporte,
          [e.target.name]:e.target.value
        })
        console.log(facturaTransporte)
      } 
      
      const handleAnimalDetail = function(e) {
        setAnimalDetail({
          ...animalDetail,
          [e.target.name]:e.target.value
        })
        console.log(animalDetail)
      }
      
      const saveAnimal = function(e) {
        animalDetail.establecimientoid=establecimiento
        animalDetail.rodeoid=rodeo
        animalArray.push(animalDetail)
        keepAnimalDetail({})
        console.log(animalDetail)
        console.log(animalArray)
      }
      
      const deleteAnimal = function(){
        setAnimalDetail({})
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
          props.keepTransport(transporte)
          props.keepFacturaTransport(facturaTransporte)
          props.keepGuia(guia)
          props.keepGuiaS(guiaS)
          props.keepAnimalDetail(animalDetail)
          props.keepAnimalArray(animalArray)
          props.transportSwich(flete)
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
                        onChange={(e)=>handleTransporte(e)}
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
                        onChange={(e)=>handleTransporte(e)}
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
                        onChange={(e)=>handleTransporte(e)}
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
                        onChange={(e)=>handleTransporte(e)}
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
                        onChange={(e)=>handleTransporte(e)}
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
                        onChange={(e)=>handleTransporte(e)}
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
                        id="numFactura"
                        label="Factura Flete. Nº:"
                        name="numFactura"
                        onChange={(e) => handleFacturaTransporte(e)}
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
                        onChange={(e) => handleFacturaTransporte(e)}
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
                          onChange={(e)=>handleAnimalDetail(e)}
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
                          onChange={(e)=>handleAnimalDetail(e)}
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
                          onChange={(e)=>handleAnimalDetail(e)}
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
                          onChange={(e)=>handleAnimalDetail(e)}
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
                          onChange={(e)=>handleAnimalDetail(e)}
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
                          onChange={(e)=>handleAnimalDetail(e)}
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
                                onClick={(e)=>deleteAnimal(e)} >
                               Borrar Datos
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>saveAnimal(e)} >
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
    guia:state.compras.guiaN,
    guias:state.compras.guias,
    transporte:state.compras.transporte,
    facturaTransporte:state.compras.facturaTransporte,
    animalDetail:state.compras.detalleAnimal,
    animalArray:state.compras.animales,
    ifTransporte:state.compras.ifTransporte,
    step:state.compras.step
  }		
}

const mapDispatchToProps = dispatch => {
  return {
    cancelCompra:()=>dispatch(cancelCompra()),
    setStep:(number)=>dispatch(setStep(number)),
    keepTransport:(transport)=>dispatch(keepTransport(transport)),
    keepFacturaTransport:(transportBill)=>dispatch(keepFacturaTransport(transportBill)),
    keepGuia:(guiaN)=>dispatch(keepGuia(guiaN)),
    keepGuiaS:(guiaSS)=>dispatch(keepGuiaS(guiaSS)),
    keepAnimalDetail:(cattle)=>dispatch(keepAnimalDetail(cattle)),
    keepAnimalArray:(cattleObj)=>dispatch(keepAnimalArray(cattleObj)),
    transportSwich:(selection)=>dispatch(transportSwich(selection)),
  }
}
    


export default connect(mapStateToProps, mapDispatchToProps)(Step2);