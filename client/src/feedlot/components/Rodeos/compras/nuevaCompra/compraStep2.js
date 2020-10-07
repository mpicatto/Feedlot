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
import {guiaInicial,animalInicial,transporteInit,facturaTransportInit} from './initialState'

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
    let cattleInitial ={
      cug: "",
      manejo: "",
      verificador: "",
      raza: "",
      sexo: "",
      frame: "",
      pesoinicial:"" ,
      pesoactual:"",
      establecimientoid:"",
      rodeoid:" ",
    }

    useEffect(()=>{
      // setGuia(props.guiaN)
      setGuiaS(props.guiass)
      // setTransporte(props.transport)
      // setFacturaTransporte(props.facturaTransport)
      // setAnimalDetail(props.cattleDetail)
      setAnimalArray(props.cattleArray)
      setFlete(props.ifTransport)
    },[props.guiass,props.cattleArray,props.ifTransport])
   
    const [guia, setGuia] = useState(guiaInicial)
    const [guiaS, setGuiaS] = useState([])
    const [transporte, setTransporte]=useState(transporteInit)
    const [facturaTransporte,setFacturaTransporte]=useState(facturaTransportInit)
    const [animalDetail, setAnimalDetail]=useState(animalInicial)
    const [animalArray, setAnimalArray] = useState([])
    const [flete,setFlete] = useState(true)
    const [establecimiento, setEstablecimiento] = useState(props.establecimiento)
    const [rodeo,setRodeo] = useState(props.rodeo)
    const [endOfGuia,setEndOfGuia] = useState(true)
    const [vendorErrors, setVendorErrors] = useState({})
    for (let i=0;i<props.data.length;i++){
      if(props.data[i].nombre===establecimiento){
          rodeos=props.data[i].rodeos
      }
  }

  console.log(transporte.transportista)

    const handleGUIA = function(e) {
        setGuia({
          ...guia,
          [e.target.name]:e.target.value
        })
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
          if (guia.cantAnimales>1){
            animalDetail.establecimientoid=establecimiento
            animalDetail.rodeoid=rodeo
            animalArray.push(animalDetail)
            console.log(animalArray.length)
            console.log(animalArray)
            alert("Se Agrego Animal "+animalDetail.cug+animalDetail.manejo+animalDetail.verificador+". \nAnimal "+animalArray.length+"/"+guia.cantAnimales+".")
            setAnimalDetail(animalInicial)
            if (animalArray.length==guia.cantAnimales&&animalArray.length>1){

            }
          }else{
            alert("La cantidad de animales espefificada en la guia debe ser mayor a 0. Verifique la informacioón y vuelva a intentar")
          }
      }
      
      const deleteAnimal = function(){
        setAnimalDetail(cattleInitial)
      }

      const saveGuia = function(){
        guia.animales=animalArray
        guia.transporte=transporte
        guia.facturaTransporte=facturaTransporte
        guiaS.push(guia)
        setGuia(guiaInicial)
        setTransporte(transporteInit)
        setFacturaTransporte(facturaTransportInit)
        setAnimalArray([])
        setFlete(true)
        setEndOfGuia(true)
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
        setAnimalArray([])
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
                    <Grid item xs={12} sm={3}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="guia"
                          label="GUIA Nº:"
                          name="guia"
                          value={guia.guia}
                          onChange={(e)=>handleGUIA(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                          autoComplete="descarga"
                          name="fechaDescarga"
                          variant="outlined"
                          required
                          fullWidth
                          id="fechaDescarga"
                          label="Fecha de Descarga"
                          type="date"
                          InputLabelProps={{
                                              shrink: true,
                                            }}
                          autoFocus
                          value={guia.fechaDescarga}
                          onChange={(e) => handleGUIA(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="transportista"
                        label="Transportista:"
                        name="transportista"
                        value={transporte.transportista}
                        onChange={(e)=>handleTransporte(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cuiTransportista"
                        label="CUIT transportista:"
                        name="cuiTransportista"
                        value={transporte.cuiTransportista}
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
                        value={transporte.chasis}
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
                        value={transporte.acoplado}
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
                        value={transporte.chofer}
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
                        value={transporte.cuil}
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
                        value={guia.pesajePlace}
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
                        value={guia.ticket}
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
                        value={guia.peso}
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cantAnimales"
                        label="Animales:"
                        name="cantAnimales"
                        value={guia.cantAnimales}
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
                        value={facturaTransporte.numFactura}
                    />:null}
                    </Grid>
                    <Grid item item xs={12} sm={3}>
                   {!flete? <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Total Flete ($)"
                        name="totalFactura"
                        value={facturaTransporte.totalFactura}
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
                          value={animalDetail.cug}
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
                          value={animalDetail.manejo}
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
                          value={animalDetail.verificador}
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
                          value={animalDetail.raza}
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
                          value={animalDetail.sexo}
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
                          value={animalDetail.frame}
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
                        {endOfGuia?<Grid item xs={12} sm={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>deleteAnimal(e)} >
                               Borrar Datos
                            </Button>
                        </Grid>:null}
                        {endOfGuia?<Grid item xs={12} sm={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>saveAnimal(e)} >
                                Agregar Animal
                            </Button>
                    </Grid>:null}
                    <Grid item xs={12} sm={7}></Grid>
                    {endOfGuia?null:<Grid item xs={12} sm={5}>
                    Animales registrados:{animalArray.length}/{guia.cantAnimales}
                    </Grid>}
                    <Grid item xs={12} sm={6}></Grid>
                    {endOfGuia?null:<Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>saveGuia(e)} >
                               Guardar GUIA Nº:{guia.guia}
                            </Button>
                        </Grid>}


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
    guiaN:state.compras.guiaN,
    guiass:state.compras.guias,
    transport:state.compras.transporte,
    facturaTransport:state.compras.facturaTransporte,
    cattleDetail:state.compras.detalleAnimal,
    cattleArray:state.compras.animales,
    ifTransport:state.compras.ifTransporte,
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