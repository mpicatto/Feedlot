import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {setArray,setSection,setTable,keepVendor,keepConsig,setVenta} from '../../../actions/ventas'
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Select, FormControl,MenuItem, IconButton} from '@material-ui/core';
import DataTable from './dataTable'

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

export function NuevaOrden(props) {
  const classes = useStyles()
  useEffect(()=>{
    setEstablecimiento(props.currentEstablecimiento.nombre)
    setRodeo(props.currentRodeo.nombre)
    getRodeos()
    props.setTable(false)
  },[props.currentRodeo.id])


  const [establecimiento, setEstablecimiento] = useState(props.currentEstablecimiento.nombre)
  const [rodeo,setRodeo] = useState(props.currentRodeo.nombre)
  const [comprador, setComprador] = useState({})
  const [consignatario, setConsignatario] = useState({})
  const [ifConsignatario,setIfConsignatario]=useState(true)
  const [tipoVenta,setTipoVenta]=useState('Elija una opción')
  const [next, setNext] = useState(false) 
  const [pesoFilter, setPesoFilter] = useState()


//--------------FUNCTIONS-----------------------------------------------------------------------
const getRodeos = function(){
  rodeos=[]    
    for (let i=0;i<props.establecimientos.length;i++){
    if(props.establecimientos[i].nombre===props.currentEstablecimiento.nombre){
      let establecimientoId=props.establecimientos[i].id
      props.rodeos.map(item=>{
        if(item.establecimientoId===establecimientoId){
          rodeos.push(item)
        }
      })
    }console.log(rodeos)
  }
}

  //-----------------HANDLERS-----------------------------------------------------------

  const handleEstablecimiento = (event) => {
    rodeos=[]
    setEstablecimiento(event.target.value);
    setRodeo("Elija una opción...")
    for (let i=0;i<props.establecimientos.length;i++){
      if(props.establecimientos[i].nombre===event.target.value){
          let establecimientoId = props.establecimientos[i].id
          props.rodeos.map(item=>{
              if (item.establecimientoId===establecimientoId){
                  rodeos.push(item)
              }
          })
      }
  }
  console.log(rodeos)
}

const handleRodeo = (event) => {
  setRodeo(event.target.value);
};

const handleVendorData = function(e) {
  setComprador({
    ...comprador,
    [e.target.name]:e.target.value
  })
  console.log(comprador)
}

const handleIfConsig= function(e){
  setIfConsignatario(!e.target.checked)
}  

const handleConsigData = function(e) {
  setConsignatario({
    ...consignatario,
    [e.target.name]:e.target.value
  })
  console.log(consignatario)
}

const handleTipoVenta = function(e){
  setTipoVenta(e.target.value)
}

const cancelFunc = function(e){
  e.preventDefault()
  setNext(false)
  props.setSection('')
}

const volverFunc = function(e){
  e.preventDefault()
  props.setTable(false)
  setNext(false)
}

const continueFunc = function(e){
  e.preventDefault()
  props.keepVendor(comprador)
  props.keepConsig(consignatario)
  props.setVenta(tipoVenta)
  setNext(true)
}

const handlePesoFilter = function(e){
  e.preventDefault()
  setPesoFilter(e.target.value)
  console.log(pesoFilter)
}

const buscarFunc = function(e){
  e.preventDefault()
  if (rodeo=='todos'){
    Axios.get('http://localhost:3001/rodeo/all_caravanas/'+props.user.cuit+'/'+pesoFilter)
    .then(res=>{
      props.setArray(res.data)
    })
    if (props.table1){
      props.setTable(false)
    }
    setTimeout(() => {
      props.setTable(true)  
    }, 10); 

    return
  }
  let rodeoId
  for (let i=0;i<rodeos.length;i++){
    if(rodeo===rodeos[i].nombre){
      rodeoId=rodeos[i].id
    }
  }
  Axios.get('http://localhost:3001/rodeo/caravanas/'+rodeoId+'/'+pesoFilter)
  .then(res=>{
    props.setArray(res.data)
  })

  if (props.table1){
    props.setTable(false)
  }
  setTimeout(() => {
    props.setTable(true)  
  }, 10);  
}





  return (
      <React.Fragment>
          <CssBaseline />
          <Container className={classes.container}>
          <Grid
           container
           direction="row"
           justify="space-around"
           alignItems="center"
           >
           {!next ? 
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
                        value={comprador.vendor_razon_social}
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
                        value={comprador.vendor_cuit}
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
                        value={comprador.vendor_addressFiscal}
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
                        value={comprador.vendor_cp}
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
                        value={comprador.vendor_email}
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
                        value={comprador.vendor_celular}
                        onChange={(e)=>handleVendorData(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                    <FormControlLabel
                        control={<Switch color="primary" />}
                        label="Actuó Consignatario"
                        value="on"
                        checked={!ifConsignatario}
                        onChange={(e)=>handleIfConsig(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <FormControl 
                  variant="filled"
                  className={classes.formControl}
                  >
                    <label>Tipo de Venta:</label>
                      <Select
                          labelId="label"
                          id="tipo_venta"
                          name="tipo_venta"
                          value={tipoVenta}
                          onChange={(e)=>handleTipoVenta(e)}
                          displayEmpty
                          >
                          <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                          <MenuItem value={"aFeria"} >Remate o Feria</MenuItem>
                          <MenuItem value={"aDestino"}>Venta Directa</MenuItem>
            
                      </Select>
                    </FormControl>
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
           :null}
            {next ?
              <Grid >
            <form className={classes.form} noValidate>
                <Grid className={classes.container}> 
                    <Typography component="h1" variant="h5">
                    Seleccionar Caravanas
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                          {props.establecimientos.map(item =>{
                              return <MenuItem value={item.nombre}>{item.nombre}</MenuItem>
                          })}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl variant="filled" 
                    className={classes.formControl}
                    >
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
                          <MenuItem value={"todos"}>Todos los Rodeos</MenuItem>
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item item xs={12} sm={8}>
                    <Typography component="h1" variant="h6" align="right">
                    Peso Minimo de Venta:
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Peso_Venta"
                        label="Kg"
                        name="Peso_Venta"
                        onChange={(e)=>handlePesoFilter(e)}
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
                              volver
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
                            onClick={(e)=>buscarFunc(e)} >
                            Buscar
                        </Button>
                    </Grid>
                </Grid>                  
              </form>
            </Grid>

              :null}
              {props.table1 ?
              <Grid>
              <form className={classes.form} noValidate>
                <Grid>
                  <DataTable />
                </Grid>
              </form>   
              </Grid>
              :null}


           </Grid>
          </Container>

      </React.Fragment>
      
    )
 }

const mapStateToProps = state => {		
  return{
    user:state.user.user,
    establecimientos:state.rodeo.establecimientos,
    rodeos:state.rodeo.rodeos,
    categorias:state.rodeo.categoria,
    currentRodeo:state.rodeo.currentRodeo,
    currentEstablecimiento:state.rodeo.currentEstablecimiento,
    array:state.ventas.array,
    table1:state.ventas.table1,

  }
}

const mapDispatchToProps = dispatch => {
  return {
  setArray:(array)=>dispatch(setArray(array)),
  setSection:()=>dispatch(setSection()),
  setTable:(status)=>dispatch(setTable(status)),
  keepVendor:(comprador)=>dispatch(keepVendor(comprador)),
  keepConsig:(consignatario)=>dispatch(keepConsig(consignatario)),
  setVenta:(tipoVenta)=>dispatch(setVenta(tipoVenta))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NuevaOrden);


